"use client";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import {
  Edit,
  Save,
  X,
  User,
  FileText,
  GraduationCap,
  Award,
  Download,
  Sparkles,
  Loader2,
} from "lucide-react";
import { aboutService } from "@/services/aboutSection.service";
import { heroService } from "@/services/heroSection.service";
import type { aboutInfo } from "@/services/aboutSection.service";
import type { heroInfo } from "@/services/heroSection.service";
import { useToast } from "@/app/context/ToastContext";
import useFetch from "@/hooks/useFetch";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";

export default function AboutPage() {
  const { showToast } = useToast();

  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroFormData, setHeroFormData] = useState<{ bio: string }>({
    bio: "",
  });

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutFormData, setAboutFormData] = useState<Partial<aboutInfo>>({
    bio: "",
    imageUrl: "",
    specialization: "",
    education: "",
    documents: [],
  });

  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
    setData: setHeroData,
  } = useFetch<heroInfo>(heroService.getInfo);

  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
    setData: setAboutData,
  } = useFetch<aboutInfo>(aboutService.getInfo);

  useEffect(() => {
    if (heroData) {
      setHeroFormData({ bio: heroData.bio });
    }
  }, [heroData]);

  useEffect(() => {
    if (aboutData) {
      setAboutFormData({
        bio: aboutData.bio,
        imageUrl: aboutData.imageUrl,
        specialization: aboutData.specialization,
        education: aboutData.education,
        documents: [...aboutData.documents],
      });
    }
  }, [aboutData]);

  if (heroError || aboutError) {
    showToast({
      message: "Failed to load page data",
      type: "error",
    });
    return null;
  }

  const handleUpdateHero = async () => {
    if (!heroFormData.bio.trim()) {
      showToast({
        message: "Bio cannot be empty",
        type: "error",
      });
      return;
    }

    try {
      const updatedData = await heroService.updateInfo(heroFormData.bio);
      setHeroData(updatedData);
      setIsEditingHero(false);
      showToast({
        message: "Hero section updated successfully 🎉",
        type: "success",
      });
    } catch (error: any) {
      console.error("Failed to update hero", error);
      showToast({
        message: error.message || "Failed to update hero section",
        type: "error",
      });
    }
  };

  const startEditHero = () => {
    if (heroData) {
      setHeroFormData({ bio: heroData.bio });
      setIsEditingHero(true);
    }
  };

  const cancelEditHero = () => {
    setIsEditingHero(false);
    if (heroData) {
      setHeroFormData({ bio: heroData.bio });
    }
  };

  const handleUpdateAbout = async () => {
    if (!aboutFormData.bio?.trim() || !aboutFormData.specialization?.trim()) {
      showToast({
        message: "Bio and Specialization are required fields",
        type: "error",
      });
      return;
    }

    try {
      const updatePayload = {
        bio: aboutFormData.bio!,
        imageUrl: aboutFormData.imageUrl || "",
        specialization: aboutFormData.specialization!,
        education: aboutFormData.education || "",
        documents: (aboutFormData.documents || []).filter(
          (doc) => doc.title.trim() && doc.fileUrl.trim()
        ),
      };

      const updatedData = await aboutService.updateInfo(updatePayload);
      setAboutData(updatedData);
      setIsEditingAbout(false);
      showToast({
        message: "About section updated successfully 🎉",
        type: "success",
      });
    } catch (error: any) {
      console.error("Failed to update about", error);
      showToast({
        message: error.message || "Failed to update about section",
        type: "error",
      });
    }
  };

  const startEditAbout = () => {
    if (aboutData) {
      setAboutFormData({
        bio: aboutData.bio,
        imageUrl: aboutData.imageUrl,
        specialization: aboutData.specialization,
        education: aboutData.education,
        documents: [...aboutData.documents],
      });
      setIsEditingAbout(true);
    }
  };

  const cancelEditAbout = () => {
    setIsEditingAbout(false);
    setAboutFormData({
      bio: "",
      imageUrl: "",
      specialization: "",
      education: "",
      documents: [],
    });
  };

  const addDocument = () => {
    setAboutFormData({
      ...aboutFormData,
      documents: [
        ...(aboutFormData.documents || []),
        { title: "", fileUrl: "" },
      ],
    });
  };

  const removeDocument = (index: number) => {
    setAboutFormData({
      ...aboutFormData,
      documents: aboutFormData.documents?.filter((_, i) => i !== index) || [],
    });
  };

  const updateDocument = (
    index: number,
    field: "title" | "fileUrl",
    value: string
  ) => {
    const updated = [...(aboutFormData.documents || [])];
    updated[index] = { ...updated[index], [field]: value };
    setAboutFormData({
      ...aboutFormData,
      documents: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            About & Hero Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage hero bio and detailed professional profile
          </p>
        </div>
      </GlassCard>

      {/* About Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-pink-600" />
          Detailed About Section
        </h2>

        {/* Edit Form */}
        {isEditingAbout && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit About Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormInput
                    label="Specialization"
                    value={aboutFormData.specialization || ""}
                    onChange={(value) =>
                      setAboutFormData({
                        ...aboutFormData,
                        specialization: value,
                      })
                    }
                    placeholder="e.g., Full-Stack Development & Cloud Architecture"
                    required
                  />
                </div>
                <div>
                  <FormInput
                    label="Education"
                    value={aboutFormData.education || ""}
                    onChange={(value) =>
                      setAboutFormData({
                        ...aboutFormData,
                        education: value,
                      })
                    }
                    placeholder="e.g., B.Tech in Computer Science Engineering"
                  />
                </div>
              </div>

              <div>
                <FormInput
                  label="Profile Image URL"
                  value={aboutFormData.imageUrl || ""}
                  onChange={(value) =>
                    setAboutFormData({
                      ...aboutFormData,
                      imageUrl: value,
                    })
                  }
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <FormTextarea
                  label="Bio"
                  value={aboutFormData.bio || ""}
                  onChange={(value) =>
                    setAboutFormData({ ...aboutFormData, bio: value })
                  }
                  rows={4}
                  placeholder="Tell us about yourself..."
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Documents
                  </label>
                  <button
                    type="button"
                    onClick={addDocument}
                    className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    + Add Document
                  </button>
                </div>
                <div className="space-y-2">
                  {aboutFormData.documents?.map((doc, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) =>
                          updateDocument(index, "title", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Document title"
                      />
                      <input
                        type="text"
                        value={doc.fileUrl}
                        onChange={(e) =>
                          updateDocument(index, "fileUrl", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="/documents/file.pdf"
                      />
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleUpdateAbout}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Update
                </button>
                <button
                  onClick={cancelEditAbout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* About Display */}
        {aboutData && !isEditingAbout && (
          <GlassCard delay={0.2}>
            <div className="sm:flex block gap-6">
              {aboutData.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={aboutData.imageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-lg object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      About Me
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated:{" "}
                      {new Date(aboutData.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startEditAbout}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {aboutData.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Specialization
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {aboutData.specialization}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Education
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {aboutData.education}
                      </p>
                    </div>
                  </div>

                  {aboutData.documents.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Documents
                        </span>
                      </div>
                      <div className="space-y-2">
                        {aboutData.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700 transition-colors"
                            >
                              {doc.title || `Document ${idx + 1}`}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Hero Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          Hero Section
        </h2>

        {heroData && (
          <GlassCard delay={0.1}>
            {isEditingHero ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Hero Bio
                </h3>
                <div>
                  <FormTextarea
                    label="Bio Description"
                    value={heroFormData.bio}
                    onChange={(value) => setHeroFormData({ bio: value })}
                    rows={4}
                    placeholder="Enter hero bio..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateHero}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Update
                  </button>
                  <button
                    onClick={cancelEditHero}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Hero Bio
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated:{" "}
                        {new Date(heroData.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startEditHero}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio Content
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {heroData.bio}
                  </p>
                </div>
              </div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
}
