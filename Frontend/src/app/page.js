import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/about";
import Project from "./pages/projects";
import { AiOutlineClose, AiFillLinkedin, AiFillGithub, AiOutlineJavaScript } from 'react-icons/ai';
import Image from "next/image";
import AnimatedText from "./components/animatedText";
import GradientBackground from "./utils/gradientBackground";



export default function Home() {


  return (
    <>
      <GradientBackground />
      <Header />
      <div className="pt-10 lg:px-6">
        <div>
          <div className="relative isolate px-4 sm:px-5 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mx-auto max-w-7xl ">
              <div className="">
                <div className=" sm:flex sm:justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Connect me on LinkedIn. <a target="_blank" href="https://www.linkedin.com/in/praveen-singh-ba5656172/" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </div>
                </div>

                <div className="py-6 text-center ">
                  <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Praveen Singh </h1>



                  <div style={{ display: "flex", justifyContent: "center" }} className="mt-2">
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl fontX-large">Experience In </h1>
                    <div class="content__container">
                      <ul class="content__container__list">
                        <li class="content__container__list__item text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Fronend</li>
                        <li class="content__container__list__item text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Backend</li>
                        <li class="content__container__list__item text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">MERN Stack</li>
                        <li class="content__container__list__item text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">FullStack</li>
                      </ul>

                    </div>

                  </div>




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
                    <Image
                      src="/assets/img/Profile.JPG"
                      alt="Avatar"
                      width={500}
                      height={300}
                      priority
                      className="rounded-full avatar"
                    />

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
                      <button className="social-button social-button2"> <a target="_blank" href="https://x.com/prvnBrTwal">
                        <AiOutlineClose />
                      </a></button>
                      <button className="social-button social-button3"> <a target="_blank" href="https://www.linkedin.com/in/praveen-singh-ba5656172/">
                        <AiFillLinkedin className="text-sky-600" />
                      </a></button>
                      <button className="social-button social-button3"><a target="_blank" href="https://github.com/Praveen-Singh0">
                        <AiFillGithub />
                      </a></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>







        {/* aboutSection */}
        <div className="mt-16 mx-auto px-4 py-12 max-w-7xl">
          <h1 className="text-center text-3xl font-bold mb-6">
            About <span className="text-red-500">Section</span>
          </h1>
          <div className="relative w-full h-80 sm:h-96 md:h-[450px]">
            <Image
              src="/assets/img/aboutSection.jpg"
              alt="A descriptive text"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-80 rounded-lg"></div>
            <div className="absolute inset-0 flex flex-col justify-end mb-12 items-center text-black text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Praveen Singh (Developer)</h2>
              <p className="text-gray-700 mt-2 max-w-lg">
                Front-End Developer with hands-on experience in building responsive, user-friendly web applications using modern technologies like React, Ant Design, and Tailwind CSS.
              </p>
            </div>
          </div>



          <div className="relative mt-[-20px] mx-auto w-full max-w-6xl  p-6 sm:p-8">

            {/* polygon */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="absolute blur-3xl  inset-x-0 bottom-0 -z-10 hidden sm:block">
              <div
                className="sm:aspect-[1155/578] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[59.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}></div>
            </div>


            <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-r border-gray-400">
                <h3 className="font-medium text-gray-900">Full Name</h3>
                <p className="text-gray-700">Praveen Singh</p>
              </div>
              <div className="border-r border-gray-400">
                <h3 className="font-medium text-gray-900">Specialization</h3>
                <p className="text-gray-700">Front-End Developer</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-700">parnbartwal@gmail.com</p>
              </div>
            </div>

            <hr />

            <div className="text-center mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-r border-gray-400">
                <h3 className="font-medium text-gray-900">Education</h3>
                <p className="text-gray-700">Post-Graduate</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Salary Expectation</h3>
                <p className="text-gray-700">$_As_much_i_deserve</p>
              </div>
            </div>

            <hr />

            <div className="text-center mt-6">
              <h3 className="font-medium text-gray-900">About Past Experience</h3>
              <p className="text-gray-700 mt-2">
                <strong>Hey, I am Praveen, and</strong> with 6 months of professional experience as a Junior Software Developer, I have successfully contributed to multiple projects, including a Student Information System (SIS).
              </p>

            </div>
            <div className="mt-6">
              <h3 className="font-medium text-gray-900">Attachments</h3>
              <ul className="mt-2 divide-y divide-gray-300 border border-gray-200 rounded-md">
                <li className="flex justify-between items-center p-4 text-sm">
                  <span className="truncate font-medium">resume_full_stack_developer.pdf</span>
                  <a href="/Resume.pdf" target="_blank" className="text-indigo-600 hover:text-indigo-500">View</a>
                </li>
                <li className="flex justify-between items-center p-4 text-sm">
                  <span className="truncate font-medium">coverletter_full_stack_developer.pdf</span>
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">Download</a>
                </li>
              </ul>
            </div>




          </div>

        </div>

      </div>
    </>
  );
}
