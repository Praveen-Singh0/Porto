"use client";

import { motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";

import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ImageUpload from "./ImageUpload";
import MultiSelectInput from "./MultiSelectInput";

interface MinorProjectForm {
  header: string;
  html_url: string;
  content: string;
  image: File | string;
}

interface MajorProjectForm {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  image: File | string;
}

type ProjectFormData = MinorProjectForm | MajorProjectForm;

interface ProjectModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  projectType: "minor" | "major";
  data: ProjectFormData;
  onTypeChange?: (type: "minor" | "major") => void;
  onChange: (data: ProjectFormData) => void;
  onClose: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export default function ProjectModal({
  isOpen,
  mode,
  projectType,
  data,
  onTypeChange,
  onChange,
  onClose,
  onSave,
  isLoading,
}: ProjectModalProps) {
  if (!isOpen) return null;

  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === "create" ? "Add New Project" : "Edit Project"}
              </h2>

              {mode === "create" && onTypeChange && (
                <div className="flex gap-2 mt-3">
                  {(["minor", "major"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => onTypeChange(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        projectType === type
                          ? "bg-violet-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {type === "minor" ? "Minor Project" : "Major Project"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {projectType === "minor" ? (
            <>
              <FormInput
                label="Project Name"
                value={(data as MinorProjectForm).header}
                onChange={(v) => updateField("header", v)}
                required
              />

              <FormInput
                label="Live URL"
                value={(data as MinorProjectForm).html_url}
                onChange={(v) => updateField("html_url", v)}
                type="url"
                required
              />

              <ImageUpload
                label="Project Image"
                value={(data as MinorProjectForm).image}
                onChange={(v) => updateField("image", v)}
                required
              />

              <FormTextarea
                label="Description"
                value={(data as MinorProjectForm).content}
                onChange={(v) => updateField("content", v)}
                required
              />
            </>
          ) : (
            <>
              <FormInput
                label="Project Title"
                value={(data as MajorProjectForm).title}
                onChange={(v) => updateField("title", v)}
                required
              />

              <FormTextarea
                label="Description"
                value={(data as MajorProjectForm).description}
                onChange={(v) => updateField("description", v)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Live URL"
                  value={(data as MajorProjectForm).liveUrl}
                  onChange={(v) => updateField("liveUrl", v)}
                  type="url"
                  required
                />

                <FormInput
                  label="GitHub URL"
                  value={(data as MajorProjectForm).githubUrl}
                  onChange={(v) => updateField("githubUrl", v)}
                  type="url"
                />
              </div>

              <ImageUpload
                label="Project Image"
                value={(data as MajorProjectForm).image}
                onChange={(v) => updateField("image", v)}
                required
              />

              <MultiSelectInput
                label="Technologies"
                items={(data as MajorProjectForm).technologies}
                onChange={(v) => updateField("technologies", v)}
                placeholder="e.g., React, Node.js, AWS"
              />
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === "create" ? "Create" : "Update"} Project
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
