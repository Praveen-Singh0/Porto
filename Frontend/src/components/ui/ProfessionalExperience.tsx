"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaServer, FaCode, FaCheckCircle, FaChevronDown } from "react-icons/fa";

const iconMap = {
  FaServer: FaServer,
  FaCode: FaCode,
};

interface Experience {
  id: string;
  icon: string;
  color: string;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

interface ProfessionalExperienceProps {
  experiences: Experience[];
}

const ProfessionalExperience = ({ experiences }: ProfessionalExperienceProps) => {
  const [openResponsibilities, setOpenResponsibilities] = useState({});

  const toggleResponsibilities = (expId: string) => {
    setOpenResponsibilities((prev) => ({
      ...prev,
      [expId]: !prev[expId],
    }));
  };

  return (
    <motion.div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-3xl p-8 mb-8">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Professional <span className="text-pink-500">Experience</span>
      </h3>

      <div className="space-y-8">
        {experiences.map((exp) => {
          const IconComponent = iconMap[exp.icon];
          const isOpen = openResponsibilities[exp.id];

          return (
            <motion.div
              key={exp.id}
              className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg"
                    style={{ backgroundColor: exp.color }}
                  >
                    {IconComponent && <IconComponent />}
                  </div>

                  {/* Title and Company */}
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                      {exp.title}
                    </h4>
                    <p
                      className="text-base md:text-lg font-semibold"
                      style={{ color: exp.color }}
                    >
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {exp.location}
                    </p>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="flex flex-col items-start md:items-end gap-2">
                  <span className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-semibold border border-pink-200">
                    {exp.period}
                  </span>
                  <span className="text-xs text-gray-500">{exp.duration}</span>
                </div>
              </div>

              {/* Responsibilities - Collapsible on Mobile */}
              <div className="mb-6">
                {/* Mobile: Collapsible Header */}
                <button
                  onClick={() => toggleResponsibilities(exp.id)}
                  className="md:pointer-events-none w-full flex items-center justify-between text-left mb-3"
                >
                  <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Key Responsibilities
                  </h5>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden"
                  >
                    <FaChevronDown className="text-pink-500" />
                  </motion.div>
                </button>

                {/* Desktop: Always visible */}
                <div className="hidden md:block">
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600 text-sm md:text-base"
                      >
                        <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" />
                        <span className="leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile: Collapsible content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="md:hidden overflow-hidden"
                    >
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-600 text-sm"
                          >
                            <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technologies */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs md:text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: `${exp.color}15`,
                        borderColor: `${exp.color}40`,
                        color: exp.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative corner element */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                style={{ backgroundColor: exp.color }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProfessionalExperience;
