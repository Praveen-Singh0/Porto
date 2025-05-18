import Image from "next/legacy/image";

const about = () => {
  return (
    <div className="mt-16  mx-auto px-4 py-16 max-w-7xl relative overflow-hidden">
      {/* Pink background blob decorations */}

      <div className="absolute bottom-0 left-0 -z-10 opacity-20">
        <div className="absolute blur-3xl top-10 " aria-hidden="true">
          <div className=" sm:aspect-[1155/678] w-[36.125rem] rotate-[0deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]  opacity-30 sm:w-[72rem]"></div>
        </div>
      </div>

      {/* Page title with modern styling */}
      <h1 className="text-center text-4xl font-bold mb-8 relative">
        About <span className="text-pink-500">Me</span>
        <div className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2 bottom-[-12px]"></div>
      </h1>

      {/* Main content card with glassmorphism effect */}
      <div className="relative rounded-3xl backdrop-blur-sm bg-white/70 border border-pink-100 shadow-xl p-8 mb-16">
        {/* Hero section with image and text */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile image with pink gradient border */}
          <div className="relative sm:w-64 w-full h-64 rounded-xl overflow-hidden border-4 border-transparent bg-gradient-to-br from-pink-400 to-pink-600 p-1">
            <Image
              src="/assets/img/aboutSection.jpg"
              alt="Praveen Singh"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Hero text content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-pink-500">Praveen Singh</span>
              <span className="text-gray-700"> / Developer</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Front-End Developer with hands-on experience in building responsive, user-friendly web applications using modern technologies like React, Ant Design, and Tailwind CSS.
            </p>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JavaScript", "UI/UX"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-pink-50 text-pink-600 border border-pink-200 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>

            {/* Contact button */}
            <a href="mailto:parnbartwal@gmail.com" className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-pink-200 transition-all duration-300">
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Info cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
        {/* Info card 1 */}
        <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-pink-500 font-medium mb-2">Full Name</h3>
          <p className="text-gray-800 font-semibold">Praveen Singh</p>
        </div>

        {/* Info card 2 */}
        <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-pink-500 font-medium mb-2">Specialization</h3>
          <p className="text-gray-800 font-semibold">Front-End Developer</p>
        </div>

        {/* Info card 3 */}
        <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-pink-500 font-medium mb-2">Email</h3>
          <p className="text-gray-800 font-semibold">parnbartwal@gmail.com</p>
        </div>

        {/* Info card 4 */}
        <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-pink-500 font-medium mb-2">Education</h3>
          <p className="text-gray-800 font-semibold">Post-Graduate</p>
        </div>
      </div>

      {/* Experience section */}
      <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-3xl p-8 mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience</h3>
        <div className="relative pl-6 border-l-2 border-pink-300 space-y-8">
          {/* Experience 1 */}
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-pink-500 top-0 left-[-33px]"></div>
            <h4 className="text-lg font-bold text-pink-600 mb-1">MERN Stack Developer</h4>
            <p className="text-sm text-pink-400 mb-2">1 Year</p>
            <p className="text-gray-700 leading-relaxed">
              Worked on full-stack development using MongoDB, Express.js, React.js, and Node.js. Built responsive web applications with modern UI/UX principles and implemented RESTful API integrations.
            </p>
          </div>

          {/* Experience 2 */}
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-pink-500 top-0 left-[-33px]"></div>
            <h4 className="text-lg font-bold text-pink-600 mb-1">Junior Software Developer</h4>
            <p className="text-sm text-pink-400 mb-2">6 Months</p>
            <p className="text-gray-700 leading-relaxed">
              Successfully contributed to multiple projects, including a Student Information System (SIS). Developed front-end interfaces and collaborated with team members to implement new features.
            </p>
          </div>
        </div>
      </div>

      {/* Attachments section */}
      <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Documents</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-pink-100 rounded-lg hover:bg-pink-50 transition-colors">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-pink-100 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700 truncate">resume_full_stack_developer.pdf</span>
            </div>
            <a href="/Resume.pdf" target="_blank" className="ml-4 flex-shrink-0 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">View</a>
          </div>

          <div className="flex items-center justify-between p-4 border border-pink-100 rounded-lg hover:bg-pink-50 transition-colors">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-pink-100 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700 truncate">coverletter_full_stack_developer.pdf</span>
            </div>
            <a href="#" className="ml-4 flex-shrink-0 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">Download</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default about