"use client";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { FaServer, FaCode, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import LogoLoop from "@/components/ui/LogoLoop";
import ExperienceInfo from '../../../public/assets/data/ExperienceInfo.json';
import aboutMeBio from '../../../public/assets/data/aboutMeBio.json'

const { experiences } = ExperienceInfo;

const iconMap = {
  FaServer: FaServer,
  FaCode: FaCode,
};

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];



const About = () => {
  // State to track which responsibilities sections are open (mobile only)
  const [myBio, setMyBio] = useState('')

  useEffect(()=>{
    setMyBio(aboutMeBio.bio)
  }, [])

  
  return (
    <motion.div
      className="mt-16 mx-auto px-4 py-16 max-w-7xl relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Title */}
      <motion.h1
        className="text-center font-bold mb-8 relative
        text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 px-4
        "
      >
        About <span className="text-pink-500">Me</span>
        <div className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2 bottom-[-12px]"></div>
      </motion.h1>

      {/* Main card */}
      <motion.div
        className="relative rounded-3xl backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-pink-100 dark:border-gray-700 shadow-xl p-8 mb-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <motion.div
            transition={{ duration: 0.6 }}
            className="relative sm:w-64 w-full h-64 rounded-xl overflow-hidden border-4 border-transparent bg-gradient-to-br from-pink-400 to-pink-600 p-1"
          >
            <Image
              src="/assets/img/aboutSection.webp"
              alt="Praveen Singh"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div className="flex-1">
            <motion.h2  className="text-3xl font-bold mb-3">
              <span className="text-pink-500">Praveen Singh</span>
              <span className="text-gray-700 dark:text-gray-100"> / FullStack</span>
            </motion.h2>

            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed"
            >
             {myBio}
            </motion.p>

            {/* Skills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
            >
              {[
                "React",
                "Node.js",
                "MongoDB",
                "Express",
                "Next.js",
                "Tailwind CSS",
                "API Integration",
                "Payment Gateways",
              ].map((skill) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-pink-50 text-pink-600 border border-pink-200 rounded-full text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Button */}
            <motion.a
              href="mailto:parnbartwal@gmail.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-pink-200 transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Logo Loop */}
        <motion.div
          className="mt-12"
          
          transition={{ delay: 0.5 }}
        >
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={30}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
          />
        </motion.div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16"
      >
        {[
          { title: "Full Name", value: "Praveen Singh" },
          { title: "Specialization", value: "Full-Stack Developer" },
          { title: "Email", value: "parnbartwal@gmail.com" },
          { title: "Education", value: "Post-Graduate" },
        ].map((item) => (
          <motion.div
            key={item.title}
            
            className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-pink-500 dark:text-pink-400 font-medium mb-2">{item.title}</h3>
            <p className="text-gray-800 dark:text-gray-200 font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Documents */}
      <motion.div
        
        className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-3xl p-8 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Documents</h3>

        {[
          {
            file: "resume_full_stack_developer.pdf",
            link: "/Resume.pdf",
          },
        ].map((doc) => (
          <motion.div
            
            key={doc.file}
            className="flex items-center justify-between p-4 border border-pink-100 rounded-lg  transition-colors mb-4"
          >
            <span className="font-medium text-gray-700 dark:text-gray-100 truncate">
              {doc.file}
            </span>
            <a
              href={doc.link}
              target="_blank"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              View
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
