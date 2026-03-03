# columbia.network

A webring for Columbia University students.

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Join the Webring

**Requirements:** Columbia student + contact email (website optional but encouraged)

**1. Add your photo**  
Save a square image (400x400px) to:

```
public/photos/your-name.jpg
```

**2. Add yourself to `src/data/members.ts`**

```ts
{
  id: "your-name",
  name: "Your Name",
  website: "https://yourwebsite.com", // optional
  profilePic: "/photos/your-name.jpg",
  majors: ["Computer Science"],
  minors: [],
  email: "uni@columbia.edu",
  connections: ["ansh-krishna"],
},
```

If you don't have a field yet, keep it in the object as an empty string (`""`) or empty array (`[]`).

Optional fields:

| Field | Description |
|-------|-------------|
| `program` | Your major (e.g. `"Computer Science"`) |
| `year` | Graduation year (e.g. `"2027"`) |
| `roles` | What you do (pick from list below) |
| `verticals` | Industries you're into (pick from list below) |
| `majors` | Array of majors from the join form list |
| `minors` | Array of minors from the join form list |
| `email` | Contact email (e.g. `"uni@columbia.edu"`) |
| `instagram` | Full URL (e.g. `"https://instagram.com/you"`) |
| `twitter` | Full URL (e.g. `"https://x.com/you"`) |
| `linkedin` | Full URL (e.g. `"https://linkedin.com/in/you"`) |
| `github` | Full URL (e.g. `"https://github.com/you"`) |

Roles: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc

Verticals: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools

**Connections:** To link yourself to someone on the constellation map, add their ID to your `connections` array. You can find everyone's ID by visiting [columbia.network](https://columbia.network) or by looking at existing entries in `src/data/members.ts`. IDs are lowercase with hyphens (e.g. `"ansh-krishna"`).

**3. Fill out the join form**

Once you've added yourself locally (or even if you haven't), fill out the form at:

- https://columbia.network/join

The form opens a pull request for you that updates `src/data/members.ts`.

Tip: On the members table, the links column stays compact by default; it expands to the full set after you search or click a member's name.

---

## Join Form Auto-PR Setup

The join form (`/join`) submits to `POST /api/join`, which uses the GitHub API to:

- create a new branch
- insert your entry into `src/data/members.ts` (right below `// ADD YOUR ENTRY BELOW THIS LINE`)
- open a pull request

To enable this locally (and in production), set these environment variables (see `.env.example`):

```bash
GITHUB_TOKEN=...
GITHUB_OWNER=anshhkrishna
GITHUB_REPO=columbia.network
```

Token permissions:

- Fine-grained PAT: `Contents` (read/write) + `Pull requests` (read/write) for this repo
- Classic PAT: `repo` scope

Note: Deploying with a write token means anyone can submit the form and create PRs. Add rate limiting / CAPTCHA / stricter validation if you expect spam.
