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
  majors?: string[];
  roles?: string[];
  verticals?: string[];
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

  {
    id: "james-karmacharya",
    name: "James Karmacharya",
    program: "Econ-French",
    email: "jk4693@columbia.edu",
    profilePic: "https://media.licdn.com/dms/image/v2/D4E03AQGLbPjP7MbXGg/profile-displayphoto-crop_800_800/B4EZhD4LLXGYAI-/0/1753485457623?e=1774483200&v=beta&t=okHpudZgDYc2-sP6tHWJAQ2OHHTyOQ8J2QO4XcSV_Gs",
    linkedin: "https://www.linkedin.com/in/jkarma111",
    connections: ["ansh-krishna", "manas-chan"],
  },

  {
    id: "dev-gehlaut",
    name: "Dev Gehlaut",
    program: "Physics + CS",
    email: "dg3532@columbia.edu",
    roles: ["engineering", "ai/ml", "research", "hardware", "quant", "software"],
    verticals: ["ai", "robotics", "hard tech", "defense"],
    profilePic: "/photos/dev-gehlaut.png",
    linkedin: "https://www.linkedin.com/in/dev-gehlaut/",
    connections: ["ethan-schales", "rahul-arora", "ansh-krishna"],
  },

  {
    id: "tanish-sonone",
    name: "Tanish Sonone",
    program: "Applied Math",
    email: "trs2176@columbia.edu",
    roles: ["research", "finance", "ai/ml", "quant"],
    verticals: ["healthcare"],
    profilePic: "/photos/tanish-sonone.png",
    linkedin: "https://www.linkedin.com/in/tanishsonone/",
    connections: ["armaan-agrawal", "ansh-krishna", "abhiram-nandiraju", "alex-jerpelea"],
  },

  {
    id: "eddy-xu",
    name: "Eddy Xu",
    website: "https://eddy.build",
    email: "eddy@build.ai",
    roles: ["ai/ml", "hardware"],
    verticals: ["hard tech"],
    profilePic: "/photos/eddy-xu.png",
    twitter: "https://x.com/eddybuild",
    linkedin: "https://www.linkedin.com/in/edwardxu1569/",
    connections: ["ansh-krishna", "joseph-jojoe"],
  },

  {
    id: "mike-yu",
    name: "Mike Yu",
    website: "https://mikeyuyue.github.io/",
    program: "Biomedical Engineering",
    email: "yy3685@columbia.edu",
    roles: ["engineering"],
    verticals: ["healthcare", "robotics", "hard tech"],
    profilePic: "/photos/mike-yu.jpg",
    linkedin: "https://www.linkedin.com/in/yue-yu-313829268/",
    github: "https://github.com/mikeyuyue",
    connections: ["vihaan-shah", "ansh-krishna"],
  },


  {
    id: "jeremy-galang",
    name: "Jeremy Galang",
    program: "Financial Economics & Math",
    email: "jeremy.g@columbia.edu",
    roles: ["vc", "software", "growth"],
    verticals: ["consumer", "saas"],
    profilePic: "/photos/jeremy-galang.jpg",
    instagram: "instagram.com/jtfgalang/",
    linkedin: "https://www.instagram.com/jtfgalang/",
    connections: ["alex-jerpelea", "ansh-krishna", "arm-komolhiran", "david-xiong", "ella-sy", "joseph-jojoe", "justin-hou", "ravin-chutijirawong", "sid-rout"],
  },


  {
    id: "david-xiong",
    name: "David Xiong",
    program: "CS & Math",
    email: "yx2948@columbia.edu",
    roles: ["engineering", "software", "product", "research", "ai/ml", "hardware"],
    verticals: ["consumer", "ai", "saas"],
    profilePic: "/photos/david-xiong.jpg",
    twitter: "https://x.com/david_y_xiong",
    linkedin: "www.linkedin.com/in/david-yimingxiong",
    github: "https://github.com/helsinki1",
    connections: ["aedin-pereira", "arm-komolhiran", "ansh-krishna", "ethan-rhee", "justin-hou", "joseph-jojoe"],
  },


  {
    id: "ryon-roque",
    name: "Ryon Roque",
    program: "Civil Engineering",
    email: "rmr2209@columbia.edu",
    roles: ["engineering"],
    verticals: ["robotics", "hard tech"],
    profilePic: "/photos/ryon-roque.jpg",
    linkedin: "https://www.linkedin.com/in/ryon-roque-792038220/",
    connections: ["ansh-krishna", "arm-komolhiran", "ella-sy", "joseph-jojoe", "justin-hou", "justine-mach", "marcus-lam", "ethan-rhee"],
  },

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
    email: "enr2131@columbia.edu",
    github: "",
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
    email: "an3439@columbia.edu",
    github: "https://github.com/AbhiN34",
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
    email: "ak5578@columbia.edu",
    github: "https://github.com/anshhkrishna",
    twitter: "https://x.com/anshhkrishna",
    linkedin: "https://linkedin.com/in/ansh-krishna",
    connections: ["manas-chan", "opalina-khanna"],
  },
  {
    id: "alex-jerpelea",
    name: "Alex Jerpelea",
    website: "",
    program: "CS + Applied Maths",
    majors: ["Computer Science", "Applied Physics And Applied Mathematics"],
    minors: [],
    roles: ["engineering", "product", "ai/ml", "research", "software"],
    verticals: ["hard tech", "consumer"],
    profilePic: "/photos/alex-jerpelea.png",
    email: "",
    github: "",
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
    email: "mc5269@columbia.edu",
    github: "https://github.com/goatchan28",
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
    email: "",
    github: "",
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
    email: "jj3390@columbia.edu",
    github: "https://github.com/josephjojoe",
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
    email: "vvs2119@columbia.edu",
    github: "",
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
    email: "aa5851@columbia.edu",
    github: "https://github.com/armaan-25",
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
    email: "ts3241@columbia.edu",
    github: "",
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
    email: "sr4370@columbia.edu",
    github: "https://github.com/routsiddharth",
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
    email: "jgh2147@columbia.edu",
    github: "",
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
    email: "jpm2239@columbia.edu",
    github: "",
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
    email: "ok2373@columbia.edu",
    github: "",
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
    email: "sml2286@columbia.edu",
    github: "",
    linkedin: "https://www.linkedin.com/in/marcus-lam-maker/",
    connections: ["ansh-krishna", "opalina-khanna", "justin-hou", "justine-mach", "ravin-chutijirawong", "joseph-jojoe", "abhinav-goel"],
  },

  {
    id: "veer-chopra",
    name: "Veer Chopra",
    website: "",
    program: "Financial Engineering",
    majors: ["Industrial Engineering And Operations Research"],
    minors: [],
    roles: ["engineering", "software", "research"],
    verticals: ["ai", "healthcare", "consumer", "saas"],
    profilePic: "/photos/veer-chopra.png",
    email: "vc2730@columbia.edu",
    github: "",
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
    email: "sk5531@columbia.edu",
    github: "",
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
    email: "egs2180@columbia.edu",
    github: "",
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
    email: "jw4877@columbia.edu",
    github: "https://github.com/jonathanwang10",
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
    email: "ads2297@columbia.edu",
    github: "",
    linkedin: "https://www.linkedin.com/in/anibal-david-segovia-baldelomar-9b9b1233b/",
    connections: ["justine-mach", "alex-jerpelea", "ella-sy", "ravin-chutijirawong", "ansh-krishna", "sid-rout", "tanush-sawhney"],
  },

  {
    id: "abhinav-goel",
    name: "Abhinav Goel",
    website: "https://abhigoel25.github.io/abhiportfolio/",
    program: "CS + Operations Research",
    majors: ["Computer Science", "Industrial Engineering And Operations Research"],
    minors: [],
    roles: ["ai/ml", "research"],
    verticals: ["ai", "robotics", "hard tech"],
    profilePic: "/photos/abhinav-goel.png",
    email: "ag5252@columbia.edu",
    github: "https://github.com/abhigoel25",
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
    email: "mg4923@columbia.edu",
    github: "",
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
    email: "ps3561@columbia.edu",
    github: "",
    linkedin: "https://www.linkedin.com/in/pratyush-singhal-2241922ab/",
    connections: ["ansh-krishna", "veer-chopra", "tanush-sawhney", "abhinav-goel"],
  },

  {
    id: "anay-garodia",
    name: "Anay Garodia",
    website: "https://www.anaygarodia.com/",
    program: "Math + CS",
    majors: ["Mathematics", "Computer Science"],
    minors: [],
    roles: ["engineering", "product", "software", "quant", "research", "ai/ml"],
    verticals: ["ai"],
    profilePic: "/photos/anay-garodia.png",
    email: "ag5250@columbia.edu",
    github: "https://github.com/AnayGarodia",
    linkedin: "https://www.linkedin.com/in/anay-garodia-a863a6257/",
    connections: ["ansh-krishna", "pratyush-singhal", "abhinav-goel", "veer-chopra"],
  },

  {
    id: "naythan-chan",
    name: "Naythan Chan",
    website: "https://naythanchan.com/",
    program: "CS + Applied Math",
    majors: ["Computer Science", "Applied Physics And Applied Mathematics"],
    minors: [],
    roles: ["quant", "ai/ml", "research", "finance", "vc", "software"],
    verticals: ["ai", "fintech", "robotics"],
    profilePic: "/photos/naythan-chan.png",
    email: "nkc2128@columbia.edu",
    github: "https://github.com/naythanchan",
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
    email: "ap4672@columbia.edu",
    github: "https://github.com/coolkidaedy",
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
    email: "ra3206@columbia.edu",
    github: "",
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
    email: "asg2288@columbia.edu",
    github: "",
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
    email: "es4434@columbia.edu",
    github: "",
    linkedin: "https://www.linkedin.com/in/ethan41sch/",
    connections: ["ansh-krishna", "sid-rout", "rahul-arora"],
  },

  {
    id: "shaina-sahu",
    name: "Shaina Sahu",
    program: "CS",
    email: "ss7017@columbia.edu",
    roles: ["engineering", "product", "ai/ml", "software"],
    verticals: ["ai", "edtech", "saas", "consumer", "creator tools"],
    profilePic: "/photos/shaina-sahu.png",
    linkedin: "https://www.linkedin.com/in/shaina-sahu-32b330284/",
  },
  {
    id: "chris-chang",
    name: "Chris Chang",
    program: "CS",
    email: "cc5011@columbia.edu",
    roles: ["engineering", "ai/ml", "research", "software"],
    verticals: ["ai", "saas", "creator tools", "fintech"],
    profilePic: "/photos/chris-chang.png",
    linkedin: "https://www.linkedin.com/in/cchang3906/",
    github: "https://github.com/cchang3906",
    connections: ["armaan-agrawal", "sid-rout", "alex-jerpelea", "jonathan-wang", "ansh-krishna", "mihir-garimella", "rahul-arora"],
  },

  {    id: "claryssa-tarigan",
    name: "Claryssa Tarigan",
    website: "https://portfolio-lyart-three-57.vercel.app/",
    program: "CS",
    email: "cat2225@columbia.edu",
    roles: ["ai/ml", "research", "product", "design"],
    verticals: ["ai", "robotics", "saas", "edtech"],
    profilePic: "/photos/claryssa-tarigan.jpg",
    instagram: "claryya",
    linkedin: "https://www.linkedin.com/in/claryssa-yuanwie",
    github: "https://github.com/claryssayuanwie",
    connections: ["alex-jerpelea", "shaina-sahu", "naythan-chan", "anay-garodia"],
  },

  {
    id: "shinnyom-park",
    name: "Shinnyom Park",
    program: "Financial Economics & CS",
    email: "sp4587@columbia.edu",
    profilePic: "/photos/shinnyom-park.jpg",
    linkedin: "https://www.linkedin.com/in/shinnyom-david-park-642775363",
  },

  {
    id: "christopher-lee",
    name: "Christopher Lee",
    program: "Math & CS",
    email: "cl4371@columbia.edu",
    profilePic: "/photos/christopher-lee.png",
    linkedin: "https://www.linkedin.com/in/christopher-lee8/",
  },

  {
    id: "mukilan-rajasekar",
    name: "Mukilan Rajasekar",
    program: "Fin Econ",
    email: "mukilan.rajasekar@columbia.edu",
    roles: ["finance"],
    verticals: ["fintech"],
    profilePic: "/photos/mukilan-rajasekar.jpg",
    linkedin: "https://www.linkedin.com/in/mukilan-r/",
    connections: ["abhinav-goel", "abhiram-nandiraju", "ansh-krishna", "armaan-agrawal", "chris-chang", "justine-mach", "jonathan-wang", "sid-rout", "veer-chopra", "ethan-schales", "rahul-arora", "mihir-garimella"],
  },

  {
    id: "tensae-laki",
    name: "Tensae Laki",
    program: "CS + Econ Or Biz",
    email: "thl2130@columbia.edu",
    roles: ["engineering", "product", "growth", "ai/ml", "software", "vc"],
    verticals: ["ai", "edtech", "saas", "consumer", "creator tools", "fintech"],
    profilePic: "/photos/tensae-laki.jpg",
    instagram: "https://www.instagram.com/tensu.lx/",
    linkedin: "https://www.linkedin.com/in/tensae-laki-491595283/",
    github: "https://github.com/SpectrrT",
    connections: ["veer-chopra", "abhiram-nandiraju", "anibal-segovia", "ansh-krishna", "arm-komolhiran", "ethan-rhee", "ella-sy", "jeremy-galang", "justin-hou", "sid-rout", "rahul-arora", "naythan-chan", "joseph-jojoe", "justine-mach", "mihir-garimella"],
  },

  {
    id: "todd-enkhbat",
    name: "Todd Enkhbat",
    website: "https://www.toddenkhbat.com/",
    program: "Physics & Philosophy",
    email: "tsogt.e@columbia.edu",
    roles: ["engineering", "product", "research", "vc", "hardware"],
    verticals: ["hard tech", "defense", "edtech", "climate"],
    profilePic: "/photos/todd-enkhbat.png",
    instagram: "https://www.instagram.com/tsokue___/",
    twitter: "https://x.com/the_tallerpoppy",
    linkedin: "https://www.linkedin.com/in/tsogt-enkhbat-/",
    connections: ["naythan-chan", "justine-mach", "justin-hou", "ethan-rhee", "arm-komolhiran"],  },

  {
    id: "esra-lepadatu",
    name: "Esra Lepadatu",
    program: "Econ + Psych",
    email: "eln2128@columbia.edu",
    roles: ["growth", "product"],
    verticals: ["consumer"],
    profilePic: "/photos/esra-lepadatu.png",
    twitter: "https://x.com/esralepadatu?s=21",
    linkedin: "https://www.linkedin.com/in/esralepadatu/",
    connections: ["ansh-krishna", "justine-mach", "justin-hou", "naythan-chan", "sid-rout", "jeremy-galang", "ella-sy", "arm-komolhiran", "alex-jerpelea", "ravin-chutijirawong"],
  },

  {
    id: "annie-dong",
    name: "Annie Dong",
    program: "Applied Statistics",
    email: "annie@comma.vc",
    roles: ["vc"],
    verticals: ["consumer", "creator tools"],
    profilePic: "/photos/annie-dong.png",
    linkedin: "https://www.linkedin.com/in/anniedongg/",
    connections: ["ansh-krishna", "sid-rout", "naythan-chan", "justine-mach", "joseph-jojoe", "marcus-lam", "justin-hou", "rahul-arora", "abhiram-nandiraju", "arm-komolhiran"],
  },

  {
    id: "amrutha-rao",
    name: "Amrutha Rao",
    website: "https://amrutharao.me/",
    program: "Applied Math and CS",
    email: "arr2249@columbia.edu",
    roles: ["engineering", "ai/ml", "research", "software", "product"],
    verticals: ["ai", "consumer", "marketplaces"],
    profilePic: "/photos/amrutha-rao.jpg",
    twitter: "https://x.com/amrutha_rao_",
    linkedin: "https://www.linkedin.com/in/amrutha-rao-ab9360239/",
    connections: ["aedin-pereira", "arm-komolhiran", "david-xiong", "ethan-rhee", "joseph-jojoe", "justin-hou", "mihir-garimella", "tanush-sawhney", "naythan-chan"],
  },

  {
    id: "arleen-alcaraz-cano",
    name: "Arleen Alcaraz-Cano",
    website: "https://www.arleenaricey.live/",
    program: "CS",
    email: "aaa2428@barnard.edu",
    roles: ["product", "ai/ml", "design"],
    profilePic: "/photos/arleen-alcaraz-cano.jpg",
    linkedin: "https://www.linkedin.com/in/arleen-alcaraz-cano/",
  },

  {
    id: "michael-botti",
    name: "Michael Botti",
    program: "Operations Research",
    email: "mrb2306@columbia.edu",
    roles: ["growth", "finance", "ai/ml", "vc"],
    verticals: ["fintech", "ai"],
    profilePic: "/photos/michael-botti.gif",
    linkedin: "https://www.linkedin.com/in/michaelbotti11/",
    connections: ["rahul-arora", "anibal-segovia"],
  },

  {
    id: "zhexuan-li",
    name: "Zhexuan Li",
    program: "Cognitive Science + CS",
    email: "zl3553@columbia.edu",
    roles: ["vc", "research", "finance"],
    verticals: ["robotics", "ai", "healthcare", "saas", "hard tech", "fintech"],
    profilePic: "/photos/zhexuan-li.jpg",
    linkedin: "https://www.linkedin.com/in/zhexuanli/",
    connections: ["amrutha-rao", "annie-dong", "ella-sy", "justin-hou", "marcus-lam", "ethan-rhee", "arm-komolhiran", "ryon-roque", "naythan-chan"],
  },

  {
    id: "kavya-amrutham",
    name: "Kavya Amrutham",
    program: "Computational Biology, Cognitive Science",
    email: "ka3041@columbia.edu",
    roles: ["product", "design", "growth", "ai/ml", "research", "hardware", "vc"],
    verticals: ["climate", "ai", "healthcare", "hard tech", "creator tools", "edtech", "consumer"],
    profilePic: "/photos/kavya-amrutham.png",
    linkedin: "https://www.linkedin.com/in/kavyaamru/",
    connections: ["abhiram-nandiraju", "aiden-gandhi", "alex-jerpelea", "amrutha-rao", "anay-garodia", "anibal-segovia", "annie-dong", "ansh-krishna", "arm-komolhiran", "armaan-agrawal", "ella-sy", "david-xiong", "todd-enkhbat", "tanush-sawhney", "sid-rout", "ryon-roque", "shaina-sahu", "ravin-chutijirawong", "joseph-jojoe", "justine-mach", "esra-lepadatu", "marcus-lam", "rahul-arora", "aedin-pereira", "justin-hou"],
  },

  {
    id: "piyush-nawade",
    name: "Piyush Nawade",
    website: "thesesamestreet.com",
    program: "Financial Economics + Architecture",
    email: "pn2437@columbia.edu",
    roles: ["design", "product", "research", "finance", "vc"],
    verticals: ["fintech", "edtech", "robotics", "healthcare", "ai", "consumer"],
    profilePic: "/photos/piyush-nawade.jpg",
    linkedin: "https://www.linkedin.com/in/linkedin.com/in/piyush-nawade",
    connections: ["aedin-pereira", "james-karmacharya", "tanish-sonone"],
  },

  {
    id: "ahmed-ashraf",
    name: "Ahmed Ashraf",
    program: "CS",
    email: "aaa2419@columbia.edu",
    roles: ["engineering", "ai/ml", "research"],
    verticals: ["ai", "hard tech"],
    profilePic: "/photos/ahmed-ashraf.jpg",
    linkedin: "https://www.linkedin.com/in/ahmedashrafa/",
  },

  {
    id: "eliyjtvqjbolnessnrtaybi",
    name: "eLIYJtVQJbOlnEssNRtAybi",
    website: "jXkLIlkiMoseUnntfk",
    program: "GlhkuUDKcpisXLVX",
    email: "i.q.oga.v.o.ti.853@gmail.com",
    profilePic: "xtHbJEcMjMAlnRghLh",
    instagram: "https://www.instagram.com/wdplnRkXbRqJMvXTdA",
    twitter: "https://x.com/rDrVgXeACwnjkpFWHjIdLWOq",
    linkedin: "https://www.linkedin.com/in/ahKVVDhOJHorQoCbVYHSnV",
    github: "https://github.com/dONFNWPGGtlSyNFKEi",
    connections: ["aiden-gandhi"],
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
