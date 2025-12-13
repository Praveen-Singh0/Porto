"use client";

import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import {
  AiOutlineClose,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineJavaScript,
} from "react-icons/ai";
import Image from "next/legacy/image";
import { motion } from "framer-motion";

import heroBio from '../../../public/assets/data/bio.json'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const TopPage = () => {

  const [bioContent, setBioContent] = useState('');

  useEffect(() => {
  setBioContent(heroBio.bio)
}, []);


  return (
    <>
    <Header/>
    <div className="mt-12 p-0 md:p-12">
      <div className="relative isolate px-4 sm:px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mx-auto max-w-7xl">
          {/* LEFT CONTENT */}
          <div>

            {/* 1️⃣ FIRST DIV */}
            <motion.div {...fadeUp(0.1)} className="sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Connect me on LinkedIn.{" "}
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/praveen-singh-ba5656172/"
                  className="font-semibold text-indigo-600"
                >
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </motion.div>

            <div className="py-6 text-center ">

              {/* 2️⃣ H1 NAME */}
              <motion.h1
                {...fadeUp(0.25)}
                className="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
              >
                Praveen Singh
              </motion.h1>

              <motion.div
                {...fadeUp(0.4)}
                className="mt-2 md:ml-12 block md:flex -centjustifyer"
              >
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl fontX-large">
                  Experience In{" "}
                </h1>

                <div className="content__container mt-2 md:mt-0 ">
                  <ul className="content__container__list text-center md:text-start">
                    <li className="content__container__list__item text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-6xl">
                      Frontend
                    </li>
                    <li className="content__container__list__item text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-6xl">
                      Backend
                    </li>
                    <li className="content__container__list__item text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-6xl">
                      MERN-Stack
                    </li>
                    <li className="content__container__list__item text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-6xl">
                      FullStack
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* 4️⃣ PARAGRAPH */}
              <motion.p
                {...fadeUp(0.55)}
                className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-100 sm:text-xl/8"
              >
                 {bioContent}
              </motion.p>

              {/* 5️⃣ BUTTONS */}
              <motion.div
                {...fadeUp(0.5)}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <a
                  target="_blank"
                  href="mailto:parnbartwal@gmail.com"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Hire Me
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* 6️⃣ IMAGE SECTION (LAST TO APPEAR) */}
          <motion.div
            {...fadeUp(0.3)}
            className=" w-6/12 max-lg:hidden"
          >
            <div className="imgCard">
              <div className="img_logo">
                <Image
                  src="/assets/img/Profile.JPG"
                  alt="Avatar"
                  width={500}
                  height={500}
                  priority
                  className="rounded-full"
                />

                <span className="circle circle2"></span>
                <span className="circle circle3"></span>
                <span className="circle circle4"></span>

                <span
                  className="circle circle5"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AiOutlineJavaScript />
                </span>
              </div>

              <div className="img_content">
                <span className="title">Connect with me</span>
                <span className="text">
                  Make, share, and use beautiful relationship <br />
                  with Programming
                </span>
              </div>

              <div className="bottom">
                <div className="social-buttons-container">
                  <button className="social-button social-button2">
                    <a target="_blank" href="https://x.com/prvnBrTwal">
                      <AiOutlineClose />
                    </a>
                  </button>
                  <button className="social-button social-button3">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/praveen-singh-ba5656172/"
                    >
                      <AiFillLinkedin className="text-sky-600" />
                    </a>
                  </button>
                  <button className="social-button social-button3">
                    <a
                      target="_blank"
                      href="https://github.com/Praveen-Singh0"
                    >
                      <AiFillGithub />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TopPage;
