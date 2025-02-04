import Image from "next/image";

const about = () => {
  return (
    <div className="shadow-lg mt-16 mx-auto px-4 py-12 max-w-7xl">
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
  )
}
export default about 