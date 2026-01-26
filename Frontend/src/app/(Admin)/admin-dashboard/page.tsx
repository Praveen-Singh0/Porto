// app/dashboard/page.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Brain,
  Github,
  MessageCircle,
  Plane,
  Activity,
  Zap,
  Database,
  Wifi,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import GlassCard from "./components/GlassCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-700 to-pink-100/50 dark:from-purple-500 dark:to-grey-100 p-8 md:p-12 text-white rounded-tr-3xl rounded-bl-3xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                Live Portfolio System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to the Control Center
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Real-time systems powered by AI, live data, and modern
              architecture. Not just a portfolio—it's a production-ready
              platform.
            </p>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700" />
          </div>
        </motion.div>

        {/* System Status Bar */}
        <SystemStatusBar />

        {/* Main Grid - Featured Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIAssistantWidget />
          <GitHubLiveWidget />
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChatSystemWidget />
          <SystemHealthWidget />
        </div>

        {/* Quick Stats */}
        <QuickStatsGrid />
      </div>
    </div>
  );
}

// System Status Bar Component
function SystemStatusBar() {
  const services = [
    { name: "API Server", status: "online", latency: "45ms" },
    { name: "Database", status: "online", latency: "12ms" },
    { name: "WebSocket", status: "online", latency: "8ms" },
    { name: "AI Service", status: "online", latency: "230ms" },
  ];

  return (
    <GlassCard delay={0.1} hover={false}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            All Systems Operational
          </span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {service.name}
              </span>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-500">
                {service.latency}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// AI Assistant Widget
function AIAssistantWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const suggestions = [
    "Analyze my GitHub contributions",
    "Generate resume from experience",
    "Suggest portfolio improvements",
  ];

  const handleOpenConsole = () => {
    router.push("/admin-dashboard/services/openai");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity " />
      <GlassCard className="relative h-full" hover={false}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Assistant
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GPT-4 Powered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              Active
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 group/item"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {suggestion}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-purple-500 group-hover/item:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenConsole}
          className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-red-300 to-purple-400 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Open AI Console
        </motion.button>
      </GlassCard>
    </motion.div>
  );
}

// GitHub Live Widget
function GitHubLiveWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const stats = [
    { label: "Commits This Week", value: "34", trend: "+12%" },
    { label: "Active Repos", value: "6", trend: "+2" },
    { label: "Most Used", value: "TypeScript", trend: "67%" },
  ];

  const handleViewActivity = () => {
    router.push("/admin-dashboard/services/github");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />

      <GlassCard className="relative h-full" hover={false}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                GitHub Intelligence
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Live Activity Feed
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last Push
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              2 hours ago
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {stat.label}
              </div>
              <div className="text-xs font-medium text-green-600 dark:text-green-400">
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-2 mb-4">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Recent Activity
          </div>
          {[
            {
              repo: "portfolio-v3",
              action: "Updated dashboard UI",
              time: "2h",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.repo}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {activity.action}
                </div>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleViewActivity}
          className="w-1/2 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:shadow-lg transition-all"
        >
          View All Activity
        </motion.button>
      </GlassCard>
    </motion.div>
  );
}

// Chat System Widget
function ChatSystemWidget() {
  const router = useRouter();

  const handleOpenChat = () => {
    router.push("/admin-dashboard/services/chat");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />

      <GlassCard className="relative h-full" hover={false}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Live Chat
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              WebSocket Powered
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Online Users
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              3
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Messages Today
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              42
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Response Time
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ~2min
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenChat}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium hover:shadow-lg transition-all"
        >
          Open Chat
        </motion.button>
      </GlassCard>
    </motion.div>
  );
}


// System Health Widget
function SystemHealthWidget() {
  const systems = [
    { name: "Backend API", status: "online", icon: Zap },
    { name: "PostgreSQL", status: "online", icon: Database },
    { name: "WebSocket", status: "online", icon: Wifi },
    { name: "Redis Cache", status: "online", icon: Activity },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />

      <GlassCard className="relative h-full" hover={false}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              System Health
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Infrastructure
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {system.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {system.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Quick Stats Grid
function QuickStatsGrid() {
  const stats = [
    { label: "Total API Calls", value: "2,847", change: "+14%", color: "blue" },
    { label: "Uptime", value: "99.8%", change: "+0.2%", color: "green" },
    { label: "Active Sessions", value: "12", change: "+3", color: "purple" },
    { label: "Avg Response", value: "145ms", change: "-23ms", color: "orange" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <GlassCard key={index} delay={0.8 + index * 0.05} hover={false}>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {stat.label}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </div>
          <div
            className={`text-xs font-medium ${
              stat.change.startsWith("+") ? "text-green-600" : "text-blue-600"
            }`}
          >
            {stat.change}
          </div>
        </GlassCard>
      ))}
    </motion.div>
  );
}
