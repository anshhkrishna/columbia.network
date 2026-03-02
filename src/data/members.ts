/**
 * COLUMBIA WEBRING MEMBERS
 * 
 * To add yourself to the webring:
 * 1. Fork this repository
 * 2. Add your profile picture to /public/photos/ (see below)
 * 3. Add your entry to the members array below
 * 4. Submit a pull request
 * 
 * Required fields:
 * - id: Your name with hyphens (e.g., "john-doe")
 * - name: Your full name
 * - website: Your personal website URL (required to be part of the webring!)
 * 
 * Optional fields:
 * - program: Your major/program at Columbia
 * - year: Your graduation year
 * - roles: Tags for what you do (e.g., ["engineering", "design", "writer"])
 *          Options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc
 * - verticals: Tags for industries you're interested in (e.g., ["fintech", "ai", "climate"])
 *              Options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
 * - profilePic: Path to your photo (see instructions below)
 * - instagram: Full URL to your Instagram profile
 * - twitter: Full URL to your Twitter/X profile
 * - linkedin: Full URL to your LinkedIn profile
 * - connections: Names of friends with hyphens (e.g., ["john-doe", "jane-smith"])
 * 
 * ADDING YOUR PROFILE PICTURE:
 * 1. Use a square image, ideally 400x400 pixels (your Twitter/X profile pic works great!)
 * 2. Save it as: public/photos/your-name.jpg (or .png)
 * 3. Set profilePic to: "/photos/your-name.jpg"
 */

export interface Member {
  id: string;
  name: string;
  website?: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  profilePic?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  connections?: string[];
}

export const ROLE_OPTIONS = [
  'engineering', 'design', 'product', 'growth', 'ai/ml', 'research',
  'hardware', 'quant', 'software', 'finance', 'vc',
] as const;

export const VERTICAL_OPTIONS = [
  'fintech', 'ai', 'climate', 'healthcare', 'edtech', 'marketplaces',
  'robotics', 'defense', 'hard tech', 'saas', 'consumer', 'creator tools',
] as const;

export interface Connection {
  fromId: string;
  toId: string;
}

export const members: Member[] = [
  // ============================================
  // ADD YOUR ENTRY BELOW THIS LINE
  // ============================================

  // Example entry (copy this as a template):
  // {
  //   id: "john-doe",
  //   name: "John Doe",
  //   website: "https://johndoe.com",
  //   program: "Computer Science",
  //   year: "2026",
  //   roles: ["engineering", "design"],
  //   verticals: ["fintech", "ai"],
  //   profilePic: "/photos/john-doe.jpg",
  //   instagram: "https://instagram.com/johndoe",
  //   twitter: "https://x.com/johndoe",
  //   linkedin: "https://linkedin.com/in/johndoe",
  //   connections: ["jane-smith", "bob-wilson"],
  // },

  {
    id: "ansh-krishna",
    name: "Ansh Krishna",
    website: "https://anshkrishna.com",
    program: "CS + Economics",
    roles: ["engineering", "growth", "software", "vc", "product"],
    verticals: ["fintech", "ai", "consumer", "healthcare", "edtech"],
    twitter: "https://x.com/anshhkrishna",
    linkedin: "https://linkedin.com/in/ansh-krishna",
    connections: ["manas-chan"],
  },
  {
    id: "alex-jerpelea",
    name: "Alex Jerpelea",
    website: "",
    program: "CS + Applied Maths",
    roles: ["engineering", "product", "ai/ml", "research", "software"],
    verticals: ["hard tech", "consumer"],
    twitter: "https://x.com/alexjerpelea",
    linkedin: "https://www.linkedin.com/in/alexandru-iulius-jerpelea-5828b2181/",
    connections: ["ansh-krishna"],
  },

  {
    id: "manas-chan",
    name: "Manas Chan",
    program: "Computer Engineering",
    roles: ["engineering", "hardware"],
    verticals: ["hard tech"],
    linkedin: "https://www.linkedin.com/in/manas-chan/",
    connections: ["ansh-krishna"],
  },

  {
    id: "ravin-chutijirawong",
    name: "Ravin Chutijirawong",
    program: "Computational Biology + Economics",
    roles: ["ai/ml", "research", "software", "vc"],
    verticals: ["ai", "healthcare", "saas", "consumer", "creator tools"],
    linkedin: "https://www.linkedin.com/in/ravin-chutijirawong-5b8700350/",
    connections: ["ansh-krishna", "alex-jerpelea"],
  },

  {
    id: "joseph-jojoe",
    name: "Joseph Jojoe",
    website: "https://www.josephjojoe.com/",
    program: "CS and Math",
    roles: ["design", "product", "ai/ml", "software", "vc"],
    verticals: ["ai", "edtech", "marketplaces", "hard tech", "consumer", "saas", "creator tools"],
    twitter: "https://x.com/josephjojoe",
    linkedin: "https://www.linkedin.com/in/josephjojoe/",
    connections: ["ansh-krishna", "ravin-chutijirawong", "alex-jerpelea"],
  },

  {
    id: "vihaan-shah",
    name: "Vihaan Shah",
    program: "Mechanical Engineering",
    roles: ["engineering", "software", "ai/ml", "research", "hardware"],
    verticals: ["ai", "robotics", "defense", "hard tech", "saas"],
    linkedin: "https://www.linkedin.com/in/vihaan-shah/",
    connections: ["ansh-krishna"],
  },

  // ============================================
  // ADD YOUR ENTRY ABOVE THIS LINE
  // ============================================
];

export function getConnections(): Connection[] {
  const connections: Connection[] = [];
  
  members.forEach(member => {
    if (member.connections) {
      member.connections.forEach(targetId => {
        if (members.some(m => m.id === targetId)) {
          connections.push({
            fromId: member.id,
            toId: targetId,
          });
        }
      });
    }
  });
  
  return connections;
}

export function getWebringNavigation(currentWebsite: string): { prev: Member | null; next: Member | null } {
  const index = members.findIndex(m => m.website === currentWebsite);
  if (index === -1) {
    return { prev: null, next: null };
  }
  
  const prevIndex = (index - 1 + members.length) % members.length;
  const nextIndex = (index + 1) % members.length;
  
  return {
    prev: members[prevIndex],
    next: members[nextIndex],
  };
}

export function getRandomMember(): Member {
  return members[Math.floor(Math.random() * members.length)];
}
