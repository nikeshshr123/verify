# ROAM — A Video Journal

A responsive, cinematic personal travel vlog website with a searchable video gallery, topic filters, saved videos (per-browser local storage), a sample journal/about section, mobile navigation and a video watch modal.

## Publishing your own vlogs
1. Open `app.js` and edit the `films` array near the top. Each object has `title`, `place`, `category`, `description`, `image`, and `youtubeId`.
2. Upload your video to YouTube and paste its 11-character video ID as `youtubeId`. The website embeds the video in a privacy-enhanced YouTube player. When that ID is blank, a clearly labeled demo preview is displayed instead.
3. Replace demo image URLs with your own licensed photos; replace the hero, feature and closing background images in `styles.css`. 
4. Edit name, about text, footer, email, title and SEO description in `index.html`. The current `hello@example.com` is a placeholder.
5. Push updates to the `roam-vlog-site` branch to automatically deploy on Render.

## Local preview
No package installation is required. Open `index.html` directly, or use `python -m http.server 8080` then visit http://localhost:8080.

## Render deployment
- Type: **Static Site**
- Git repository: `https://github.com/nikeshshr123/verify`
- Branch: `roam-vlog-site`
- Build command: `echo "Static site ready"`
- Publish directory: `.`
- Auto deploy: Yes

## Notes
- **Starter/demo:** This first version has no sign-in, back-end database, admin dashboard or direct video upload. Edit the content in GitHub; YouTube hosts the videos. The gallery intentionally contains clearly labeled sample stories, not original uploaded footage.
- Saved films are stored in the visitor's browser; they do not sync between devices.
- External Unsplash images and Google Fonts are loaded from their respective services.
- Before publicly promoting the site, replace placeholders, images and sample film metadata with your own content and check licenses.
