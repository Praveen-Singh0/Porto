"use client";
import { FaCode } from "react-icons/fa";
import { ScrollStackContainer } from "../../utils/ScrollStack";
import {
  experienceInfo,
} from "@/services/experience.service";


const ExperienceSection = ({ data }: { data: experienceInfo[] } ) => {

 const experiences = data;

  return (
    <div className="mt-16 mx-auto max-w-7xl relative">
      <div className="pointer-events-none blur-2xl absolute inset-x-0 top-24 -z-10 flex justify-center opacity-40">
        <div
          className="w-[32rem] sm:w-[64rem] aspect-[1155/678] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] blur-3xl"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          aria-hidden
        />
      </div>

      {/* Section Title */}
      <h1 className="text-center font-bold  relative text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 ">
        Work <span className="text-pink-500">Experience</span>
        <div className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2"></div>
      </h1>

      {/* Scroll Stack Container */}
      <ScrollStackContainer className="mt-10">
    {experiences && experiences.length > 0 &&
        experiences?.map((exp: experienceInfo, index: number) => {
          const Icon = FaCode;

          return (
            <div key={exp.id} className="mb-8">
              <div className=" bg-white dark:bg-gray-800 rounded-bl-3xl rounded-tr-3xl overflow-hidden shadow-xl border border-pink-50 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col">
                  {/* Header Section */}
                  <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg">
                        <Icon className="text-white text-2xl" />
                      </div>

                      {/* Title & Company Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                              {exp.title}
                            </h2>
                            <h3
                              className="text-xl md:text-2xl font-semibold mb-3"
                              style={{ color: exp.color }}
                            >
                              {exp.company}
                            </h3>
                          </div>
                          {/* Card Number Badge */}
                          <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            📍 {exp.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            📅 {exp.duration}
                          </span>
                          <span>•</span>
                          <span className="px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full font-medium">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-1 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h4
                          className="font-bold text-gray-800 dark:text-gray-200 mb-4"
                          style={{ fontSize: "1.4rem" }}
                        >
                          Key Responsibilities
                        </h4>

                        <ul className="space-y-3">
                          {exp.responsibilities.map(
                            (resp: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                              >
                                <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">
                                  •
                                </span>
                                <span className="flex-1 leading-relaxed text-md">
                                  {resp}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className=" text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-2 bg-gradient-to-br from-pink-50 dark:from-gray-700 to-white dark:to-gray-800 border border-pink-100 dark:border-gray-600 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-pink-600 dark:text-pink-400 text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {experiences && experiences.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No experience fetched.
          </div>
        ) : null}
      </ScrollStackContainer>
    </div>
  );
};

export default ExperienceSection;
