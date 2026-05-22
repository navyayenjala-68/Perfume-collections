# PerfumeLux Full-Stack Setup

## What Was Added

- `backend/` Express API
- MongoDB connection with Mongoose
- JWT login/signup
- Product, cart, wishlist, and order APIs
- Frontend API integration through `frontend/src/api.js`
- Database-backed products, cart, wishlist, checkout, and order history

## Requirements

- Node.js
- MongoDB running locally, or a MongoDB Atlas connection string

The backend is configured for local MongoDB by default:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/perfume_collection
```

If using MongoDB Atlas, replace `MONGODB_URI` in `backend/.env`.

## Run Backend

```powershell
cd "C:\Users\Navya\OneDrive\Attachments\Desktop\perfume colllection\backend"
npm.cmd install
npm.cmd run seed
npm.cmd run dev
```

Backend URL:

```text
http://127.0.0.1:5000
```

## Run Frontend

```powershell
cd "C:\Users\Navya\OneDrive\Attachments\Desktop\perfume colllection\frontend"
npm.cmd run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Important

MongoDB is not currently running on this machine. Until MongoDB is installed, started, or replaced with an Atlas URI, the backend will show:

```text
connect ECONNREFUSED 127.0.0.1:27017
```

Once MongoDB is available, run `npm.cmd run seed` once to load the default perfume products.
