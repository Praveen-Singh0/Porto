"use client";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
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
import PortfolioInfoPage from "../portfolioInfo/page";
import ImageUpload from "../components/ImageUpload";
import { useAuth } from "@/app/context/AuthContext";

export default function AboutPage() {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroFormData, setHeroFormData] = useState<{ bio: string }>({
    bio: "",
  });

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutUpdating, setAboutUpdating] = useState(false);
  const [aboutFormData, setAboutFormData] = useState<{
    bio: string;
    image: File | string;
    specialization: string;
    education: string;
    documents: {
      title: string;
      file?: File;
      fileUrl?: string;
    };
  }>({
    bio: "",
    image: "",
    specialization: "",
    education: "",
    documents: {
      title: "",
      file: undefined,
      fileUrl: "",
    },
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
        image: aboutData.imageUrl, // string URL
        specialization: aboutData.specialization,
        education: aboutData.education,
        documents: {
          title: aboutData.documents?.title || "",
          fileUrl: aboutData.documents?.fileUrl || "",
          file: undefined,
        },
      });
    }
  }, [aboutData]);

  useEffect(() => {
    if (heroError || aboutError) {
      showToast({
        message: "API not responding. Showing empty state.",
        type: "error",
      });
    }
  }, [heroError, aboutError]);

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
    if (!aboutFormData.bio.trim() || !aboutFormData.specialization.trim()) {
      showToast({
        message: "Bio and Specialization are required",
        type: "error",
      });
      return;
    }

    try {
      setAboutUpdating(true);

      const updated = await aboutService.updateInfo(aboutFormData);

      setAboutData(updated);
      setIsEditingAbout(false);

      showToast({
        message: "About section updated successfully 🎉",
        type: "success",
      });
    } catch (error: any) {
      showToast({
        message: error.message || "Failed to update About section",
        type: "error",
      });
    } finally {
      setAboutUpdating(false);
    }
  };

  const startEditAbout = () => {
    if (!aboutData) return;

    setAboutFormData({
      bio: aboutData.bio,
      image: aboutData.imageUrl,
      specialization: aboutData.specialization,
      education: aboutData.education,
      documents: {
        title: aboutData.documents?.title || "",
        fileUrl: aboutData.documents?.fileUrl || "",
        file: undefined,
      },
    });

    setIsEditingAbout(true);
  };

  const cancelEditAbout = () => {
    setIsEditingAbout(false);

    if (!aboutData) return;

    setAboutFormData({
      bio: aboutData.bio,
      image: aboutData.imageUrl,
      specialization: aboutData.specialization,
      education: aboutData.education,
      documents: {
        title: aboutData.documents?.title || "",
        fileUrl: aboutData.documents?.fileUrl || "",
        file: undefined,
      },
    });
  };

  if (!user) return null;

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
                <ImageUpload
                  label="Profile Image"
                  value={aboutFormData.image}
                  onChange={(v) =>
                    setAboutFormData({
                      ...aboutFormData,
                      image: v,
                    })
                  }
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
                {/* PDF DOCUMENT */}
                <div>
                  <label className="block text-sm font-medium">
                    Upload PDF Document
                  </label>

                  {/* Title */}
                  <input
                    type="text"
                    className="w-full px-3 py-2 mt-2 border rounded"
                    placeholder="Document Title"
                    value={aboutFormData.documents.title}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        documents: {
                          ...aboutFormData.documents,
                          title: e.target.value,
                        },
                      })
                    }
                  />

                  {/* PDF File Upload */}
                  <input
                    type="file"
                    accept="application/pdf"
                    className="w-full px-3 py-2 mt-2 border rounded"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setAboutFormData({
                        ...aboutFormData,
                        documents: {
                          ...aboutFormData.documents,
                          file,
                        },
                      });
                    }}
                  />

                  {/* Show existing PDF if exists */}
                  {aboutFormData.documents.fileUrl && (
                    <a
                      href={aboutFormData.documents.fileUrl}
                      target="_blank"
                      className="text-blue-500 underline mt-2 block text-sm"
                    >
                      View Existing PDF
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleUpdateAbout}
                  disabled={aboutUpdating}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg
             hover:bg-green-700 transition-colors
             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {aboutUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update
                    </>
                  )}
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
        {/* About Display */}
        {!isEditingAbout && (
          <GlassCard delay={0.2}>
            {aboutData ? (
              <div className="sm:flex block gap-6">
                {/* Profile Image */}
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
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        About Me
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated:{" "}
                        {aboutData.updatedAt
                          ? new Date(aboutData.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    {user?.role === "ADMIN" && (
                      <button
                        onClick={startEditAbout}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Bio */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {aboutData.bio || "No bio available."}
                      </p>
                    </div>

                    {/* Specialization & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Specialization
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {aboutData.specialization || "Not specified"}
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
                          {aboutData.education || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Document */}
                    {aboutData.documents?.fileUrl && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Download className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Document
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-green-600" />

                          <a
                            href={aboutData.documents.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 transition-colors"
                          >
                            {aboutData.documents.title || "View Document"}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="text-center py-12">
                <div className="mb-4 text-gray-400">
                  <User className="w-12 h-12 mx-auto opacity-40" />
                </div>

                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No About Information Found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  API not responding or no data available in database.
                </p>

                {user?.role === "ADMIN" && (
                  <button
                    onClick={() => setIsEditingAbout(true)}
                    className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add About Info
                  </button>
                )}
              </div>
            )}
          </GlassCard>
        )}
      </div>

      {/* Hero Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          Hero Section
        </h2>

        {/* Hero Section Display */}
        <GlassCard delay={0.1}>
          {isEditingHero ? (
            /* ================= EDIT MODE ================= */
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
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : heroData ? (
            /* ================= DISPLAY MODE ================= */
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
                      {heroData.updatedAt
                        ? new Date(heroData.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {user?.role === "ADMIN" && (
                  <button
                    onClick={startEditHero}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio Content
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {heroData.bio || "No hero bio available."}
                </p>
              </div>
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="text-center py-12">
              <div className="mb-4 text-gray-400">
                <Sparkles className="w-12 h-12 mx-auto opacity-40" />
              </div>

              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No Hero Bio Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                API not responding or no data available in database.
              </p>

              {user?.role === "ADMIN" && (
                <button
                  onClick={() => setIsEditingHero(true)}
                  className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Hero Bio
                </button>
              )}
            </div>
          )}
        </GlassCard>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          Basic Info
        </h2>
        <PortfolioInfoPage user={user} />
      </div>
    </div>
  );
}
