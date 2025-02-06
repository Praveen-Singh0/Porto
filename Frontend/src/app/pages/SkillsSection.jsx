"use client"
import { AiFillHtml5, AiFillGithub, AiOutlineJavaScript, AiFillApi, AiFillAndroid, AiOutlineAntDesign } from "react-icons/ai";
import { BiLogoTailwindCss, BiLogoNodejs } from "react-icons/bi";
import { BsFiletypeCss, BsBootstrap } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import ExperienceSection from "./Experience";

import { skillsServices } from "../services/skills.services";

const SkillsSection = () => {

  const { skills, loading, error, deleteSkill, } = skillsServices();

  return (
    <>
      <div className="mt-20 mb-10 hidden  sm:block flex justify-between mx-48 pl-20">
        <h1 className="text-center text-3xl font-bold">
          Skills & Experience <span className="text-red-500">Section</span>
        </h1>
      </div>

      <div className="my-12 sm:flex px-6 relative  ">

        <h1 className="mb-4 sm:hidden text-center text-3xl font-bold">
          Skill <span className="text-red-500">Section</span>
        </h1>


        <div className="absolute z-0 blur-3xl inset-x-0 bottom-0 flex justify-center">
          <div
            className="w-[36.125rem] sm:aspect-[1155/678] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[62.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}></div>
        </div>

        <div className="relative mx-auto grid px-8">
          <ul role="list" className="mb-8 divide-y divide-y-reverse divide-red-800 grid gap-x-8 sm:grid-cols-4 w-full  xl:col-span-4">
            {skills.length > 0 ? (
              skills?.map((skill) => (
                <li key={skill._id}>
                  <div className="sm:pt-6 sm:mb-4 flex items-center gap-x-6 ">
                    <FaReact className="mt-3 text-4xl   border-gray-900" />  {/* uploaded icon url */}
                    <div>
                      <h3 className=" mt-4 text-xl font-semibold tracking-tight text-gray-900">{skill.name}</h3>
                      <p className=" text-sm/6 text-amber-500 font-semibold font text-xl">★★★★☆</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>no skills</li>
            )}

          </ul>

          <ExperienceSection />


        </div>







      </div>
    </>



  );
};


export default SkillsSection;