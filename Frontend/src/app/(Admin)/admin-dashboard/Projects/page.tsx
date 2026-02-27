"use client";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useConfirmModal } from "../components/useConfirmModal";
import ConfirmModal from "../components/ConfirmModal";
import {
  minorProjectService,
  majorProjectService,
  minorProjectInfo,
  MajorProjectInfo,
} from "@/services/projectService";
import { useToast } from "@/app/context/ToastContext";
import { useAuth } from "@/app/context/AuthContext";
import Loader from "@/app/Loader";

type ProjectType = "minor" | "major";

const INITIAL_MINOR = {
  header: "",
  html_url: "",
  content: "",
  image: "" as File | string,
};

const INITIAL_MAJOR = {
  title: "",
  description: "",
  liveUrl: "",
  githubUrl: "",
  technologies: [],
  image: "" as File | string,
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { modalState, openConfirm, closeConfirm } = useConfirmModal();

  const [projectType, setProjectType] = useState<ProjectType>("minor");
  const [minorProjects, setMinorProjects] = useState<minorProjectInfo[]>([]);
  const [majorProjects, setMajorProjects] = useState<MajorProjectInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<any>(INITIAL_MINOR);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    setInitialLoading(true);
    try {
      // ✅ Fetch both APIs in parallel
      const [minorData, majorData] = await Promise.all([
        minorProjectService.getAll(),
        majorProjectService.getAll(),
      ]);

      setMinorProjects(minorData);
      setMajorProjects(majorData);
    } catch (error: any) {
      console.error("Error loading projects:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (projectType === "minor") {
        const newProject = await minorProjectService.create({
          header: formData.header,
          html_url: formData.html_url,
          content: formData.content,
          image: formData.image as File,
        });
        setMinorProjects([newProject, ...minorProjects]);
        showToast({
          message: "Minor Project added successfully",
          type: "success",
        });
      } else {
        const newProject = await majorProjectService.create({
          title: formData.title,
          description: formData.description,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          technologies: formData.technologies,
          image: formData.image as File,
        });
        setMajorProjects([newProject, ...majorProjects]);
        showToast({
          message: "Mojor Project added successfully",
          type: "success",
        });
      }
      closeModal();
    } catch (error: any) {
      showToast({
        message: "Failed to add project",
        type: "error",
      });
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      if (projectType === "minor") {
        const updated = await minorProjectService.update(formData.id, {
          header: formData.header,
          html_url: formData.html_url,
          content: formData.content,
          image: formData.image instanceof File ? formData.image : undefined,
        });
        setMinorProjects(
          minorProjects.map((p) => (p.id === updated.id ? updated : p)),
        );
        showToast({
          message: "Minor project updated successfully",
          type: "success",
        });
      } else {
        const updated = await majorProjectService.update(formData.id, {
          title: formData.title,
          description: formData.description,
          liveUrl: formData.liveUrl,
          githubUrl: formData.githubUrl,
          technologies: formData.technologies,
          image: formData.image instanceof File ? formData.image : undefined,
        });
        setMajorProjects(
          majorProjects.map((p) => (p.id === updated.id ? updated : p)),
        );
        // ✅ FIX: This should be success, not error!
        showToast({
          message: "Major project updated successfully",
          type: "success",
        });
      }
      closeModal();
    } catch (error: any) {
      // ✅ Error handling should be here
      console.error("Error updating project:", error);
      showToast({
        message: error.message || "Failed to update project",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number, projectName: string) => {
    openConfirm({
      title: "Delete Project",
      message: `Are you sure you want to delete "${projectName}"? This action cannot be undone.`,
      variant: "danger",
      onConfirm: async () => {
        setDeleteLoading(true);
        try {
          if (projectType === "minor") {
            await minorProjectService.delete(id);
            setMinorProjects(minorProjects.filter((p) => p.id !== id));
            showToast({
              message: "Minor Project deleted successfully",
              type: "success",
            });
          } else {
            await majorProjectService.delete(id);
            setMajorProjects(majorProjects.filter((p) => p.id !== id));
            showToast({
              message: "Major Project deleted successfully",
              type: "success",
            });
          }
          closeConfirm();
        } catch (error: any) {
          showToast({
            message: "Project delete failed",
            type: "error",
          });
          console.error("Error deleting project:", error);
        } finally {
          setDeleteLoading(false);
        }
      },
    });
  };

  const openCreateModal = () => {
    setModalMode("create");
    setFormData(projectType === "minor" ? INITIAL_MINOR : INITIAL_MAJOR);
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setModalMode("edit");
    setFormData(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(projectType === "minor" ? INITIAL_MINOR : INITIAL_MAJOR);
  };

  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    setFormData(type === "minor" ? INITIAL_MINOR : INITIAL_MAJOR);
  };

  // ✅ Instant tab switching - no API call needed
  const handleTabSwitch = (type: ProjectType) => {
    setProjectType(type);
    setSearchQuery(""); // Optional: clear search when switching
  };

  // ✅ Filter projects based on current tab
  const getFilteredProjects = () => {
    const projects = projectType === "minor" ? minorProjects : majorProjects;
    if (!searchQuery) return projects;

    return projects.filter((project) => {
      if (projectType === "minor") {
        const p = project as minorProjectInfo;
        return (
          p.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        const p = project as MajorProjectInfo;
        return (
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        );
      }
    });
  };

  const filteredProjects = getFilteredProjects();


  return (
    <div className="min-h-screen space-y-4 sm:space-y-6 sm:px-0">
      {/* Header */}
      <GlassCard hover={false}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Project Section
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your portfolio projects
            </p>
          </div>
          {user?.role === "ADMIN" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mt-4 lg:mt-0"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </motion.button>
          )}
        </div>
      </GlassCard>

      {/* Filters */}
      <GlassCard delay={0.1} hover={false}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {/* ✅ Instant tab switching */}
            <button
              onClick={() => handleTabSwitch("minor")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                projectType === "minor"
                  ? "bg-white dark:bg-gray-700 text-violet-600 shadow-md"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Minor Projects ({minorProjects.length})
            </button>
            <button
              onClick={() => handleTabSwitch("major")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                projectType === "major"
                  ? "bg-white dark:bg-gray-700 text-pink-600 shadow-md"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Major Projects ({majorProjects.length})
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>
      </GlassCard>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard
                project={project}
                type={projectType}
                onEdit={() => openEditModal(project)}
                onDelete={() =>
                  handleDelete(
                    project.id,
                    projectType === "minor"
                      ? (project as minorProjectInfo).header
                      : (project as MajorProjectInfo).title,
                  )
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>

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

      {filteredProjects.length === 0 && (
        <GlassCard delay={0.2}>
          <Loader/>
        </GlassCard>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal
            isOpen={isModalOpen}
            mode={modalMode}
            projectType={projectType}
            data={formData}
            onTypeChange={modalMode === "create" ? handleTypeChange : undefined}
            onChange={setFormData}
            onClose={closeModal}
            onSave={modalMode === "create" ? handleCreate : handleUpdate}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
