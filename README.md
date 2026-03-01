# columbia.network

A webring for Columbia University students.

---

## Join the Webring

**Requirements:** Columbia student + personal website

**1. Add your photo**  
Use a square image URL in the `avatar` field in your entry (optional). If you don’t, your initials are shown.

**2. Add yourself to `sites.json`**

```json
{
  "id": "your-name",
  "name": "Your Name",
  "major": "CS and Econ",
  "site": "https://yoursite.com",
  "avatar": "https://yoursite.com/photo.jpg",
  "connections": ["friend-id"]
}
```

Optional fields: `id`, `avatar`, `github`, `twitter`, `linkedin`, `instagram`, `connections` (member ids for graph edges).

**3. Submit a pull request**  
Title: `Add [Your Name] to columbia.network`

## Add the Widget to Your Site

Add this before `</body>` on your site. We detect your page from your URL in the webring, so no config required.

```html
<script src="https://columbia.network/webring.js" async></script>
```

Or use the API route (same script, with cache + CORS headers): `https://columbia.network/api/embed`

**Optional:** Add `data-member-id="your-id"` if we can’t detect your site (e.g. staging URL). Add `data-theme="light"` for a light bar on light backgrounds.

**What it does:** Center shows the Columbia crest (links to columbia.network). Arrows are prev/next in the ring. Swipe or use arrow keys on the bar.
