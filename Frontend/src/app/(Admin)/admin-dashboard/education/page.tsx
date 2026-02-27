"use client";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  GraduationCap,
  ExternalLink,
  BookOpen,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  educationService,
  educationInfo,
  educationPayload,
} from "@/services/education.service";
import { useToast } from "@/app/context/ToastContext";
import { useConfirmModal } from "../components/useConfirmModal";
import ConfirmModal from "../components/ConfirmModal";
import FormInput from "../components/FormInput";
import MultiSelectInput from "../components/MultiSelectInput";
import ImageUpload from "../components/ImageUpload";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import Loader from "@/app/Loader";

export default function EducationPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { modalState, openConfirm, closeConfirm } = useConfirmModal();

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<educationPayload>>({
    link: "",
    collageImage: "",
    collageName: "",
    course: "",
    duration: "",
    subjects: [{ name: "" }],
  });

  const {
    data: educations,
    error: educationsError,
    setData: setEducations,
  } = useFetch<educationInfo[]>(educationService.getInfo);

  const buildPayload = (): educationPayload => ({
    link: formData.link || "",
    collageImage: formData.collageImage || "",
    collageName: formData.collageName || "",
    course: formData.course || "",
    duration: formData.duration || "",
    subjects:
      formData.subjects
        ?.filter((s) => s.name.trim())
        .map((s) => ({ name: s.name.trim() })) || [],
  });

  const resetForm = () => {
    setFormData({
      link: "",
      collageImage: "",
      collageName: "",
      course: "",
      duration: "",
      subjects: [{ name: "" }],
    });
  };

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const data = await educationService.getInfo();
        setEducations(data);
      } catch {
        showToast({
          message: "Failed to load education data",
          type: "error",
        });
      }
    };

    loadEducation();
  }, []);

  const handleCreate = async () => {
    try {
      setSavingLoading(true);

      const created = await educationService.createInfo(buildPayload());
      setEducations((prev) => [...(prev ?? []), created]);
      setIsCreating(false);
      resetForm();

      showToast({ message: "Education added successfully", type: "success" });
    } catch {
      showToast({ message: "Failed to add education", type: "error" });
    } finally {
      setSavingLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!isEditing) return;

    try {
      setSavingLoading(true);

      const updated = await educationService.updateInfo(
        isEditing,
        buildPayload(),
      );

      setEducations((prev) =>
        (prev ?? []).map((e) => (e.id === isEditing ? updated : e)),
      );

      setIsEditing(null);
      resetForm();

      showToast({ message: "Education updated successfully", type: "success" });
    } catch {
      showToast({ message: "Failed to update education", type: "error" });
    } finally {
      setSavingLoading(false);
    }
  };

  const handleDelete = (id: number, collegeName: string) => {
    openConfirm({
      title: "Delete Education",
      message: `Are you sure you want to delete "${collegeName}"? This action cannot be undone.`,
      variant: "danger",
      onConfirm: async () => {
        const snapshot = educations;

        setEducations((prev) => (prev ?? []).filter((e) => e.id !== id));
        setDeleteLoading(true);

        try {
          await educationService.deleteInfo(id);
          showToast({
            message: "Education deleted successfully",
            type: "success",
          });
          closeConfirm();
        } catch {
          setEducations(snapshot);
          showToast({
            message: "Failed to delete education",
            type: "error",
          });
        } finally {
          setDeleteLoading(false);
        }
      },
    });
  };

  const startEdit = (edu: educationInfo) => {
    setIsEditing(edu.id);
    setFormData({
      link: edu.link,
      collageImage: edu.collageImage,
      collageName: edu.collageName,
      course: edu.course,
      duration: edu.duration,
      subjects: [...edu.subjects, { name: "" }],
    });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard>
        <div className="sm:flex block justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Education Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your educational background and qualifications
            </p>
          </div>
          {user?.role === "ADMIN" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </motion.button>
          )}
        </div>
      </GlassCard>

      {/* Create/Edit Form */}
      {(isCreating || isEditing) && (
        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isCreating ? "Add New Education" : "Edit Education"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  label="Institution Name"
                  value={formData.collageName || ""}
                  onChange={(value) =>
                    setFormData({ ...formData, collageName: value })
                  }
                  placeholder="e.g., Indian Institute of Technology, Delhi"
                />
              </div>
              <div>
                <FormInput
                  label="Course/Degree"
                  value={formData.course || ""}
                  onChange={(value) =>
                    setFormData({ ...formData, course: value })
                  }
                  placeholder="e.g., B.Tech in Computer Science Engineering"
                />
              </div>
              <div>
                <FormInput
                  label="Duration"
                  value={formData.duration || ""}
                  onChange={(value) =>
                    setFormData({ ...formData, duration: value })
                  }
                  placeholder="e.g., 2017 - 2021"
                />
              </div>
              <div>
                <FormInput
                  label="Institution Website"
                  type="url"
                  value={formData.link || ""}
                  onChange={(value) =>
                    setFormData({ ...formData, link: value })
                  }
                  placeholder="https://university.edu"
                />
              </div>
            </div>

            <div>
              <ImageUpload
                label="Institution Image"
                value={formData.collageImage || ""}
                onChange={(v) =>
                  setFormData({
                    ...formData,
                    collageImage: v,
                  })
                }
              />
            </div>

            <div>
              <div className="space-y-2">
                <MultiSelectInput
                  label="Subjects/Courses"
                  items={
                    formData.subjects?.map((s) => s.name).filter(Boolean) || []
                  }
                  onChange={(items) =>
                    setFormData({
                      ...formData,
                      subjects: items.map((name) => ({ name })),
                    })
                  }
                  placeholder="e.g., Data Structures & Algorithms"
                  emptyMessage="No subjects added yet"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={isCreating ? handleCreate : handleUpdate}
                disabled={savingLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg
             hover:bg-green-700 transition-colors
             disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isCreating ? "Save" : "Update"}
                  </>
                )}
              </button>

              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid gap-6">
        {educations ? (
          educations.map((education, index) => (
            <GlassCard key={education.id} delay={index * 0.1}>
              <div className="sm:flex block gap-6">
                {education.collageImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={education.collageImage}
                      alt={education.collageName}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-start gap-2 mb-2 mt-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {education.collageName}
                        </h3>
                        {education.link && (
                          <a
                            href={education.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-1">
                        {education.course}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{education.duration}</span>
                      </div>
                    </div>
                    {user?.role === "ADMIN" && (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startEdit(education)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleDelete(education.id, education.collageName)
                          }
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {education.subjects.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subjects/Courses Studied:
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {education.subjects.map((subject, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full"></div>
                            <span>{subject.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <Loader />
        )}

        <ConfirmModal
          isOpen={modalState.isOpen}
          onClose={closeConfirm}
          onConfirm={modalState.onConfirm}
          title={modalState.title}
          message={modalState.message}
          variant={modalState.variant}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={deleteLoading}
        />
      </div>

      {educations && educations.length === 0 && !isCreating && (
        <GlassCard>
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Education Added
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start building your academic profile by adding your educational
              background.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Education
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
