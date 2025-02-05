"use client"
import { AiFillLinkedin, AiFillGithub, AiFillTwitterCircle, AiFillInstagram, AiOutlineGlobal } from "react-icons/ai";
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const form = useRef();

  const seccessMessage = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }


  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true)

    emailjs.sendForm(
      'service_oboepa1',
      'template_n4py97d',
      form.current,
      'z3yHvHl0u4wruKCT2'
    )
      .then(
        () => {
          setLoading(false)
          setShow(true)
          seccessMessage()
          e.target.reset();
        },
        () => {
          setLoading(false)
        }
      );
  };

  return (

    <>
      <div className="sm:pl-12 pl-4 relative">
        <h1 className="text-center text-3xl mt-12 font-bold">
          Lets Talk about my <span className="text-red-500">projects</span>
        </h1>

        <div className="flex flex-col lg:flex-row items-center sm:p-10 rounded-lg  ">

          {/* polygon */}
          <div className="absolute blur-3xl inset-x-0 bottom-0 flex justify-center">
            <div
              className="w-[36.125rem]  sm:aspect-[1155/678] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[62.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}></div>
          </div>

          {/* Left Section - Form */}
          <div className="relative rounded-xl shadow-xl py-4 px-4 sm:px-12 mr-2 sm:w-1/2 w-full">
            <form ref={form} onSubmit={sendEmail} className="mx-auto">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">First name</label>
                  <div className="mt-2.5">
                    <input type="text" name="first_name" id="first-name" placeholder="First name" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">Last name</label>
                  <div className="mt-2.5">
                    <input type="text" name="last_name" id="last-name" placeholder="Last name" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" required />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900">Company</label>
                  <div className="mt-2.5">
                    <input type="text" name="company" id="company" placeholder="Company" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900">Email</label>
                  <div className="mt-2.5">
                    <input type="email" name="email" id="email" placeholder="Email" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" required />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">Phone number</label>
                  <div className="mt-2.5">
                    <input type="tel" name="phone" id="phone-number" placeholder="Phone number" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" pattern="[0-9]*" inputMode="numeric" maxLength={10} required />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
                  <div className="mt-2.5">
                    <textarea name="message" id="message" rows="4" placeholder="Message" className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm" required></textarea>
                  </div>
                </div>
              </div>
              <div className="py-4">

                {show && (
                  <div className=" bg-green-100 border border-green-400 text-green-700 py-2 px-4 text-center mb-2 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your form submitted successfully.</span>
                  </div>
                )}


                <button type="submit" className="block w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600">

                  {loading ? (
                    <svg
                      className="inline animate-spin h-6 w-10 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>

                  ) : (

                    `Let's talk`

                  )}



                </button>
              </div>
            </form>
          </div>


          {/* Right Section - Testimonial */}
          <div className="relative  w-full lg:w-1/3 mt-4 sm:ml-20 lg:mt-0">
            <div className="flex items-start space-x-2">
              <AiOutlineGlobal className="text-2xl text-indigo-600" />
              <div>
                <h3 className="text-2xl pt-1 font-semibold text-indigo-600">Connect On Social-Sites</h3>
                <p className="text-gray-700 mt-4">
                Feel free to connect with me on social media. I’m not very active there, but I’ll do my best to respond!
                </p>
                <div className="mt-6 flex items-center">
                  <img
                    src="/assets/img/avatar.jpg"
                    alt="CEO"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Praveen Singh</p>
                    <p className="text-sm text-gray-500">Full-Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              {/* Card 1 */}
              <div className="bg-gradient-to-r from-pink-100 to-indigo-100 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">

                <h1 className="text-xl font-bold text-indigo-700 "><AiFillLinkedin className="inline" /> LinkedIn</h1>
                <p className="text-gray-600 text-sm ">@PraveenSingh</p>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/praveen-singh-ba5656172/"
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                >
                  View Profile →
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-l from-blue-100 to-red-50 px-4 py-2  rounded-xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1 className="text-xl font-bold text-gray-900 "><AiFillGithub className="inline" /> Github</h1>
                <p className="text-gray-600 text-sm ">@Praveen-Singh0</p>
                <a
                  target="_blank"
                  href="https://github.com/Praveen-Singh0"
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                >
                  View Profile →
                </a>
              </div>
              <div className="bg-gradient-to-l from-gray-50 to-purple-100 px-4 py-2  rounded-xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1 className="text-xl font-bold text-gray-700 "><AiFillTwitterCircle className="inline" />  X</h1>
                <p className="text-gray-600 text-sm ">@prvnBrTwal</p>
                <a
                  target="_blank"
                  href="https://x.com/prvnBrTwal"
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                >
                  View Profile →
                </a>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-200 px-4 py-2  rounded-xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h1 className="text-xl font-bold text-pink-700 "><AiFillInstagram className="inline " /> Instagram</h1>
                <p className="text-gray-600 text-sm ">@P_R_V_€_€_N</p>
                <a
                  target="_blank"
                  href="https://www.instagram.com/praveen_brtwl/"
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                >
                  View Profile →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>



  );
};

export default ContactSection;
