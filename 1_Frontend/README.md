# 🪩 GoldEdge Labs Frontend (Final)

This package is ready for Vercel with backend proxying and a serverless chat forwarder stub.

Run locally:
```bash
cd 1_Frontend
npm install
npm run dev
```

Lint & test (lightweight):
```
npm run lint
npm run test
```

Vercel deploy:
1. Create a Vercel project and point to this repo or upload the code.
2. Add Environment Variables in Vercel:
   - NEXT_PUBLIC_API_URL (e.g. https://goldedge-backend.onrender.com)
3. Deploy — Vercel auto-detects Next.js.
