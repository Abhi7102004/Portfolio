export const ME = {
    name: "Abhishek Yadav",
    email: "abhishekyadav7102004@gmail.com",
    phone: "+91-8840638243",
    location: "Pune, India",
    github: "https://github.com/Abhi7102004",
    linkedin: "https://linkedin.com/in/abhishek-yadav",
    leetcode: "https://leetcode.com/Abhi7102004",
  
    roles: [
      "Software Engineer",
      "Full-Stack Developer",
      "Backend Engineer",
      "Fintech Systems Engineer",
      "Competitive Programmer",
    ],
  
    bio: "Full-stack software engineer with fintech internship experience at Pine Labs, building payment infrastructure and backend systems. Strong in Java, JavaScript, and REST APIs with 800+ DSA problems solved. Focused on scalable, production-grade systems.",
  
    education: {
      school: "Indian Institute of Information Technology, Nagpur",
      short: "IIIT Nagpur",
      degree: "B.Tech in Computer Science",
      period: "Nov 2022 – Jun 2026",
      cgpa: "8.70",
    },
  
    experience: [
      {
        company: "Pine Labs",
        role: "Software Engineer Intern",
        period: "Sept 2025 – Present",
        location: "Pune, India",
        tech: ["Java", "C", "PL/SQL", "OpenSSL", "ISO 8583", "OLTP", "Grafana", "Bitbucket"],
        highlights: [
          "Built a certificate management system using Java & OpenSSL for encoding/decoding certificates and encrypting/decrypting payloads, removing manual intervention.",
          "Developed PL/SQL-based transaction validation with regex checks for high-throughput OLTP systems handling thousands of daily transactions.",
          "Created a standalone Java Swing tool to parse ISO 8583 hex dumps, enabling independent debugging without external tools.",
          "Implemented credit and cash limit logic for Secondary RuPay cards using program-level constraints and defined formulas.",
        ],
      },
    ],
  
    projects: [
      {
        name: "QuickSync",
        slug: "01",
        tagline: "Real-Time Chat Application",
        desc: "Full-stack chat app with JWT authentication, real-time messaging via WebSocket (Socket.IO), and group chat support with admin controls.",
        tech: ["ReactJS", "ExpressJS", "MongoDB", "Socket.IO", "Cloudinary", "JWT"],
        github: "https://github.com/Abhi7102004",
        metric: "<100ms latency",
        color: "#0D9488",
      },
      {
        name: "GetHiredEasy",
        slug: "02",
        tagline: "AI-Powered Job Portal",
        desc: "Full-stack job portal with role-based access, AI resume analyzer using Gemini API, and dashboards for managing jobs and applicants.",
        tech: ["React", "Redux Toolkit", "Gemini API", "Express", "MongoDB", "Docker", "NodeMailer"],
        github: "https://github.com/Abhi7102004",
        metric: "30–40% better match",
        color: "#7C3AED",
      },
      {
        name: "Netflix-GPT",
        slug: "03",
        tagline: "AI-Powered Streaming Platform",
        desc: "Netflix clone enhanced with GPT-powered movie recommendations. Features Firebase auth, TMDB integration, multi-language support, and an AI search interface.",
        tech: ["React", "Redux", "OpenAI API", "Firebase", "TMDB API", "TailwindCSS"],
        github: "https://github.com/Abhi7102004/Netflix-GPT",
        metric: "GPT recommendations",
        color: "#E50914",
      },
    ],
  
    skills: [
      { cat: "Languages",            items: ["C/C++", "Java", "JavaScript", "TypeScript", "Python", "HTML", "CSS"] },
      { cat: "Frontend",             items: ["ReactJS", "Next.js", "TailwindCSS", "Redux Toolkit", "Framer Motion"] },
      { cat: "Backend",              items: ["Node.js", "Express.js", "FastAPI", "WebSocket", "REST APIs"] },
      { cat: "Databases",            items: ["MongoDB", "SQL", "PL/SQL", "Redis"] },
      { cat: "DevOps & Tools",       items: ["Docker", "Git", "GitHub", "Grafana", "Bitbucket", "Postman"] },
      { cat: "Security & Protocols", items: ["OpenSSL", "ISO 8583", "OAuth 2.0", "Cloudinary"] },
      { cat: "Core CS",              items: ["DSA", "System Design", "DBMS", "OS", "Computer Networks"] },
    ],
  
    stats: [
      { val: "800+",  label: "DSA Problems",     sub: "across platforms" },
      { val: "1495",  label: "Codeforces Peak",  sub: "Specialist · Top 20%" },
      { val: "1916",  label: "CodeChef Peak",    sub: "4★ · Global Rank 83" },
      { val: "1871",  label: "LeetCode Peak",    sub: "Knight · Top 10%" },
    ],
  }