"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import GlassCard from "./GlassCard";
import { useAuth } from "@/app/context/AuthContext";

interface MinorProject {
  id: number;
  header: string;
  html_url: string;
  image: string;
  content: string;
}

interface MajorProject {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string | null;
  technologies: string[];
}

interface ProjectCardProps {
  project: MinorProject | MajorProject;
  type: "minor" | "major";
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({
  project,
  type,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const { user } = useAuth();
  const isMinor = type === "minor";
  const minorProject = project as MinorProject;
  const majorProject = project as MajorProject;

  return (
    <GlassCard>
      <div className="relative group">
        {/* Project Image */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
          <img
            src={isMinor ? minorProject.image : majorProject.image}
            alt={isMinor ? minorProject.header : majorProject.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {isMinor ? minorProject.header : majorProject.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {isMinor ? minorProject.content : majorProject.description}
        </p>

        {/* Technologies (Major only) */}
        {!isMinor && (
          <div className="flex flex-wrap gap-1 mb-4">
            {majorProject.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400 rounded"
              >
                {tech}
              </span>
            ))}
            {majorProject.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 rounded">
                +{majorProject.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={isMinor ? minorProject.html_url : majorProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {isMinor ? "View Live" : "Live"}
            </a>

            {!isMinor && majorProject.githubUrl && (
              <a
                href={majorProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
          </div>

          {user?.role === "ADMIN" && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEdit}
                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDelete}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
