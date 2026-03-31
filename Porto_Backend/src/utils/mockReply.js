// utils/mockReply.js
export const getMockReply = (input) => {
  const q = input.toLowerCase();
if (q.includes("skill") || q.includes("tech")) {
    return "I’m a **Full-Stack Developer**. I work with JavaScript, TypeScript, and Node.js, Express.js building scalable web apps with PostgreSQL and MongoDB. I also have hands-on experience with **AWS**, Docker, CI/CD, REST APIs, and performance optimization.";
  }

  if (q.includes("experience") || q.includes("work")) {
    return "I have over 2+ years of experience as a **Full-Stack Developer**, mainly working with the Backend stack and Next.js. I’ve built scalable web applications, admin dashboards, and CRM systems and Travel related websites. I’ve also improved performance, implemented secure authentication, and worked on real-world production deployments and APIs.";
  }

  if (q.includes("project")) {
    return "I’ve built multiple real-world projects, including a **SaaS platform**, **Airline booking systems** with payment integration, and a **CRM System** from scratch. I also developed an **AI-powered portfolio** with chatbot features, focusing on scalable architecture, secure authentication, and production-ready deployments.";
  }

  if (q.includes("contact") || q.includes("hire")) {
    return "You can contact me via Phone Call **+91-6396371902** or you can reach out through my email at **parnbartwal@gmail.com**. I am open to freelance and full-time opportunities.";
  }

  if (q.includes("who are you") || q.includes("yourself")) {
    return `I’m a **Full-Stack Developer** working in a travel-based company, handling **frontend**, **backend**, and **deployments**. I build scalable applications, manage servers, and implement CI/CD pipelines. I also work on automation and **AI-based solutions** to improve efficiency and streamline business processes.`;

  }

  return null;
};