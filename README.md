# columbia.network

A webring for Columbia University students.

---

## Join the Webring

**Requirements:** Columbia student (website optional but encouraged)

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
  connections: ["ansh-krishna"],
},
```

Optional fields:

| Field | Description |
|-------|-------------|
| `program` | Your major (e.g. `"Computer Science"`) |
| `year` | Graduation year (e.g. `"2027"`) |
| `roles` | What you do (pick from list below) |
| `verticals` | Industries you're into (pick from list below) |
| `instagram` | Full URL (e.g. `"https://instagram.com/you"`) |
| `twitter` | Full URL (e.g. `"https://x.com/you"`) |
| `linkedin` | Full URL (e.g. `"https://linkedin.com/in/you"`) |

Roles: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc

Verticals: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools

**Connections:** To link yourself to someone on the constellation map, add their ID to your `connections` array. You can find everyone's ID by visiting [columbia.network](https://columbia.network) or by looking at existing entries in `src/data/members.ts`. IDs are lowercase with hyphens (e.g. `"ansh-krishna"`).

**3. Fill out the join form**

Once you've added yourself locally (or even if you haven't), fill out the form at:

- https://columbia.network/join

The form opens a pull request for you that updates `src/data/members.ts`.
