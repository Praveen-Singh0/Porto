"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TiltedCard from "../components/TiltedCard";
import { majorProjectService, MajorProject } from '@/services/projectService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function MajorProjects() {
  // ✅ State for API data
  const [projects, setProjects] = useState<MajorProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch projects from API
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await majorProjectService.getAll();
      setProjects(data);
    } catch (error: any) {
      console.error("Error loading major projects:", error);
      setError(error.message || "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="major-projects-section">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 blur-3xl">
        <div
          aria-hidden
          className="w-[60rem] sm:w-[90rem] aspect-[1200/700] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] blur-[140px]"
          style={{
            clipPath:
              "polygon(5% 20%,25% 5%,50% 0%,75% 8%,95% 25%,100% 50%,92% 75%,75% 95%,50% 100%,25% 92%,8% 75%,0% 50%)",
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h1 className="mt-12 text-center font-bold mb-8 relative text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Major <span className="text-pink-500">Projects</span>
        </h1>
        <p className="section-subtitle text-gray-700 dark:text-gray-100">
          Showcasing my best work in development and design
        </p>
        <div className="title-underline" />
      </motion.div>

      {/* ✅ Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500"></div>
        </div>
      )}

      {/* ✅ Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={loadProjects}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* ✅ Projects Grid */}
      {!isLoading && !error && (
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <TiltedCard
                imageSrc={project.image}
                altText={project.title}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl || ''}
                containerHeight="350px"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ✅ Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No major projects found</p>
        </div>
      )}
    </section>
  );
}
