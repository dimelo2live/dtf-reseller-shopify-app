# DTF Rush Orders Shopify App - Deployment Guide

## 🚀 Deploy Your DTF App for FREE

Your DTF Shopify app is ready to deploy! This guide will help you deploy it for free and solve your temporary Dropbox token problem forever.

## Option 1: Railway (Recommended - Free Tier)

Railway offers free hosting perfect for your DTF app.

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended)

### Step 2: Deploy Your App
1. **Push your code to GitHub:**
   ```bash
   cd /Users/dtfrushorders/Desktop/dtf-reseller-tool
   git add .
   git commit -m "Initial DTF Shopify app setup"
   git remote add origin https://github.com/yourusername/dtf-reseller-tool.git
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Click "New Project" in Railway
   - Select "Deploy from GitHub repo"
   - Choose your `dtf-reseller-tool` repository
   - Railway will automatically deploy your app!

### Step 3: Configure Environment Variables
In Railway dashboard, go to Variables tab and add:

```bash
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
DROPBOX_APP_KEY=your_dropbox_app_key
DROPBOX_APP_SECRET=your_dropbox_app_secret
SESSION_SECRET=your_random_string_here
```

### Step 4: Get Your App URL
Railway will provide a URL like: `https://your-app-name.railway.app`

## Option 2: Vercel (Alternative Free Option)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd /Users/dtfrushorders/Desktop/dtf-reseller-tool
vercel
```

Follow the prompts and add your environment variables in the Vercel dashboard.

## 🔧 Configure Your Shopify App

Once deployed, update your Shopify app URLs in the Partner Dashboard:

1. **App URL:** `https://your-app-name.railway.app`
2. **Allowed redirect URLs:** `https://your-app-name.railway.app/auth/callback`

## 🔗 Configure Dropbox App

In your Dropbox App Console, add:
- **Redirect URI:** `https://your-app-name.railway.app/dropbox/auth`

## 🎯 What This Gives You

### ✅ **Solved Problems:**
- **No more temporary tokens** - Permanent OAuth with refresh tokens
- **Free hosting** - No server costs
- **Professional setup** - Proper Shopify app architecture
- **Persistent storage** - Quotes saved forever in Dropbox

### 🎉 **Features:**
- **DTF Quote Calculator** - Professional interface
- **Dropbox Integration** - One-time setup, permanent tokens  
- **Shopify Integration** - Access customer/order data
- **Mobile Responsive** - Works on all devices

## 🔄 Local Development

### Start development server:
```bash
cd /Users/dtfrushorders/Desktop/dtf-reseller-tool
npm run dev
```

### Test with your Shopify store:
The Shopify CLI will provide a secure tunnel URL for testing.

## 📊 Usage After Deployment

### 1. **Install Your App**
- Go to your app URL
- Install it on your DTF Rush Orders store

### 2. **Connect Dropbox**  
- Click "Connect Dropbox" (one-time setup)
- Authorize your DTF Rush Orders Dropbox account
- Get permanent tokens automatically!

### 3. **Use the Calculator**
- Calculate DTF quotes with your pricing
- Save quotes to Dropbox with persistent tokens
- No more temporary token issues!

### 4. **Access from Shopify Admin**
- Your DTF tool appears in your Shopify admin
- Access customer data and order information  
- Professional integration with your workflow

## 💰 **Cost Breakdown:**

- **Railway Hosting:** FREE (500 hours/month)
- **Dropbox API:** FREE (basic usage)
- **Shopify App:** FREE (for your own store)
- **Domain:** Uses Railway's free subdomain

**Total: $0/month** 🎉

## 🔧 **Troubleshooting:**

### App won't load?
- Check environment variables are set correctly
- Verify Shopify app URLs match your deployment URL

### Dropbox connection fails?
- Ensure Dropbox redirect URI is correct
- Check Dropbox app key/secret are set

### Build fails?
- Run `npm install` locally to check dependencies
- Check for any TypeScript errors

## 🎯 **Next Steps:**

1. **Deploy your app** using Railway
2. **Configure your API keys** 
3. **Connect Dropbox** (one-time setup)
4. **Start using permanent tokens!** 🚀

---

**Need help?** Check the Railway docs or Shopify CLI documentation.
