/**
 * COLUMBIA WEBRING MEMBERS
 * 
 * To add yourself to the webring as a member:
 * 1. Fill out the public join form at https://columbia.network/join
 * 2. We'll review and then add your entry to the members array below
 *
 * If you're working on the project locally and want to test things:
 * 1. Add your profile picture to /public/photos/ (see below)
 * 2. Add your entry to the members array below
 * 
 * Required fields:
 * - id: Your name with hyphens (e.g., "john-doe")
 * - name: Your full name
 *
 * Recommended:
 * - website: Your personal website URL (optional but encouraged)
 * 
 * Optional fields:
 * - program: Your major/program at Columbia
 * - year: Your graduation year
 * - roles: Tags for what you do (e.g., ["engineering", "design", "writer"])
 *          Options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc
 * - verticals: Tags for industries you're interested in (e.g., ["fintech", "ai", "climate"])
 *              Options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
 * - majors: One or more majors (pick from join form list)
 * - minors: One or more minors (pick from join form list)
 * - profilePic: Path to your photo (see instructions below)
 * - email: Contact email (e.g., "uni@columbia.edu")
 * - instagram: Full URL to your Instagram profile
 * - twitter: Full URL to your Twitter/X profile
 * - linkedin: Full URL to your LinkedIn profile
 * - github: Full URL to your GitHub profile
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
  majors?: string[];
  minors?: string[];
  profilePic?: string;
  email?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
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
  //   majors: ["Computer Science"],
  //   minors: [],
  //   roles: ["engineering", "design"],
  //   verticals: ["fintech", "ai"],
  //   profilePic: "/photos/john-doe.jpg",
  //   email: "uni@columbia.edu",
  //   instagram: "https://instagram.com/johndoe",
  //   twitter: "https://x.com/johndoe",
  //   linkedin: "https://linkedin.com/in/johndoe",
  //   connections: ["jane-smith", "bob-wilson"],
  // },

  {
    id: "ethan-rhee",
    name: "Ethan Rhee",
    program: "Econ + CS",
    roles: ["vc"],
    profilePic: "/photos/ethan-rhee.png",
    linkedin: "https://www.linkedin.com/in/ethan-rhee/",
    twitter: "https://x.com/rheeethann",
    connections: ["sid-rout", "ravin-chutijirawong", "naythan-chan", "justine-mach", "justin-hou", "abhiram-nandiraju", "rahul-arora", "ansh-krishna", "aedin-pereira", "ella-sy", "tanush-sawhney", "arm-komolhiran"],
  },
  {
    id: "abhiram-nandiraju",
    name: "Abhiram Nandiraju",
    program: "CS",
    roles: ["product", "vc"],
    verticals: ["consumer", "saas"],
    profilePic: "/photos/abhiram-nandiraju.png",
    linkedin: "https://www.linkedin.com/in/abhinandiraju/",
    twitter: "https://x.com/abhiramn34",
    connections: ["justine-mach", "justin-hou", "alex-jerpelea", "rahul-arora", "ella-sy", "ansh-krishna", "ravin-chutijirawong", "arm-komolhiran", "armaan-agrawal", "sid-rout"],
  },
  {
    id: "ansh-krishna",
    name: "Ansh Krishna",
    website: "https://anshkrishna.com",
    program: "CS + Economics",
    majors: ["Computer Science", "Economics"],
    minors: [],
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
    majors: ["Computer Science", "Applied Physics and Applied Mathematics"],
    minors: [],
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
    majors: ["Computer Engineering Program"],
    minors: [],
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
    majors: ["Biological Sciences", "Economics"],
    minors: [],
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
    majors: ["Computer Science", "Mathematics"],
    minors: [],
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
    majors: ["Mechanical Engineering"],
    minors: [],
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
    majors: ["Computer Science", "Statistics"],
    minors: [],
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
    majors: ["Economics", "Computer Science", "Mathematics"],
    minors: [],
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
    majors: ["Mathematics", "Computer Science"],
    minors: [],
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
    majors: ["Computer Science"],
    minors: [],
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
    majors: ["Computer Science", "History"],
    minors: [],
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
    majors: ["Computer Engineering Program"],
    minors: [],
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
    majors: ["Computer Engineering Program"],
    minors: [],
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
    majors: ["Industrial Engineering and Operations Research"],
    minors: [],
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
    majors: ["Computer Science"],
    minors: [],
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
    majors: ["Chemical Engineering"],
    minors: [],
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
    majors: ["Computer Science", "Mathematics"],
    minors: [],
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
    majors: ["Economics"],
    minors: [],
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
    majors: ["Computer Science", "Industrial Engineering and Operations Research"],
    minors: [],
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
    majors: ["Computer Science"],
    minors: [],
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
    majors: ["Computer Science"],
    minors: [],
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
    majors: ["Mathematics", "Computer Science"],
    minors: [],
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
    majors: ["Computer Science", "Applied Physics and Applied Mathematics"],
    minors: [],
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
    majors: ["Computer Science", "Philosophy"],
    minors: [],
    roles: ["engineering", "ai/ml", "software"],
    verticals: ["consumer", "fintech", "ai"],
    profilePic: "/photos/aedin-pereira.jpg",
    linkedin: "www.linkedin.com/in/aedin-pereira",
    twitter: "https://x.com/aedinpereira",
    connections: ["ansh-krishna", "sid-rout", "justin-hou", "joseph-jojoe", "anibal-segovia", "alex-jerpelea", "ravin-chutijirawong", "arm-komolhiran"],
  },

  {
    id: "rahul-arora",
    name: "Rahul Arora",
    website: "rahulsarora.com",
    program: "CS",
    majors: ["Computer Science"],
    minors: [],
    roles: ["product", "software"],
    verticals: ["consumer"],
    profilePic: "/photos/rahul-arora.png",
    linkedin: "https://www.linkedin.com/in/rahul-arora-114540219/",
    twitter: "https://x.com/rahulsarora",
    connections: ["justin-hou", "armaan-agrawal", "justine-mach", "ella-sy", "naythan-chan", "ravin-chutijirawong", "mihir-garimella", "arm-komolhiran", "alex-jerpelea", "sid-rout", "anibal-segovia"],
  },

  {
    id: "aiden-gandhi",
    name: "Aiden Gandhi",
    website: "",
    program: "CS",
    majors: ["Computer Science"],
    minors: [],
    roles: ["research", "finance"],
    verticals: ["fintech", "ai"],
    profilePic: "/photos/aiden-gandhi.png",
    linkedin: "https://www.linkedin.com/in/aiden-gandhi/",
    connections: ["ansh-krishna"],
  },

  {
    id: "ethan-schales",
    name: "Ethan Schales",
    website: "",
    program: "Math + CS",
    majors: ["Mathematics", "Computer Science"],
    minors: [],
    roles: ["quant"],
    profilePic: "/photos/ethan-schales.png",
    linkedin: "https://www.linkedin.com/in/ethan41sch/",
    connections: ["ansh-krishna", "sid-rout", "rahul-arora"],
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
