# Quick Setup Guide

# Get Started in 3 Steps

# Step 1: Install Dependencies

```bash
npm install
```

# Step 2: Configure Backend URL

Open `vite.config.js` and update the backend URL if it's not running on `http://localhost:5000`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000', // ← Change this to your backend URL
    changeOrigin: true,
  },
}
```

### Step 3: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

# Complete Workflow

# For Development:

1. -------------Start Backend First-----------

   ```bash
   # In your backend directory
   npm start  or node app.js
   ```

2. ------------Start Frontend-------------

   ```bash
   # In this directory
   npm run dev
   ```

3. -------------Open Browser------------------------
   - Go to `http://localhost:3000`
   - Create a paste
   - Test viewing the paste

### For Production Build:

```bash
npm run build
```

Files will be generated in the `dist/` folder.

---

# Configuration

# Backend Integration

The app expects your backend to have these endpoints:

- `POST /api/pastes` - Create paste

  ```json
  Request: {
    "content": "string",
    "ttl_seconds": 60,      // optional
    "max_views": 5          // optional
  }
  Response: {
    "id": "abc123",
    "url": "https://your-app.com/p/abc123"
  }
  ```

- `GET /api/pastes/:id` - Get paste data
  ```json
  Response: {
    "content": "string",
    "remaining_views": 4,   // null if unlimited
    "expires_at": "ISO date" // null if no TTL
  }
  ```

### CORS Configuration

If you get CORS errors, make sure your backend allows requests from `http://localhost:3000` during development.

Example for Express.js:

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
```

---

 <!-- UI Features -->

### Home Page (/)

- Create new paste
- Set optional expiry time
- Set optional view limit
- Get shareable URL
- Copy URL to clipboard

### View Page (/p/:id)

- View paste content
- See remaining views
- See expiration time
- Copy content
- Error handling for expired pastes

---

# Troubleshooting

# "Cannot connect to backend"

- Check backend is running
- Verify backend URL in `vite.config.js`
- Check CORS settings in backend

### "Page not found" errors

- Make sure React Router is handling routes
- Check that you're using the dev server (`npm run dev`)

### Bootstrap styles not loading

- Check `index.html` has Bootstrap CDN links
- Clear browser cache

---

# Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
```

All installed with `npm install`.

---

 <!-- Deployment -->

When deploying to production:

1. Update `vite.config.js` to point to your production backend URL
2. Run `npm run build`
3. Deploy the `dist/` folder to your hosting service
4. Configure your hosting to serve `index.html` for all routes (for React Router)

## Vercel Deployment

If using Vercel, add a `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Tips

- Use the browser console (F12) to debug API calls
- Check the Network tab to see request/response data
- The app shows loading states and error messages
- All paste content is safely rendered (XSS protected)

---

## Checklist

Before running:

- [ ] Node.js installed
- [ ] Backend server running
- [ ] Dependencies installed (`npm install`)
- [ ] Backend URL configured in `vite.config.js`
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000`
