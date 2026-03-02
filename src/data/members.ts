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
    profilePic: "/photos/ansh-krishna.png",
    twitter: "https://x.com/anshhkrishna",
    linkedin: "https://linkedin.com/in/ansh-krishna",
    connections: ["manas-chan", "opalina-khanna"],
  },
  {
    id: "alex-jerpelea",
    name: "Alex Jerpelea",
    website: "",
    program: "CS + Applied Maths",
    roles: ["engineering", "product", "ai/ml", "research", "software"],
    verticals: ["hard tech", "consumer"],
    profilePic: "/photos/alex-jerpelea.png",
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
    profilePic: "/photos/manas-chan.png",
    linkedin: "https://www.linkedin.com/in/manas-chan/",
    connections: ["ansh-krishna"],
  },

  {
    id: "ravin-chutijirawong",
    name: "Ravin Chutijirawong",
    program: "Computational Biology + Economics",
    roles: ["ai/ml", "research", "software", "vc"],
    verticals: ["ai", "healthcare", "saas", "consumer", "creator tools"],
    profilePic: "/photos/ravin-chutijirawong.png",
    linkedin: "https://www.linkedin.com/in/ravin-chutijirawong-5b8700350/",
    connections: ["ansh-krishna", "alex-jerpelea"],
  },

  {
    id: "joseph-jojoe",
    name: "Joseph Jojoe",
    website: "https://www.josephjojoe.com/",
    program: "CS + Math",
    roles: ["design", "product", "ai/ml", "software", "vc"],
    verticals: ["ai", "edtech", "marketplaces", "hard tech", "consumer", "saas", "creator tools"],
    profilePic: "/photos/joseph-jojoe.png",
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
    profilePic: "/photos/vihaan-shah.png",
    linkedin: "https://www.linkedin.com/in/vihaan-shah/",
    connections: ["ansh-krishna"],
  },

  {
    id: "armaan-agrawal",
    name: "Armaan Agrawal",
    program: "Computer Science + Statistics",
    roles: ["engineering"],
    verticals: [],
    profilePic: "/photos/armaan-agrawal.png",
    linkedin: "https://www.linkedin.com/in/armaan-agraw/",
    twitter: "https://x.com/armaana_25?s=11&t=A3P-oYJ-xIQKCrTaZ8plvg",
    connections: ["ansh-krishna", "alex-jerpelea"],
  },

  {
    id: "tanush-sawhney",
    name: "Tanush Sawhney",
    website: "",
    program: "Econ + CS-Math",
    roles: ["product", "growth", "ai/ml", "research", "software", "finance"],
    verticals: ["ai", "fintech", "hard tech"],
    profilePic: "/photos/tanush-sawhney.png",
    linkedin: "https://www.linkedin.com/in/tanushsawhney/",
    twitter: "https://x.com/tanusawhney",
    connections: ["ansh-krishna", "alex-jerpelea", "joseph-jojoe"],
  },

  {
    id: "sid-rout",
    name: "Sid Rout",
    website: "sidrout.com",
    program: "Math + CS",
    roles: ["engineering", "quant"],
    verticals: ["fintech", "saas", "consumer"],
    profilePic: "/photos/sid-rout.png",
    linkedin: "https://www.linkedin.com/in/siddharth-rout-69a0191b9/",
    connections: ["alex-jerpelea", "ravin-chutijirawong", "ansh-krishna", "armaan-agrawal", "tanush-sawhney"],
  },

  {
    id: "justin-hou",
    name: "Justin Hou",
    website: "http://justinhou.me",
    program: "CS",
    roles: ["product", "growth", "software", "vc"],
    verticals: ["saas", "consumer"],
    profilePic: "/photos/justin-hou.png",
    twitter: "https://x.com/justinhouu",
    linkedin: "https://www.linkedin.com/in/justinhou2005/",
    connections: ["ansh-krishna", "tanush-sawhney", "alex-jerpelea", "sid-rout", "joseph-jojoe", "ravin-chutijirawong"],
  },

  {
    id: "justine-mach",
    name: "Justine Mach",
    website: "http://justinemach.com",
    program: "CS + History",
    roles: ["design", "growth", "vc"],
    verticals: ["consumer", "creator tools"],
    profilePic: "/photos/justine-mach.png",
    linkedin: "https://www.linkedin.com/in/justinemach/",
    twitter: "https://x.com/MachJustine",
    connections: ["ansh-krishna", "sid-rout", "justin-hou", "joseph-jojoe", "tanush-sawhney", "alex-jerpelea", "ravin-chutijirawong"],
  },

  {
    id: "opalina-khanna",
    name: "Opalina Khanna",
    website: "",
    program: "Computer Engineering",
    roles: ["engineering", "product", "hardware"],
    verticals: ["ai", "fintech", "robotics"],
    profilePic: "/photos/opalina-khanna.png",
    linkedin: "https://www.linkedin.com/in/opalina-khanna/",
    connections: ["ansh-krishna"],
  },

  {
    id: "marcus-lam",
    name: "Marcus Lam",
    website: "",
    program: "Computer Engineering",
    roles: ["engineering", "product", "ai/ml", "hardware"],
    verticals: ["robotics", "hard tech"],
    profilePic: "/photos/marcus-lam.png",
    linkedin: "https://www.linkedin.com/in/marcus-lam-maker/",
    connections: ["ansh-krishna", "opalina-khanna", "justin-hou", "justine-mach", "ravin-chutijirawong", "joseph-jojoe", "abhinav-goel"],
  },

  {
    id: "veer-chopra",
    name: "Veer Chopra",
    website: "",
    program: "Financial Engineering",
    roles: ["engineering", "software", "research"],
    verticals: ["ai", "healthcare", "consumer", "saas"],
    profilePic: "/photos/veer-chopra.png",
    linkedin: "https://www.linkedin.com/in/veer-chopra-b2a530262/",
    connections: ["armaan-agrawal", "tanush-sawhney", "alex-jerpelea", "ansh-krishna", "ravin-chutijirawong", "justin-hou", "justine-mach"],
  },

  {
    id: "arm-komolhiran",
    name: "Arm Komolhiran",
    website: "",
    program: "CS",
    roles: ["engineering", "product", "ai/ml", "software"],
    verticals: ["ai", "climate"],
    profilePic: "/photos/arm-komolhiran.png",
    linkedin: "https://www.linkedin.com/in/siwakornkomol/",
    connections: ["alex-jerpelea", "sid-rout", "justine-mach", "tanush-sawhney", "marcus-lam", "justin-hou", "joseph-jojoe", "ansh-krishna", "ravin-chutijirawong", "veer-chopra"],
  },

  {
    id: "ella-sy",
    name: "Ella Sy",
    website: "",
    program: "Chemical Engineering",
    roles: ["product", "growth", "software"],
    profilePic: "/photos/ella-sy.png",
    linkedin: "https://www.linkedin.com/in/ella-sy-9846a52a7/",
    connections: ["ravin-chutijirawong", "sid-rout", "joseph-jojoe", "veer-chopra", "arm-komolhiran", "justin-hou", "justine-mach", "ansh-krishna", "alex-jerpelea", "marcus-lam", "tanush-sawhney"],
  },

  {
    id: "jonathan-wang",
    name: "Jonathan Wang",
    website: "",
    program: "CS + Math",
    roles: ["engineering", "product", "ai/ml", "research", "finance", "quant"],
    verticals: ["consumer", "ai", "fintech"],
    profilePic: "/photos/jonathan-wang.png",
    linkedin: "https://www.linkedin.com/in/jonathanwang10/",
    twitter: "https://x.com/jonathan10wang",
    connections: ["ansh-krishna", "armaan-agrawal", "alex-jerpelea", "sid-rout"],
  },

  {
    id: "anibal-segovia",
    name: "Anibal Segovia",
    website: "",
    program: "Economics",
    roles: ["growth"],
    profilePic: "/photos/anibal-segovia.png",
    linkedin: "https://www.linkedin.com/in/anibal-david-segovia-baldelomar-9b9b1233b/",
    connections: ["justine-mach", "alex-jerpelea", "ella-sy", "ravin-chutijirawong", "ansh-krishna", "sid-rout", "tanush-sawhney"],
  },

  {
    id: "abhinav-goel",
    name: "Abhinav Goel",
    website: "https://abhigoel25.github.io/abhiportfolio/",
    program: "CS + Operations Research",
    roles: ["ai/ml", "research"],
    verticals: ["ai", "robotics", "hard tech"],
    profilePic: "/photos/abhinav-goel.png",
    linkedin: "https://www.linkedin.com/in/abhinav-goel-041ba8266/",
    connections: ["ansh-krishna", "armaan-agrawal", "veer-chopra", "sid-rout", "marcus-lam"],
  },

  {
    id: "mihir-garimella",
    name: "Mihir Garimella",
    website: "",
    program: "CS",
    roles: ["product", "ai/ml"],
    verticals: ["ai"],
    profilePic: "/photos/mihir-garimella.png",
    linkedin: "https://www.linkedin.com/in/mihir-garimella/",
    connections: ["ansh-krishna", "abhinav-goel", "armaan-agrawal", "sid-rout", "alex-jerpelea"],
  },

  {
    id: "pratyush-singhal",
    name: "Pratyush Singhal",
    website: "",
    program: "CS",
    roles: ["engineering", "product", "software"],
    verticals: ["ai", "hard tech"],
    profilePic: "/photos/pratyush-singhal.png",
    linkedin: "https://www.linkedin.com/in/pratyush-singhal-2241922ab/",
    connections: ["ansh-krishna", "veer-chopra", "tanush-sawhney", "abhinav-goel"],
  },

  {
    id: "anay-garodia",
    name: "Anay Garodia",
    website: "",
    program: "Math + CS",
    roles: ["engineering", "product", "software", "quant", "research", "ai/ml"],
    verticals: ["ai"],
    profilePic: "/photos/anay-garodia.png",
    linkedin: "https://www.linkedin.com/in/anay-garodia-a863a6257/",
    connections: ["ansh-krishna", "pratyush-singhal", "abhinav-goel", "veer-chopra"],
  },

  {
    id: "naythan-chan",
    name: "Naythan Chan",
    website: "https://naythanchan.com/",
    program: "CS + Applied Math",
    roles: ["quant", "ai/ml", "research", "finance", "vc", "software"],
    verticals: ["ai", "fintech", "robotics"],
    profilePic: "/photos/naythan-chan.png",
    linkedin: "https://www.linkedin.com/in/naythanchan/",
    connections: ["ansh-krishna", "justin-hou", "ravin-chutijirawong", "anibal-segovia", "sid-rout", "arm-komolhiran", "marcus-lam", "tanush-sawhney", "ella-sy", "joseph-jojoe", "justine-mach"],
  },

  {
    id: "aedin-pereira",
    name: "Aedin Pereira",
    website: "https://www.aedinpereira.dev/",
    program: "CS + Philosophy",
    roles: ["engineering", "ai/ml", "software"],
    verticals: ["consumer", "fintech", "ai"],
    profilePic: "/photos/aedin-pereira.jpg",
    linkedin: "www.linkedin.com/in/aedin-pereira",
    twitter: "https://x.com/aedinpereira",
    connections: ["ansh-krishna", "sid-rout", "justin-hou", "joseph-jojoe", "anibal-segovia", "alex-jerpelea", "ravin-chutijirawong", "arm-komolhiran"],
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
