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

```html
<script
  async
  src="https://columbia.network/webring.js"
  data-member-id="your-name"
  data-theme="dark">
</script>
```

**What it does:**  
- Center link → [columbia.network](https://columbia.network)  
- Arrows → prev/next member sites in the ring (swipe or arrow keys on the bar)

**Customize:** `data-theme="dark"` or `"light"` to match your site.
