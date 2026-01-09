"use client";
import Image from 'next/image';
import { AiOutlineCaretRight } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import "../../../../public/assets/style/Caro.scss";
import Button from '../components/ui/Button';
import { minorProjectService, MinorProject } from '../../../services/projectService';

interface CardProps {
  dataImage: string;
  header: string;
  link: string;
}

const Card = ({ dataImage, header, link }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
      setHeight(cardRef.current.offsetHeight);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMouseX(e.clientX - rect.left - width / 2);
      setMouseY(e.clientY - rect.top - height / 2);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 300);
  };

  const cardStyle = {
    transform: `rotateY(${(mouseX / width) * 20}deg) rotateX(${(-mouseY / height) * 20}deg)`,
    transition: "transform 0.3s ease-out",
  };

  const cardBgTransform = {
    transform: `translateX(${(mouseX / width) * -10}px) translateY(${(mouseY / height) * -10}px)`,
    transition: "transform 0.2s ease-out",
  };

  return (
    <div
      className="card-wrap"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="card" style={cardStyle}>
          <div className="card-bg borders" style={cardBgTransform}>
            <Image
              src={dataImage}
              alt={header}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-center text-lg text-gray-900 dark:text-gray-100 font-mono font-semibold mt-6">
          <h1>{header}</h1>
        </div>
      </a>
    </div>
  );
};

const MinorProjectSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  // ✅ State for API data
  const [projects, setProjects] = useState<MinorProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch projects from API
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await minorProjectService.getAll();
      setProjects(data);
    } catch (error: any) {
      console.error("Error loading minor projects:", error);
      setError(error.message || "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToLast = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <h1 className="mt-12 text-center font-bold mb-8 relative text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100">
        Project <span className="text-pink-500">Section</span>
        <div className="absolute w-20 h-1 bg-pink-500 left-1/2 -translate-x-1/2 bottom-[-12px]"></div>
      </h1>

      <section style={{ maxWidth: "100%" }} className="">
        <div className="z-30 px-0 pt-0 pb-0 lg:px-0 xl:px-0">
          {/* ✅ Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          )}

          {/* ✅ Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button 
                onClick={loadProjects}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* ✅ Projects Carousel */}
          {!isLoading && !error && (
            <div className="flex">
              <Button 
                variant='ghost' 
                onClick={scrollToLast} 
                className="hover:text-pink-500 sm:block text-4xl"
              >
                <AiOutlineCaretRight />
              </Button>
              <div className="carousel" ref={carouselRef}>
                {projects.map((project) => (
                  <Card 
                    key={project.id} 
                    dataImage={project.image} 
                    header={project.header} 
                    link={project.html_url} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* ✅ Empty State */}
          {!isLoading && !error && projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No projects found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MinorProjectSection;
