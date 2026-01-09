"use client";
import useFetch from "@/hooks/useFetch";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { skillsService, SkillInfo, SkillCategory } from "@/services/skillSection.service";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SkillsTable() {
  const { data: skills } = useFetch<SkillInfo[]>(skillsService.getInfo);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "ALL">("ALL");

  const categoryColors: Record<SkillCategory, string> = {
    FRONTEND: "#3b82f6",
    BACKEND: "#10b981",
    DATABASE: "#f59e0b",
    DEVOPS: "#8b5cf6",
    OTHERS: "#6b7280",
  };

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (!skills) return [];
    if (selectedCategory === "ALL") return skills;
    return skills.filter(skill => skill.category === selectedCategory);
  }, [skills, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSkills.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleCategoryChange = (category: SkillCategory | "ALL") => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categories: Array<SkillCategory | "ALL"> = ["ALL", "FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "OTHERS"];

  return (
    <GlassCard>
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills Overview
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {startIndex + 1} - {Math.min(endIndex, filteredSkills.length)} of {filteredSkills.length} skills
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* Table Head */}
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-white/20">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Skill
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Proficiency
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                Icon
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {paginatedSkills.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No skills found in this category
                </td>
              </tr>
            ) : (
              paginatedSkills.map((skill, index) => (
                <motion.tr
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Skill */}
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${categoryColors[skill.category]}20`,
                        color: categoryColors[skill.category],
                      }}
                    >
                      {skill.category}
                    </span>
                  </td>

                  {/* Proficiency */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: categoryColors[skill.category],
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </td>

                  {/* Icon */}
                  <td className="px-4 py-3 text-md">
                    {skill.icon}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredSkills.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1 text-sm bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[32px] h-8 px-2 text-sm font-medium rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/20"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
