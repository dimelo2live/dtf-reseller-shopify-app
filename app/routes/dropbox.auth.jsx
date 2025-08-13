import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  
  if (code) {
    // Handle OAuth callback - exchange code for tokens
    try {
      const tokenResponse = await fetch("https://api.dropboxapi.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: process.env.DROPBOX_APP_KEY,
          client_secret: process.env.DROPBOX_APP_SECRET,
          redirect_uri: `${new URL(request.url).origin}/dropbox/auth`,
        }),
      });

      if (tokenResponse.ok) {
        const tokens = await tokenResponse.json();
        
        // Store tokens in your database
        // For now, we'll simulate this
        console.log("Received tokens:", {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_in: tokens.expires_in,
        });
        
        // In a real app, save these to your database:
        // await saveDropboxTokens(session.shop, tokens);
        
        // Close popup and redirect parent
        return new Response(`
          <html>
            <head><title>Dropbox Connected</title></head>
            <body>
              <script>
                if (window.opener) {
                  window.opener.postMessage('dropbox_connected', '*');
                  window.close();
                } else {
                  window.location.href = '/app/dtf-tool';
                }
              </script>
              <h2>✅ Dropbox Connected Successfully!</h2>
              <p>You can close this window.</p>
            </body>
          </html>
        `, {
          headers: { "Content-Type": "text/html" },
        });
      } else {
        throw new Error("Token exchange failed");
      }
    } catch (error) {
      console.error("Dropbox OAuth error:", error);
      return new Response(`
        <html>
          <head><title>Connection Failed</title></head>
          <body>
            <h2>❌ Connection Failed</h2>
            <p>Error: ${error.message}</p>
            <button onclick="window.close()">Close</button>
          </body>
        </html>
      `, {
        headers: { "Content-Type": "text/html" },
      });
    }
  } else {
    // Initiate OAuth flow
    const authUrl = new URL("https://www.dropbox.com/oauth2/authorize");
    authUrl.searchParams.set("client_id", process.env.DROPBOX_APP_KEY || "your_dropbox_app_key");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", `${new URL(request.url).origin}/dropbox/auth`);
    authUrl.searchParams.set("state", session.shop);
    authUrl.searchParams.set("token_access_type", "offline"); // Request refresh token
    
    return redirect(authUrl.toString());
  }
};
