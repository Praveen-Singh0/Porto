"use client";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "OTHERS";

interface Skill {
  id: string | number;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: string;
}

interface SkillsTableProps {
  skills: Skill[];
}

export default function SkillsTable({ skills }: SkillsTableProps) {
  const categoryColors: Record<SkillCategory, string> = {
    FRONTEND: "#3b82f6",
    BACKEND: "#10b981",
    DATABASE: "#f59e0b",
    DEVOPS: "#8b5cf6",
    OTHERS: "#6b7280",
  };

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills Overview
        </h2>
        <button className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 transition-colors">
          Add Skill
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">
                Skill
              </th>
              <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">
                Proficiency
              </th>
              <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-300">
                Icon
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {skills.map((skill, index) => (
              <motion.tr
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                {/* Skill */}
                <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                  {skill.name}
                </td>

                {/* Category */}
                <td className="px-3 py-2">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${categoryColors[skill.category]}20`,
                      color: categoryColors[skill.category],
                    }}
                  >
                    {skill.category}
                  </span>
                </td>

                {/* Proficiency */}
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[skill.category],
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 w-10">
                      {skill.proficiency}%
                    </span>
                  </div>
                </td>

                {/* Icon */}
                <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  {skill.icon}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
