'use client'
import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Code, TrendingUp } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100 scale
  category: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const skillCategories = [
  'FRONTEND',
  'BACKEND', 
  'DATABASE',
  'DEVOPS',
  'OTHERS'
];

const skillColors = [
  '#61dafb', // React blue
  '#339933', // Node green
  '#3178c6', // TypeScript blue
  '#336791', // PostgreSQL blue
  '#47a248', // MongoDB green
  '#2496ed', // Docker blue
  '#ff9900', // AWS orange
  '#f05032', // Git red
  '#000000', // Next.js black
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'FRONTEND',
    proficiency: 50,
    icon: '',
    color: '#61dafb'
  });

  // Load dummy data
  useEffect(() => {
    const dummySkills = [
      {
        id: '1',
        name: "React",
        proficiency: 95,
        category: "FRONTEND",
        icon: "⚛️",
        color: "#61dafb",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '2',
        name: "Next.js",
        proficiency: 90,
        category: "FRONTEND",
        icon: "▲",
        color: "#000000",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '3',
        name: "TypeScript",
        proficiency: 88,
        category: "FRONTEND",
        icon: "🔷",
        color: "#3178c6",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '4',
        name: "Node.js",
        proficiency: 92,
        category: "BACKEND",
        icon: "🟢",
        color: "#339933",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '5',
        name: "Express",
        proficiency: 90,
        category: "BACKEND",
        icon: "🚂",
        color: "#000000",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '6',
        name: "PostgreSQL",
        proficiency: 85,
        category: "DATABASE",
        icon: "🐘",
        color: "#336791",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '7',
        name: "MongoDB",
        proficiency: 87,
        category: "DATABASE",
        icon: "🍃",
        color: "#47a248",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '8',
        name: "Docker",
        proficiency: 80,
        category: "DEVOPS",
        icon: "🐳",
        color: "#2496ed",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '9',
        name: "AWS",
        proficiency: 75,
        category: "DEVOPS",
        icon: "☁️",
        color: "#ff9900",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '10',
        name: "Git",
        proficiency: 93,
        category: "OTHERS",
        icon: "📦",
        color: "#f05032",
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2026-01-02")
      }
    ];
    setSkills(dummySkills);
  }, []);

  const handleCreate = () => {
    if (formData.name && formData.category) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: formData.name || '',
        category: formData.category || 'FRONTEND',
        proficiency: formData.proficiency || 50,
        icon: formData.icon || '🔧',
        color: formData.color || '#61dafb',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setSkills([...skills, newSkill]);
      setFormData({
        name: '',
        category: 'FRONTEND',
        proficiency: 50,
        icon: '',
        color: '#61dafb'
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, ...formData, updatedAt: new Date() } : skill
    ));
    setIsEditing(null);
    setFormData({
      name: '',
      category: 'FRONTEND',
      proficiency: 50,
      icon: '',
      color: '#61dafb'
    });
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const startEdit = (skill: Skill) => {
    setFormData(skill);
    setIsEditing(skill.id);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      name: '',
      category: 'FRONTEND',
      proficiency: 50,
      icon: '',
      color: '#61dafb'
    });
  };

  const getProgressColor = (proficiency: number) => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 75) return 'bg-blue-500';
    if (proficiency >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
        {/* Header */}
        <GlassCard>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Skills Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your technical skills and proficiency levels
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </motion.button>
          </div>
        </GlassCard>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isCreating ? 'Add New Skill' : 'Edit Skill'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category || 'FRONTEND'}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {skillCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proficiency (0-100%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.proficiency || 50}
                    onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner (0%)</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {formData.proficiency || 50}%
                    </span>
                    <span>Expert (100%)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon || ''}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., ⚛️, 🟢, 📘"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color (Hex)
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    value={formData.color || '#61dafb'}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={formData.color || '#61dafb'}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="#61dafb"
                  />
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {skillColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`w-8 h-8 rounded-full border-2 ${
                        formData.color === color ? 'border-gray-400' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={isCreating ? handleCreate : () => handleUpdate(isEditing!)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isCreating ? 'Save' : 'Update'}
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

        {/* Skills by Category */}
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <GlassCard key={category}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {category}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: skill.color }}
                        >
                          {skill.icon || '🔧'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.proficiency}% proficiency
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(skill)}
                          className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(skill.proficiency)}`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {skill.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <TrendingUp className="w-3 h-3" />
                        Updated {skill.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        ))}

        {skills.length === 0 && !isCreating && (
          <GlassCard>
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Skills Added
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start building your skills portfolio by adding your technical expertise.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add Your First Skill
              </button>
            </div>
          </GlassCard>
        )}
      </div>
  );
}