// data/dummyData.js

export const dummyUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
  isActive: true,
  lastLoginAt: new Date("2026-01-02T15:30:00"),
  createdAt: new Date("2025-01-01T10:00:00"),
  updatedAt: new Date("2026-01-02T15:30:00")
};

export const dummyPortfolioInfo = {
  id: 1,
  email: "contact@johndoe.dev",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra, India",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  },
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2026-01-02")
};

export const dummyHeroSection = {
  id: 1,
  bio: "Full-stack developer passionate about creating beautiful and performant web applications. Specialized in React, Node.js, and cloud technologies.",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2026-01-02")
};

export const dummyAboutSection = {
  id: 1,
  bio: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with modern technologies and solving complex problems.",
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  specialization: "Full-Stack Development & Cloud Architecture",
  education: "B.Tech in Computer Science Engineering",
  documents: {
    resume: "/documents/resume.pdf",
    certificates: ["/documents/cert1.pdf", "/documents/cert2.pdf"]
  },
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2026-01-02")
};

export const dummyExperiences = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Pvt Ltd",
    location: "Bangalore, India",
    duration: "2 years",
    period: "Jan 2024 - Present",
    type: "Full-time",
    responsibilities: [
      "Led development of microservices architecture",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines using GitHub Actions"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    color: "#3b82f6",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Solutions Inc",
    location: "Mumbai, India",
    duration: "2 years",
    period: "Mar 2022 - Dec 2023",
    type: "Full-time",
    responsibilities: [
      "Built responsive web applications using React and TypeScript",
      "Collaborated with UX designers to implement pixel-perfect designs",
      "Optimized application performance achieving 95+ Lighthouse scores"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    color: "#10b981",
    createdAt: new Date("2022-03-10"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartupHub",
    location: "Delhi, India",
    duration: "1 year",
    period: "Jan 2021 - Feb 2022",
    type: "Full-time",
    responsibilities: [
      "Developed and maintained client websites",
      "Fixed bugs and implemented new features",
      "Worked with REST APIs and third-party integrations"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Bootstrap", "jQuery"],
    color: "#f59e0b",
    createdAt: new Date("2021-01-05"),
    updatedAt: new Date("2022-02-28")
  }
];

export const dummyEducation = [
  {
    id: 1,
    link: "https://university.edu",
    collageImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
    collageName: "Indian Institute of Technology, Delhi",
    course: "B.Tech in Computer Science Engineering",
    duration: "2017 - 2021",
    subjects: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering"
    ],
    createdAt: new Date("2017-08-01"),
    updatedAt: new Date("2021-06-30")
  },
  {
    id: 2,
    link: "https://school.edu",
    collageImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
    collageName: "Delhi Public School",
    course: "Higher Secondary (12th Grade)",
    duration: "2015 - 2017",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English"
    ],
    createdAt: new Date("2015-04-01"),
    updatedAt: new Date("2017-03-31")
  }
];

export const dummySkills = [
  {
    id: 1,
    name: "React",
    proficiency: 95,
    category: "FRONTEND",
    icon: "⚛️",
    color: "#61dafb",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 2,
    name: "Next.js",
    proficiency: 90,
    category: "FRONTEND",
    icon: "▲",
    color: "#000000",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 3,
    name: "TypeScript",
    proficiency: 88,
    category: "FRONTEND",
    icon: "🔷",
    color: "#3178c6",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 4,
    name: "Node.js",
    proficiency: 92,
    category: "BACKEND",
    icon: "🟢",
    color: "#339933",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 5,
    name: "Express",
    proficiency: 90,
    category: "BACKEND",
    icon: "🚂",
    color: "#000000",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 6,
    name: "PostgreSQL",
    proficiency: 85,
    category: "DATABASE",
    icon: "🐘",
    color: "#336791",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 7,
    name: "MongoDB",
    proficiency: 87,
    category: "DATABASE",
    icon: "🍃",
    color: "#47a248",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 8,
    name: "Docker",
    proficiency: 80,
    category: "DEVOPS",
    icon: "🐳",
    color: "#2496ed",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 9,
    name: "AWS",
    proficiency: 75,
    category: "DEVOPS",
    icon: "☁️",
    color: "#ff9900",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  },
  {
    id: 10,
    name: "Git",
    proficiency: 93,
    category: "OTHERS",
    icon: "📦",
    color: "#f05032",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2026-01-02")
  }
];
