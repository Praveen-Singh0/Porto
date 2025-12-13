"use client";
import React, { JSX, useState } from "react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiOutlineGlobal,
} from "react-icons/ai";

type CardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  children?: React.ReactNode;
};

const SocialCard = ({ title, subtitle, href, children }: CardProps): JSX.Element => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="group bg-gradient-to-r from-pink-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 px-4 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-pink-100/70 dark:border-gray-700/70 cursor-pointer"
    >
      <h4 className="text-base md:text-lg font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
        <span className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
          {children}
        </span>
        <span>{title}</span>
      </h4>
      {subtitle && (
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
      <span className="mt-1 inline-flex items-center gap-1 text-xs md:text-sm text-indigo-600 dark:text-indigo-300 font-medium group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-200 transition-all duration-200">
        View Profile
        <span aria-hidden>↗</span>
      </span>
    </a>
  );
};

const ContactSection = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const hideSuccess = () => {
    setTimeout(() => setShow(false), 2200);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formEl = e.currentTarget;

    try {
      // TODO: plug in emailjs or backend endpoint here
      await Promise.resolve();

      setLoading(false);
      setShow(true);
      hideSuccess();
      formEl.reset();
    } catch (err) {
      console.error("Send email error:", err);
      setLoading(false);
    }
  };

  return (
    <section
      className="relative mt-16 mb-10 px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      {/* soft background glow */}
      <div className="pointer-events-none blur absolute inset-x-0 top-24 -z-10 flex justify-center opacity-40">
        <div
          className="w-[32rem] sm:w-[64rem] aspect-[1155/678] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] blur-3xl"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          aria-hidden
        />
      </div>

      {/* heading */}
      <header className="text-center mb-10">
        <h2
          id="contact-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 relative inline-block"
        >
          Let&apos;s talk about <span className="text-pink-500">myself</span>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-20 rounded-full bg-pink-500" />
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Have a project in mind, need a full-stack dev for a travel product, or just want to say hi?
          Drop a message or connect on social.
        </p>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left - Form */}
        <div className="relative w-full lg:w-1/2 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-pink-100/70 dark:border-gray-700 shadow-xl p-5 sm:p-6 lg:p-7">
          <form onSubmit={sendEmail} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="first-name"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  name="first_name"
                  type="text"
                  placeholder="John"
                  className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="last-name"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last_name"
                  type="text"
                  placeholder="Doe"
                  className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company / Startup"
                  className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
                >
                  Phone number
                </label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me a bit about your project, idea, or question..."
                className="block w-full rounded-md border border-pink-200/80 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-sm outline-none ring-1 ring-pink-200/70 focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400 resize-none"
                required
              />
            </div>

            <div className="pt-2 space-y-3">
              {show && (
                <div
                  className="bg-green-50 border border-green-400 text-green-700 text-xs sm:text-sm py-2 px-3 rounded-md flex items-center justify-center gap-1.5"
                  role="status"
                  aria-live="polite"
                >
                  <strong className="font-semibold">Success.</strong>
                  <span>Your message has been sent.</span>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-disabled={loading}
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                <span>{loading ? "Sending..." : "Let’s talk"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Social / Info */}
        <aside className="w-full lg:w-1/2 lg:pl-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="mt-1 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 p-2.5">
              <AiOutlineGlobal
                className="text-2xl text-indigo-600 dark:text-indigo-300"
                aria-hidden
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                Connect on social
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] text-gray-700 dark:text-gray-200 leading-relaxed max-w-md">
                Prefer DMs instead of email? You can reach out on any of these platforms.
                Even if responses are not instant, every message is appreciated.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <img
                  src="/assets/img/avatar.jpg"
                  alt="Praveen Singh"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Praveen Singh
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Full-Stack Developer • Travel & SaaS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
            <SocialCard
              title="LinkedIn"
              subtitle="@PraveenSingh"
              href="https://www.linkedin.com/in/praveen-singh-ba5656172/"
            >
              <AiFillLinkedin />
            </SocialCard>

            <SocialCard
              title="GitHub"
              subtitle="@Praveen-Singh0"
              href="https://github.com/Praveen-Singh0"
            >
              <AiFillGithub />
            </SocialCard>

            <SocialCard
              title="X (Twitter)"
              subtitle="@prvnBrTwal"
              href="https://x.com/prvnBrTwal"
            >
              <AiFillTwitterCircle />
            </SocialCard>

            <SocialCard
              title="Instagram"
              subtitle="@P_R_V_€_€_N"
              href="https://www.instagram.com/praveen_brtwl/"
            >
              <AiFillInstagram />
            </SocialCard>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactSection;
