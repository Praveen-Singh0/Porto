'use client'

import React from 'react';
import Image from 'next/image';
import EducationInfo from '../../../public/assets/data/EducationInfo.json';
import { ScrollStackContainer } from '../components/ScrollStack';

const { educationCards } = EducationInfo;

const imageMapping: Record<string, string> = {
  'ShreeDev': '/assets/img/shreeDevS.png',
  'Tulas': '/assets/img/Tulas.jpg'
};

const EducationSection = () => {
  return (
    <div className="mt-16 mx-auto  max-w-7xl relative">
      {/* Pink background decorations */}
      <div className="absolute top-40 left-20 -z-10 opacity-10">
        <div className="w-72 h-72 rounded-full bg-pink-400 blur-3xl"></div>
      </div>
      <div className="absolute right-20 -z-10 opacity-10">
        <div className="w-64 h-64 rounded-full bg-pink-600 blur-3xl"></div>
      </div>
      
      {/* Section title */}
      <h1 className="text-center text-4xl font-bold  relative">
        Education <span className="text-pink-500">Journey</span>
        <div className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2 "></div>
      </h1>
      
      {/* Scroll Stack Cards */}
      <ScrollStackContainer className="mt-20 ">
        {educationCards.map((card, index) => (
          <div 
            key={card.id}
            className="mb-8"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-pink-50 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row">
                {/* Left side with image */}
                <div className="lg:w-2/5 relative">
                  <div className="h-64 lg:h-full relative overflow-hidden">
                    <Image 
                      src={imageMapping[card.collageImage]} 
                      alt={card.collageName}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold">{card.collageName}</h3>
                        <p className="text-pink-200">{card.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side with content */}
                <div className="lg:w-3/5 p-8">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs font-medium rounded-full mb-2 inline-block">
                        {card.duration}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800">{card.course}</h2>
                      <div className="w-16 h-1 bg-pink-500 mt-2"></div>
                    </div>
                    
                    {/* Subjects grid */}
                    <div className="mb-8 flex-grow">
                      <h3 className="text-gray-500 font-medium mb-3">Key Subjects</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {card.Subjects.map((subject) => (
                          <div 
                            key={subject.id} 
                            className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                          >
                            <span className="text-gray-700 font-medium">{subject.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA button */}
                    <div className="mt-auto">
                      <a 
                        href={card.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 p-0.5 text-white shadow-lg"
                      >
                        <span className="relative flex items-center space-x-2 rounded-full bg-white px-6 py-3 text-gray-800 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white">
                          <span>Visit Official Website</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollStackContainer>
    </div>
  );
};

export default EducationSection;