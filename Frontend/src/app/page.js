import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/about";
import Project from "./pages/projects";
import { AiOutlineClose, AiFillLinkedin, AiFillGithub, AiOutlineJavaScript } from 'react-icons/ai';


import GradientBackground from "./utils/gradientBackground";

export default function Home() {
  return (
    <>
      <GradientBackground />
      <Header />
      <div className="pt-10">
        <div>
          <div className="relative isolate px-4 sm:px-6 lg:px-8">
            {/* Gradient backgrounds */}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mx-auto max-w-7xl ">
              <div className="">
                <div className=" sm:flex sm:justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Connect me on LinkedIn. <a target="_blank" href="https://www.linkedin.com/in/praveen-singh-ba5656172/" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </div>
                </div>

                <div className="py-6 text-center ">
                  <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Praveen Singh <br /> MERN Stack Developer </h1>
                  <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Hi, my name is Praveen. I’m a front-end developer with hands-on experience in building responsive and user-friendly web applications using React, Ant Design, and Tailwind CSS. </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      target="_blank"
                      href="mailto:parnbartwal@gmail.com"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Hire Me
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
                  </div>
                </div>
              </div>


              <div className="img_parent w-6/12 max-lg:hidden ">
              <div className="imgCard">
                <div className="img_logo ">
                  <img src='/assets/img/Profile.JPG' alt="Avatar" className="rounded-full avatar" />
                  <span className="circle circle2"></span>
                  <span className="circle circle3"></span>
                  <span className="circle circle4"></span>
                  <span className="circle circle5">
                    <AiOutlineJavaScript />
                  </span>
                </div>
                <div className="img_content ">
                  <span className="title">Connect with me</span>
                  <span className="text">Make, share, and use beautiful relationship <br />with Programming</span>
                </div>

                <div className="bottom">
                  <div className="social-buttons-container">
                    <button className="social-button social-button2"> <a target="_blank"  href="https://x.com/prvnBrTwal">
                    <AiOutlineClose />
                    </a></button>
                    <button className="social-button social-button3"> <a target="_blank"  href="https://www.linkedin.com/in/praveen-singh-ba5656172/">
                    <AiFillLinkedin className="text-sky-600" />
                    </a></button>
                    <button className="social-button social-button3"><a  target="_blank" href="https://github.com/Praveen-Singh0">
                    <AiFillGithub />
                    </a></button>
                  </div>
                </div>
              </div>
            </div>





            </div>
          </div>
        </div>

      </div>
    </>
  );
}
