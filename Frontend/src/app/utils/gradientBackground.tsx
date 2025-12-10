import React from "react";
const gradientBackground = ()=>{
  return(
    <>
    <div className="absolute inset-x-0 blur-2xl  -top-90 -z-10  transform-gpu overflow-hidden sm:-top-90" aria-hidden="true">
            <div className="relative  left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(100%-50rem)] sm:w-[82.1875rem]"
              style={{
                clipPath: "polygon(49.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            ></div>
          </div>

            <div
            className="absolute blur-3xl -top-40 right-0 -z-10 transform-gpu overflow-hidden sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative aspect-[1155/678] w-[36.125rem] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          </>
  )
}

export default gradientBackground;