"use client";
import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  EyeOff,
  Key,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  RefreshCw,
  Trash2,
  Plus,
} from "lucide-react";
import { useToast } from "@/app/context/ToastContext";
import { useConfirmModal } from "../useConfirmModal";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "@/app/context/AuthContext";

interface ApiKey {
  id: string;
  name: string;
  service: string;
  key: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
  environment: "development" | "production";
}

const predefinedServices = [
  {
    name: "PayU",
    description: "Payment gateway integration for processing payments",
    icon: "💳",
    color: "#00A651",
  },
  {
    name: "GitHub",
    description: "GitHub API for repository management and automation",
    icon: "🐙",
    color: "#24292E",
  },
  {
    name: "OpenAI",
    description: "AI and machine learning API for intelligent features",
    icon: "🤖",
    color: "#10A37F",
  },
  {
    name: "Stripe",
    description: "Payment processing and subscription management",
    icon: "💰",
    color: "#635BFF",
  },
  {
    name: "AWS",
    description: "Amazon Web Services for cloud infrastructure",
    icon: "☁️",
    color: "#FF9900",
  },
  {
    name: "Google Maps",
    description: "Maps and location services integration",
    icon: "🗺️",
    color: "#4285F4",
  },
  {
    name: "SendGrid",
    description: "Email delivery and marketing automation",
    icon: "📧",
    color: "#1A82E2",
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { modalState, openConfirm, closeConfirm } = useConfirmModal();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<ApiKey>>({
    name: "",
    service: "",
    key: "",
    description: "",
    isActive: true,
    environment: "development",
  });
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Load dummy data
  useEffect(() => {
    const dummyApiKeys: ApiKey[] = [
      {
        id: "1",
        name: "PayU Production Key",
        service: "PayU",
        key: "pk_live_51234567890abcdef",
        description: "Production payment gateway key for live transactions",
        isActive: true,
        environment: "production",
        createdAt: new Date("2025-01-01"),
        lastUsed: new Date("2026-01-02"),
      },
      {
        id: "2",
        name: "OpenAI API Key",
        service: "OpenAI",
        key: "sk-1234567890abcdefghijklmnopqrstuvwxyz",
        description: "API key for ChatGPT and AI features",
        isActive: true,
        environment: "production",
        createdAt: new Date("2025-01-15"),
        lastUsed: new Date("2026-01-01"),
      },
      {
        id: "3",
        name: "GitHub Personal Token",
        service: "GitHub",
        key: "ghp_1234567890abcdefghijklmnopqrstuvwxyz",
        description: "Personal access token for repository management",
        isActive: false,
        environment: "development",
        createdAt: new Date("2025-02-01"),
      },
    ];
    setApiKeys(dummyApiKeys);
  }, []);

  const handleCreate = () => {
    if (formData.name && formData.service && formData.key) {
      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: formData.name || "",
        service: formData.service || "",
        key: formData.key || "",
        description: formData.description || "",
        isActive: formData.isActive ?? true,
        environment: formData.environment || "development",
        createdAt: new Date(),
      };
      setApiKeys([...apiKeys, newApiKey]);
      setFormData({
        name: "",
        service: "",
        key: "",
        description: "",
        isActive: true,
        environment: "development",
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    setApiKeys(
      apiKeys.map((key) => (key.id === id ? { ...key, ...formData } : key)),
    );
    setIsEditing(null);
    setFormData({
      name: "",
      service: "",
      key: "",
      description: "",
      isActive: true,
      environment: "development",
    });
  };

  const handleDelete = (id: string, settingName: string) => {
    openConfirm({
      title: "Delete Experience",
      message: `Are you sure you want to delete "${settingName}"? This action cannot be undone.`,
      variant: "danger",
      onConfirm: async () => {
        setDeleteLoading(true);

        try {
          setApiKeys(apiKeys.filter((key) => key.id !== id));

          showToast({
            message: "Your API key deleted successfully",
            type: "success",
          });
          closeConfirm();
        } catch (error) {
          showToast({
            message: "Failed to delete API key",
            type: "error",
          });
        } finally {
          setDeleteLoading(false);
        }
      },
    });
  };

  const startEdit = (apiKey: ApiKey) => {
    setFormData(apiKey);
    setIsEditing(apiKey.id);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      name: "",
      service: "",
      key: "",
      description: "",
      isActive: true,
      environment: "development",
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(keyId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleKeyStatus = (id: string) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, isActive: !key.isActive } : key,
      ),
    );
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return (
      key.substring(0, 4) +
      "•".repeat(key.length - 8) +
      key.substring(key.length - 4)
    );
  };

  const getServiceInfo = (serviceName: string) => {
    return (
      predefinedServices.find((s) => s.name === serviceName) || {
        name: serviceName,
        description: "Custom API service",
        icon: "🔑",
        color: "#6B7280",
      }
    );
  };

  if(user?.role === "GUEST") return;

  return (
    <div className="space-y-4 sm:space-y-6 sm:px-0">
      {/* Header */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              API Keys & Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
              Manage your API keys and service integrations securely
            </p>
          </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span className="whitespace-nowrap">Add API Key</span>
            </motion.button>
        </div>
      </GlassCard>

      {/* Security Notice */}
      <GlassCard>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Security Best Practices
            </h3>
            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>
                • Never share your API keys publicly or commit them to version
                control
              </li>
              <li>• Use environment variables to store keys in production</li>
              <li className="hidden sm:list-item">
                • Regularly rotate your API keys for enhanced security
              </li>
              <li className="hidden sm:list-item">
                • Monitor API key usage and disable unused keys
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Create/Edit Form */}
      {(isCreating || isEditing) && (
        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {isCreating ? "Add New API Key" : "Edit API Key"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., PayU Production Key"
                />
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service
                </label>
                <select
                  value={formData.service || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  {predefinedServices.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                  <option value="Custom">Custom Service</option>
                </select>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Environment
                </label>
                <select
                  value={formData.environment || "development"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      environment: e.target.value as
                        | "development"
                        | "production",
                    })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="development">Development</option>
                  <option value="production">Production</option>
                </select>
              </div>
              <div className="flex items-center sm:col-span-2 md:col-span-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  Active
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={formData.key || ""}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter your API key"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Describe the purpose of this API key..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={
                  isCreating ? handleCreate : () => handleUpdate(isEditing!)
                }
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Save className="w-4 h-4" />
                {isCreating ? "Save" : "Update"}
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* API Keys List */}
      <div className="grid gap-4">
        {apiKeys.map((apiKey, index) => {
          const serviceInfo = getServiceInfo(apiKey.service);
          const isVisible = visibleKeys.has(apiKey.id);

          return (
            <GlassCard key={apiKey.id} delay={index * 0.1}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0"
                  style={{ backgroundColor: serviceInfo.color }}
                >
                  {serviceInfo.icon}
                </div>

                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {apiKey.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 sm:line-clamp-1">
                        {serviceInfo.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          apiKey.environment === "production"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {apiKey.environment}
                      </span>
                      <div className="flex items-center gap-1">
                        {apiKey.isActive ? (
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                        )}
                        <span
                          className={`text-xs font-medium whitespace-nowrap ${
                            apiKey.isActive
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {apiKey.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        API Key
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs sm:text-sm font-mono bg-white dark:bg-gray-900 px-2 sm:px-3 py-2 rounded border text-gray-900 dark:text-white break-all">
                        {isVisible ? apiKey.key : maskApiKey(apiKey.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex-shrink-0 touch-manipulation"
                        title={isVisible ? "Hide key" : "Show key"}
                      >
                        {isVisible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex-shrink-0 touch-manipulation"
                        title="Copy to clipboard"
                      >
                        {copySuccess === apiKey.id ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="whitespace-nowrap">
                        Created: {apiKey.createdAt.toLocaleDateString()}
                      </span>
                      {apiKey.lastUsed && (
                        <span className="whitespace-nowrap">
                          Last used: {apiKey.lastUsed.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => toggleKeyStatus(apiKey.id)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap touch-manipulation ${
                          apiKey.isActive
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                        }`}
                      >
                        {apiKey.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => startEdit(apiKey)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors touch-manipulation"
                        title="Edit"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(apiKey.id, apiKey.name)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors touch-manipulation"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {apiKeys.length === 0 && !isCreating && (
        <GlassCard>
          <div className="text-center py-8 sm:py-12 px-4">
            <Key className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No API Keys Configured
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
              Add your first API key to start integrating with external
              services.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First API Key
            </button>
          </div>
        </GlassCard>
      )}

      {/* Quick Setup Cards */}
      <GlassCard>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {predefinedServices.slice(0, 4).map((service) => (
            <motion.div
              key={service.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all cursor-pointer touch-manipulation"
              onClick={() => {
                setFormData({
                  ...formData,
                  service: service.name,
                  name: `${service.name} API Key`,
                  description: service.description,
                });
                setIsCreating(true);
              }}
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg mb-2 sm:mb-3"
                style={{ backgroundColor: service.color }}
              >
                {service.icon}
              </div>
              <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
                {service.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
