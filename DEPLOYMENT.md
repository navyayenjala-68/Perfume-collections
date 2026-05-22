# Deploy PerfumeLux Publicly

This app needs three public pieces:

1. MongoDB Atlas database
2. Backend API host
3. Frontend website host

Recommended simple setup:

- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

## 1. Push Project To GitHub

Create a GitHub repo and push this full folder.

Do not commit real secrets from `backend/.env`.

## 2. Deploy Backend On Render

Render supports Node/Express web services and gives every service a public `onrender.com` URL.

Use the included `render.yaml`, or create a Web Service manually:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

Set these Render environment variables:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=make_a_long_random_secret
FRONTEND_ORIGIN=https://your-vercel-site.vercel.app
```

After deploy, your API will look like:

```text
https://perfumelux-api.onrender.com
```

Check:

```text
https://perfumelux-api.onrender.com/api/health
```

## 3. Seed Products In Production

After the Render backend connects to MongoDB Atlas, seed products.

From your local terminal:

```powershell
cd "C:\Users\Navya\OneDrive\Attachments\Desktop\perfume colllection\backend"
npm.cmd run seed
```

This uses `backend/.env`, so make sure it has the same Atlas URI as Render.

## 4. Deploy Frontend On Vercel

Vercel has built-in support for Vite projects. For Vite environment variables, use the `VITE_` prefix.

Create a Vercel project with:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Set this Vercel environment variable:

```env
VITE_API_URL=https://perfumelux-api.onrender.com/api
```

Deploy. Your public website will look like:

```text
https://your-vercel-site.vercel.app
```

## 5. Update Backend CORS

After Vercel gives you the frontend URL, go back to Render and update:

```env
FRONTEND_ORIGIN=https://your-vercel-site.vercel.app
```

For multiple frontend URLs, separate them with commas:

```env
FRONTEND_ORIGIN=http://localhost:5173,https://your-vercel-site.vercel.app
```

Redeploy the Render service after changing environment variables.

## 6. MongoDB Atlas Network Access

For a deployed backend, Atlas must allow Render to connect.

For testing, you can allow:

```text
0.0.0.0/0
```

For production, restrict access more carefully when possible.

## Final Public Links

Share the Vercel frontend URL with users:

```text
https://your-vercel-site.vercel.app
```

Keep the backend API URL for the app:

```text
https://perfumelux-api.onrender.com
```

## Sources

- Vercel Vite deployment docs: https://vercel.com/docs/frameworks/frontend/vite
- Vercel environment variable docs: https://vercel.com/docs/environment-variables
- Render web service docs: https://render.com/docs/web-services
- Render environment variable docs: https://render.com/docs/environment-variables
- MongoDB Atlas connection docs: https://www.mongodb.com/docs/atlas/connect-to-cluster/
