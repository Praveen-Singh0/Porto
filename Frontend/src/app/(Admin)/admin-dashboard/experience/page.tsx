'use client'
import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin, Calendar, Clock, Tag } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const experienceTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const experienceColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '',
    duration: '',
    period: '',
    type: 'Full-time',
    responsibilities: [''],
    technologies: [''],
    color: '#3b82f6'
  });

  // Load dummy data
  useEffect(() => {
    const dummyExperiences = [
      {
        id: '1',
        title: "Senior Full-Stack Developer",
        company: "Tech Innovations Pvt Ltd",
        location: "Bangalore, India",
        duration: "2 years",
        period: "Jan 2024 - Present",
        type: "Full-time",
        responsibilities: [
          "Led development of microservices architecture",
          "Mentored junior developers and conducted code reviews",
          "Implemented CI/CD pipelines using GitHub Actions"
        ],
        technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
        color: "#3b82f6",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2026-01-02")
      },
      {
        id: '2',
        title: "Frontend Developer",
        company: "Digital Solutions Inc",
        location: "Mumbai, India",
        duration: "2 years",
        period: "Mar 2022 - Dec 2023",
        type: "Full-time",
        responsibilities: [
          "Built responsive web applications using React and TypeScript",
          "Collaborated with UX designers to implement pixel-perfect designs",
          "Optimized application performance achieving 95+ Lighthouse scores"
        ],
        technologies: ["React", "TypeScript", "Tailwind CSS", "Redux"],
        color: "#10b981",
        createdAt: new Date("2022-03-10"),
        updatedAt: new Date("2023-12-20")
      }
    ];
    setExperiences(dummyExperiences);
  }, []);

  const handleCreate = () => {
    if (formData.title && formData.company) {
      const newExperience: Experience = {
        id: Date.now().toString(),
        title: formData.title || '',
        company: formData.company || '',
        location: formData.location || '',
        duration: formData.duration || '',
        period: formData.period || '',
        type: formData.type || 'Full-time',
        responsibilities: formData.responsibilities?.filter(r => r.trim()) || [],
        technologies: formData.technologies?.filter(t => t.trim()) || [],
        color: formData.color || '#3b82f6',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setExperiences([...experiences, newExperience]);
      setFormData({
        title: '',
        company: '',
        location: '',
        duration: '',
        period: '',
        type: 'Full-time',
        responsibilities: [''],
        technologies: [''],
        color: '#3b82f6'
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { 
        ...exp, 
        ...formData, 
        responsibilities: formData.responsibilities?.filter(r => r.trim()) || [],
        technologies: formData.technologies?.filter(t => t.trim()) || [],
        updatedAt: new Date() 
      } : exp
    ));
    setIsEditing(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      duration: '',
      period: '',
      type: 'Full-time',
      responsibilities: [''],
      technologies: [''],
      color: '#3b82f6'
    });
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const startEdit = (experience: Experience) => {
    setFormData({
      ...experience,
      responsibilities: [...experience.responsibilities, ''],
      technologies: [...experience.technologies, '']
    });
    setIsEditing(experience.id);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      title: '',
      company: '',
      location: '',
      duration: '',
      period: '',
      type: 'Full-time',
      responsibilities: [''],
      technologies: [''],
      color: '#3b82f6'
    });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...(formData.responsibilities || []), '']
    });
  };

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities?.filter((_, i) => i !== index) || []
    });
  };

  const updateResponsibility = (index: number, value: string) => {
    const updated = [...(formData.responsibilities || [])];
    updated[index] = value;
    setFormData({ ...formData, responsibilities: updated });
  };

  const addTechnology = () => {
    setFormData({
      ...formData,
      technologies: [...(formData.technologies || []), '']
    });
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((_, i) => i !== index) || []
    });
  };

  const updateTechnology = (index: number, value: string) => {
    const updated = [...(formData.technologies || [])];
    updated[index] = value;
    setFormData({ ...formData, technologies: updated });
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <GlassCard>
          <div className="sm:flex block justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Experience Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your work experience and career history
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </motion.button>
          </div>
        </GlassCard>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isCreating ? 'Add New Experience' : 'Edit Experience'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Senior Full-Stack Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Tech Innovations Pvt Ltd"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Bangalore, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., 2 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Period
                  </label>
                  <input
                    type="text"
                    value={formData.period || ''}
                    onChange={(e) => setFormData({...formData, period: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Jan 2024 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.type || 'Full-time'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {experienceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color Theme
                </label>
                <div className="flex gap-2 flex-wrap">
                  {experienceColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`w-8 h-8 rounded-full ${
                        formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={addResponsibility}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Responsibility
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.responsibilities?.map((responsibility, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => updateResponsibility(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Describe your responsibility..."
                      />
                      {formData.responsibilities && formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeResponsibility(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Technologies
                  </label>
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Technology
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.technologies?.map((technology, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={technology}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="e.g., React, Node.js, AWS"
                      />
                      {formData.technologies && formData.technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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

        {/* Experience Items */}
        <div className="grid gap-6">
          {experiences.map((experience, index) => (
            <GlassCard key={experience.id} delay={index * 0.1}>
              <div className="sm:flex block gap-4">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: experience.color }}
                  >
                    <Briefcase className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startEdit(experience)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(experience.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration} • {experience.type}</span>
                    </div>
                  </div>

                  {experience.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key Responsibilities:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.technologies.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Technologies:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {experiences.length === 0 && !isCreating && (
          <GlassCard>
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Experience Added
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start building your professional portfolio by adding your work experience.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add Your First Experience
              </button>
            </div>
          </GlassCard>
        )}
      </div>
  );
}