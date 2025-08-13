# 🚀 Deploy Your DTF Shopify App to Railway

## Quick Railway Deployment Guide

### **Step 1: Deploy on Railway**
1. **Go to:** [railway.app](https://railway.app)
2. **Click:** "Login with GitHub" 
3. **Authorize Railway** to access your GitHub account
4. **Click:** "New Project"
5. **Select:** "Deploy from GitHub repo"
6. **Choose:** `dimelo2live/dtf-reseller-shopify-app`
7. **Click:** "Deploy Now"

Railway will automatically build and deploy your app! ⚡

### **Step 2: Configure Environment Variables**

Once deployed, add your API keys:

1. **Click** on your deployed service in Railway dashboard
2. **Go to** "Variables" tab
3. **Add these environment variables:**

```bash
# Shopify App Credentials (from your Partner Dashboard)
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here

# Dropbox App Credentials (from your Dropbox App Console)
DROPBOX_APP_KEY=your_dropbox_app_key_here
DROPBOX_APP_SECRET=your_dropbox_app_secret_here

# Session Secret (any random string)
SESSION_SECRET=dtfrushorders_secret_123456789
```

### **Step 3: Get Your App URL**

Railway will provide a URL like:
```
https://dtf-reseller-shopify-app-production.up.railway.app
```

### **Step 4: Configure Your Shopify App**

In your Shopify Partner Dashboard:

1. **App URL:** `https://your-railway-url.up.railway.app`
2. **Allowed redirect URLs:** `https://your-railway-url.up.railway.app/auth/callback`

### **Step 5: Configure Your Dropbox App**

In your Dropbox App Console:

1. **Redirect URIs:** `https://your-railway-url.up.railway.app/dropbox/auth`

## 🎯 **What You Get:**

✅ **FREE hosting** (500 hours/month)  
✅ **Automatic deployments** (when you push to GitHub)  
✅ **Professional URL** (custom domain available)  
✅ **Built-in monitoring** and logs  
✅ **Easy scaling** when your business grows  

## 🔧 **Where to Get Your API Keys:**

### **Shopify API Keys:**
1. Go to your [Shopify Partner Dashboard](https://partners.shopify.com)
2. Find your "DTF Reseller Tool" app
3. Copy API Key and API Secret

### **Dropbox API Keys:**
1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Find your DTF app (or create one)
3. Copy App Key and App Secret
4. **Important:** Add your Railway URL to "Redirect URIs"

## 🎉 **After Deployment:**

1. **Install your app** on your DTF Rush Orders Shopify store
2. **Connect Dropbox** (one-time setup with permanent tokens!)
3. **Start calculating quotes** with no more token issues!

## 💰 **Pricing:**
- **Railway:** FREE (500 execution hours/month)
- **Your first month:** $0
- **Perfect for:** Small to medium DTF businesses

---

## 🆘 **Need Help?**

If you run into any issues:

1. **Check Railway logs** in your dashboard
2. **Verify environment variables** are set correctly
3. **Ensure URLs match** in Shopify and Dropbox settings

**Your DTF app will be live and solving your token problem within 10 minutes!** 🚀
