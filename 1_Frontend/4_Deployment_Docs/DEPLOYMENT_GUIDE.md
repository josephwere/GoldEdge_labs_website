# Automatic Deployment — Vercel

1. Import the repository into Vercel or upload the project folder.
2. Set environment variables under Project Settings:
   - NEXT_PUBLIC_API_URL = https://goldedge-backend.onrender.com
3. No special build settings required; Vercel will detect Next.js.
4. The `vercel.json` rewrites `/api/*` to the backend URL to simplify client calls.
5. If you want server-side forwarding instead of rewrites, replace `pages/api/chat.js` with code that calls the backend using process.env.NEXT_PUBLIC_API_URL.
