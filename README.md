# The Soft Life Investor — Static Website

This folder contains the fully static HTML/CSS/JS export of the website,
ready to deploy to GitHub Pages, Netlify, Vercel, or any static host.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Complete page HTML |
| `styles.css` | Compiled Tailwind CSS |
| `app.js` | Vanilla JS (carousels, countdown, mobile menu, etc.) |
| `assets/` | Images and videos |

## ⚠️  One Manual Step Required — Add Your Media Files

Your images and videos live on the Lovable private CDN and cannot be
auto-downloaded. The HTML already references them as `assets/filename`.
You just need to place the actual files in the `assets/` folder.

### Files needed in `assets/`

- ✅ `author-1.jpg`
- ✅ `author-2.jpg`
- ✅ `logo.jpg`
- ✅ `soft-life-mock-1.png`
- ✅ `soft-life-mock-2.png`
- ✅ `soft-life-mock-d3.png`
- ✅ `testimonial-1.jpg`
- ✅ `testimonial-2.jpg`
- ✅ `testimonial-3.jpg`
- ✅ `testimonial-4.jpg`
- ✅ `testimonial-5.jpg`
- ✅ `testimonial-6.jpg`
- ✅ `testimonial-7.jpg`
- ✅ `testimonial-8.jpg`
- ✅ `testimonial-tychicus.mp4`
- ✅ `testimonial-video-1.mp4`
- ✅ `testimonial-video-2.mp4`
- ✅ `testimonial-video-3.mp4`

### How to get your files
1. Open your Lovable project at **lovable.dev**
2. Go to **Project Settings → Assets**
3. Download each file listed above
4. Rename them exactly as shown and place them in the `assets/` folder

## Deploying to GitHub Pages
1. Create a new GitHub repository
2. Copy **all** files from this folder into the repo root
3. Go to **Settings → Pages → Deploy from branch → main / (root)**
4. Your site will be live at `https://yourusername.github.io/reponame/`

> **Tip:** Once your custom domain is set up on GitHub Pages,
> update the `<link rel="canonical">` in `index.html` to match.