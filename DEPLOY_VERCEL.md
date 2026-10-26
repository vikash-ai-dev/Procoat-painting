# 🚀 Deploy ProCoat to Vercel (Live URL) — Step by Step

Total time: **~10 minutes**. Total cost: **$0** (all free tiers).

You will end up with a real live URL like `https://procoat-painting.vercel.app` you can share with anyone.

---

## Prerequisites (one-time setup, ~3 min)

Create these three free accounts (if you don't have them):

1. **GitHub** — https://github.com/signup (to store your code)
2. **Vercel** — https://vercel.com/signup (sign in with GitHub — 1 click)
3. **MongoDB Atlas** — https://www.mongodb.com/cloud/atlas/register (free database)

---

## STEP 1 — Get a free cloud database (2 min)

Vercel doesn't host databases. We'll use MongoDB Atlas (free forever, 512 MB).

1. Login to MongoDB Atlas → click **"Build a Database"**
2. Choose **M0 (FREE)** → any region close to India → **Create Deployment**
3. Set a **username** and **password** — SAVE THESE
4. In "Network Access" → **Add IP Address** → click **"Allow access from anywhere"** (`0.0.0.0/0`)
5. Once ready → click **"Connect"** → **"Drivers"** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the ones you set. Keep this string handy — you'll paste it into Vercel in Step 4.

---

## STEP 2 — Push code to GitHub (2 min)

You already have the ZIP. Unzip it on your computer, open a terminal in that folder, and run:

```bash
# 1. Initialize git
git init
git add .
git commit -m "Initial commit — ProCoat painting website"

# 2. Create a new repo on GitHub (https://github.com/new)
#    Name it: procoat-painting
#    Keep it PUBLIC or PRIVATE — both work.
#    Do NOT tick "Add README" (empty repo).

# 3. Push (GitHub will show you the exact commands; they look like this)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/procoat-painting.git
git push -u origin main
```

Done — your code is on GitHub.

---

## STEP 3 — Import to Vercel (1 min)

1. Go to https://vercel.com/new
2. Click **"Import"** next to your `procoat-painting` repo
3. Vercel auto-detects Next.js — leave all settings default
4. **DON'T click Deploy yet.** Scroll down to **"Environment Variables"** first ↓

---

## STEP 4 — Add environment variables (1 min)

In the "Environment Variables" section on the same Vercel import page, add these TWO variables:

| Key           | Value                                                                    |
|---------------|--------------------------------------------------------------------------|
| `MONGO_URL`   | *(paste the MongoDB Atlas connection string from Step 1)*                |
| `DB_NAME`     | `procoat_painting`                                                       |

Click **"Deploy"**. Wait ~90 seconds. ☕

---

## STEP 5 — Done! 🎉

Vercel gives you a live URL. Example: `https://procoat-painting-abc123.vercel.app`

**Test it:**
- Open the URL → your site should load exactly like the preview
- Try the Instant Quote estimator
- Submit the contact form
- Go back to MongoDB Atlas → **Browse Collections** → you should see the lead saved

---

## Optional: Add your own domain (5 min, ~₹800/year)

1. Buy a domain (e.g. `procoatpainting.in`) on GoDaddy, Namecheap, or Google Domains
2. In Vercel → your project → **Settings** → **Domains** → **Add**
3. Paste your domain → Vercel shows you a DNS record to add
4. In your domain registrar's DNS settings → add the record
5. Wait ~10 minutes → your site is now on `procoatpainting.in` with free HTTPS 🔒

---

## Future updates

Any changes you push to GitHub `main` branch → Vercel auto-deploys in ~60 sec. No manual work.

```bash
# make changes locally, then:
git add .
git commit -m "Updated phone number"
git push
# ... 60 seconds later, your live site is updated
```

---

## Common issues & fixes

| Problem                              | Fix                                                                             |
|--------------------------------------|----------------------------------------------------------------------------------|
| Build fails: "Cannot find module"    | Delete `node_modules/` and `yarn.lock` locally, run `yarn install`, push again  |
| API returns 500                      | Check MONGO_URL env var is set correctly and Atlas IP whitelist = `0.0.0.0/0`   |
| Site loads but form doesn't submit   | Open browser DevTools → Network → check /api/leads response for error details   |
| Images broken                        | They're hotlinked from Unsplash — should always work. If not, re-check network. |

---

## Need help?

If any step fails, paste the exact error and I'll debug it with you. Good luck! 🎨
