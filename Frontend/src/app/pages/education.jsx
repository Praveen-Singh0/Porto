'use client'
import EducationInfo from '../../../public/assets/data/EducationInfo.json'
const {educationCards} = EducationInfo;
const imageMapping = {
  'ShreeDev': '/assets/img/shreeDevS.png',
  'Tulas': '/assets/img/Tulas.jpg'
};
const Card = ({ bgColor, Subjects, link, collageImage, collageName, course, duration }) => {
  return (
    <div className="flex w-full my-6 transform text-center text-base transition lg:max-w-4xl">
      <div className={`rounded-lg ${bgColor} relative flex w-full items-center overflow-hidden bg-white px-4 pb-8  shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8`}>
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
          <div className=" aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 max-h-fit">
            <img src={imageMapping[collageImage]} alt="Two" className="object-cover object-center w-full" />
          </div>
          <div className="sm:col-span-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 ">{collageName}</h2>
            <h1 className="text-1xl font-bold text-gray-900">{course}</h1>
            <h1 className="text-sm font-bold text-green-800">{duration} </h1>
            <fieldset className='' aria-label="Choose a size">
              <div className="mt-4 grid grid-cols-4 gap-4">
                {Subjects.map((sub) =>
                
                    <label key={sub.id} className="group relative flex cursor-pointer items-center justify-center rounded-md  px-4 py-3 text-sm font-medium  text-gray-900 shadow-lg hover:skew-y-6 transition-transform duration-300 sm:flex-1">
                      <span className="font-bold">{sub.name}</span>
                    </label>
                  
                )}
              </div>
            </fieldset>
            <section aria-labelledby=" options-heading" className="mt-10">
              <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"><a href={link} target='_blank'>Visit Official Website</a> </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

const EducationSection = () => {
  return (
    <>
      <div className=" mt-10 relative">
        {/* <div className="absolute blur-3xl top-10 " aria-hidden="true">
          <div className=" sm:aspect-[1155/678] w-[36.125rem] rotate-[0deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]  opacity-30 sm:w-[72rem]"></div>
        </div> */}
      </div>
      <h1 className="text-center text-3xl sm:mb-6 font-bold ">
        Education <span className="text-red-500">Section</span>
      </h1>
      <div>
        <div className="mx-auto">
          <div className=" grid gap-4">
            <div className=" sm:col-start-2">
            {educationCards.map((card) => (
                <Card
                  key={card.id}
                  link={card.link}
                  collageImage={card.collageImage}
                  collageName={card.collageName}
                  course={card.course}
                  duration={card.duration}
                  bgColor={card.bgColor}
                  Subjects={card.Subjects}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationSection;