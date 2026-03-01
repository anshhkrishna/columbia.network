# columbia.network 🦁

The official webring for Columbia University students. Run by [anshkrishna.com](https://anshkrishna.com).

**Live:** https://columbia.network

## Join the webring

**Requirements:** Columbia student + personal website

1. **Add your photo (optional)**  
   Use a square image URL in the `avatar` field (e.g. `https://yoursite.com/photo.jpg`). If you don’t add one, your initials are shown.

2. **Add yourself to `sites.json`** — add your entry at the end:

```json
{
  "id": "your-name",
  "name": "Your Name",
  "major": "CS and Econ",
  "site": "https://yoursite.com",
  "avatar": "https://yoursite.com/photo.jpg",
  "github": "yourgithubhandle",
  "twitter": "yourtwitter",
  "linkedin": "yourlinkedin",
  "instagram": "yourinsta",
  "connections": ["friend-id", "another-member-id"]
}
```

- **Required:** `name`, `major`, `site`
- **Optional:** `id`, `avatar`, `github`, `twitter`, `linkedin`, `instagram`, `connections`
- **connections**: List of member `id`s (e.g. `"ansh-krishna"`). Lines in the network graph are drawn between you and everyone in your `connections` list — add friends/people you know in the webring.

3. **Submit a pull request** titled: `Add [Your Name] to columbia.network`  
4. Done 🎉

## Add the widget to your site

Put a link to the webring on your site so visitors can discover other members. For example, in your footer or sidebar:

- **Simple link (easy):**  
  `[columbia.network](https://columbia.network)` — “part of the columbia.network webring”.

- **Embed bar (recommended):**  
  Drop this near the bottom of your page:

```html
<div id="columbia-webring"></div>
<script
  async
  src="https://columbia.network/webring.js"
  data-member-id="your-id-from-sites.json"
  data-theme="dark">
</script>
```

Replace `your-id-from-sites.json` with the `id` you used in `sites.json` (e.g. `ansh-krishna`).

**What it does:**

- **Center link** → links to columbia.network
- **Arrows** → prev/next open the previous and next member sites in the ring
- **Swipe** → on touch devices, swipe left/right on the bar to go to next/previous site
- **Keyboard** → left/right arrow keys when the bar is focused

**Customize:** `data-theme` can be `"dark"` or `"light"` to match your site.

Linking to https://columbia.network and mentioning the webring is still totally fine if you don’t want to embed anything.

## Tech

Static HTML + vanilla JS. No framework. No build step.

---

made with ❤️ by [ansh](https://anshkrishna.com)
