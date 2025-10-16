# Deployment Guide - GoldEdge Labs (Render + Vercel)

## Overview
Frontend: React (Create React App) — deploy to Vercel or Netlify
Backend: Node.js (Express) — deploy to Render (recommended)

## Backend (Render) setup
1. Push repo to GitHub.
2. On Render create a new Web Service -> Connect Repo.
3. Build command: `cd 2_Backend && npm install`
4. Start command: `cd 2_Backend && npm start`
5. Add environment variables from `.env.example` (use MongoDB Atlas URI for production).

## Frontend (Vercel) setup
1. Import project on Vercel, set root to `/1_Frontend`.
2. Build command: `npm run build`, Output directory: `build`.
3. Set environment variable `REACT_APP_API_URL` to your backend URL (e.g., https://goldedge-backend.onrender.com)

## Seed DB (local or Atlas)
cd 3_Database
cp ../4_Deployment_Docs/.env.example .env
# edit .env to set MONGO_URI
node seed/seedData.js

