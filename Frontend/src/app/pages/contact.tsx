"use client";
import React, { JSX, useState } from "react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiOutlineGlobal,
} from "react-icons/ai";
// import emailjs from "@emailjs/browser";


const ContactSection = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const hideSuccess = () => {
    setTimeout(() => setShow(false), 2000);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formEl = e.currentTarget; // typed as HTMLFormElement

    try {
      // Replace with actual email sending logic
      
      await Promise.resolve();

      setLoading(false);
      setShow(true);
      hideSuccess();
      formEl.reset();
    } catch (err) {
      // You can enhance this with proper error UI
      console.error("Send email error:", err);
      setLoading(false);
    }
  };

  return (
    <section className="sm:pl-12 mt-12 pt-8 mb-4 px-4 pb-12 relative" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-center text-4xl font-bold mb-8 relative">
        Lets Talk about <span className="text-pink-500">myself</span>
        <span className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2" style={{ bottom: -12 }} />
      </h2>

      <div className="flex flex-col lg:flex-row justify-center items-center sm:p-10 rounded-lg max-w-7xl mx-auto">
        {/* decorative polygon */}
        <div className="absolute blur-3xl inset-x-0 bottom-0 flex justify-center pointer-events-none">
          <div
            className="w-[36.125rem] sm:aspect-[1155/678] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[62.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            aria-hidden
          />
        </div>

        {/* Left - Form */}
        <div className="relative rounded-xl shadow-xl py-4 px-4 sm:px-4 mr-2 sm:w-1/2 w-full bg-white/80">
          <form onSubmit={sendEmail} className="mx-auto" noValidate>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-semibold text-gray-900">
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Message"
                    className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm ring-1 ring-pink-300 placeholder:text-gray-400 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="py-4">
              {show && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-2 px-4 text-center mb-2 rounded relative"
                  role="status"
                  aria-live="polite"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> Your form submitted successfully.</span>
                </div>
              )}

              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600"
                aria-disabled={loading}
                disabled={loading}
              >
                {loading ? (
                  <svg className="inline animate-spin h-6 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Let's talk"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Social / Testimonial */}
        <aside className="relative w-full lg:w-1/3 mt-4 sm:ml-20 lg:mt-0">
          <div className="flex items-start space-x-2">
            <AiOutlineGlobal className="text-2xl text-indigo-600" aria-hidden />
            <div>
              <h3 className="text-2xl pt-1 font-semibold text-indigo-600">Connect On Social-Sites</h3>
              <p className="text-gray-700 mt-4">
                Feel free to connect with me on social media. I’m not very active there, but I’ll do my best to respond!
              </p>

              <div className="mt-6 flex items-center">
                <img src="/assets/img/avatar.jpg" alt="Praveen avatar" className="w-12 h-12 rounded-full" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Praveen Singh</p>
                  <p className="text-sm text-gray-500">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card title="LinkedIn" subtitle="@PraveenSingh" href="https://www.linkedin.com/in/praveen-singh-ba5656172/">
              <AiFillLinkedin className="inline" />
            </Card>

            <Card title="Github" subtitle="@Praveen-Singh0" href="https://github.com/Praveen-Singh0">
              <AiFillGithub className="inline" />
            </Card>

            <Card title="X" subtitle="@prvnBrTwal" href="https://x.com/prvnBrTwal">
              <AiFillTwitterCircle className="inline" />
            </Card>

            <Card title="Instagram" subtitle="@P_R_V_€_€_N" href="https://www.instagram.com/praveen_brtwl/">
              <AiFillInstagram className="inline" />
            </Card>
          </div>
        </aside>
      </div>
    </section>
  );
};

type CardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  children?: React.ReactNode;
};

const Card = ({ title, subtitle, href, children }: CardProps): JSX.Element => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-indigo-100 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h4 className="text-xl font-bold text-indigo-700">
        {children} {title}
      </h4>
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      {href && (
        <a target="_blank" rel="noopener noreferrer" href={href} className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200">
          View Profile →
        </a>
      )}
    </div>
  );
};

export default ContactSection;
