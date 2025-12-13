"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import EducationInfo from "../../../public/assets/data/EducationInfo.json";

const { educationCards } = EducationInfo;

const imageMapping: Record<string, string> = {
  ShreeDev: "/assets/img/shreeDevS.png",
  Tulas: "/assets/img/Tulas.jpg",
};

const EducationSection = () => {
  const tulasCard =
    educationCards.find(
      (card) =>
        card.course.includes("MCA") || card.collageName.includes("Tulas")
    ) || educationCards[0];

  const [selectedCard, setSelectedCard] = useState(tulasCard);

  return (
    <div className="mt-16 mx-auto px-4 m-4 max-w-7xl relative">
      {/* Pink background decorations */}
      <div className="absolute top-32 left-16 -z-10 opacity-10">
        <div className="w-60 h-60 rounded-full bg-pink-400 blur-3xl"></div>
      </div>
      <div className="absolute right-16 -z-10 opacity-10">
        <div className="w-56 h-56 rounded-full bg-pink-600 blur-3xl"></div>
      </div>

      {/* Section title */}
      <motion.h1
        className="text-center font-bold mb-10 relative text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education <span className="text-pink-500">Journey</span>
        <div className="absolute w-16 h-0.5 md:h-1 bg-pink-500 left-1/2 -translate-x-1/2 bottom-[-10px]"></div>
      </motion.h1>

      {/* Tab Selection */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10">
        {educationCards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`relative px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              selectedCard.id === card.id
                ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-pink-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            {selectedCard.id === card.id && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 opacity-20"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{card.collageName}</span>
              {selectedCard.id === card.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[11px]"
                >
                  ✓
                </motion.span>
              )}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected Card Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCard.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-pink-50 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row">
              {/* Left side with image */}
              <motion.div
                className="lg:w-2/5 relative"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="h-56 md:h-64 lg:h-full relative overflow-hidden">
                  <Image
                    src={imageMapping[selectedCard.collageImage]}
                    alt={selectedCard.collageName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 md:p-5 text-white">
                      <h3 className="text-lg md:text-xl font-semibold mb-1">
                        {selectedCard.collageName}
                      </h3>
                      <p className="text-pink-200 text-xs md:text-sm flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {selectedCard.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side with content */}
              <motion.div
                className="lg:w-3/5 p-6 md:p-8 lg:p-9"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-5">
                    <span className="px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-[11px] md:text-xs font-semibold rounded-full mb-2 inline-block">
                      {selectedCard.duration}
                    </span>
                    <h2 className="text-2xl md:text-2.5xl font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                      {selectedCard.course}
                    </h2>
                    <div className="w-14 h-0.5 md:h-1 bg-pink-500 rounded-full"></div>
                  </div>

                  {/* Subjects grid */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-gray-600 dark:text-gray-400 font-semibold mb-3 flex items-center gap-1.5 text-sm md:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-pink-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Key Subjects
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
                      {selectedCard.Subjects.map((subject, index) => (
                        <motion.div
                          key={subject.id}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: index * 0.04 }}
                          className="bg-gradient-to-br from-pink-50 dark:from-gray-700 to-white dark:to-gray-800 border border-pink-100 dark:border-gray-600 rounded-lg md:rounded-xl p-2.5 md:p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                            {subject.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="mt-auto">
                    <a
                      href={selectedCard.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 p-0.5 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      <span className="relative flex items-center space-x-2 rounded-full bg-white dark:bg-gray-800 px-6 py-2.5 text-gray-800 dark:text-gray-200 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white font-semibold">
                        <span>Visit Official Website</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EducationSection;
