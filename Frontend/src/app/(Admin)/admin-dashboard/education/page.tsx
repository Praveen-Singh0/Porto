'use client'
import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, GraduationCap, ExternalLink, BookOpen, Calendar } from 'lucide-react';

interface Education {
  id: string;
  link: string;
  collageImage: string;
  collageName: string;
  course: string;
  duration: string;
  subjects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Education>>({
    link: '',
    collageImage: '',
    collageName: '',
    course: '',
    duration: '',
    subjects: ['']
  });

  // Load dummy data
  useEffect(() => {
    const dummyEducation = [
      {
        id: '1',
        link: "https://university.edu",
        collageImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
        collageName: "Indian Institute of Technology, Delhi",
        course: "B.Tech in Computer Science Engineering",
        duration: "2017 - 2021",
        subjects: [
          "Data Structures & Algorithms",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks",
          "Software Engineering"
        ],
        createdAt: new Date("2017-08-01"),
        updatedAt: new Date("2021-06-30")
      },
      {
        id: '2',
        link: "https://school.edu",
        collageImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
        collageName: "Delhi Public School",
        course: "Higher Secondary (12th Grade)",
        duration: "2015 - 2017",
        subjects: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Computer Science",
          "English"
        ],
        createdAt: new Date("2015-04-01"),
        updatedAt: new Date("2017-03-31")
      }
    ];
    setEducations(dummyEducation);
  }, []);

  const handleCreate = () => {
    if (formData.collageName && formData.course) {
      const newEducation: Education = {
        id: Date.now().toString(),
        link: formData.link || '',
        collageImage: formData.collageImage || '',
        collageName: formData.collageName || '',
        course: formData.course || '',
        duration: formData.duration || '',
        subjects: formData.subjects?.filter(s => s.trim()) || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setEducations([...educations, newEducation]);
      setFormData({
        link: '',
        collageImage: '',
        collageName: '',
        course: '',
        duration: '',
        subjects: ['']
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { 
        ...edu, 
        ...formData, 
        subjects: formData.subjects?.filter(s => s.trim()) || [],
        updatedAt: new Date() 
      } : edu
    ));
    setIsEditing(null);
    setFormData({
      link: '',
      collageImage: '',
      collageName: '',
      course: '',
      duration: '',
      subjects: ['']
    });
  };

  const handleDelete = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const startEdit = (education: Education) => {
    setFormData({
      ...education,
      subjects: [...education.subjects, '']
    });
    setIsEditing(education.id);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      link: '',
      collageImage: '',
      collageName: '',
      course: '',
      duration: '',
      subjects: ['']
    });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...(formData.subjects || []), '']
    });
  };

  const removeSubject = (index: number) => {
    setFormData({
      ...formData,
      subjects: formData.subjects?.filter((_, i) => i !== index) || []
    });
  };

  const updateSubject = (index: number, value: string) => {
    const updated = [...(formData.subjects || [])];
    updated[index] = value;
    setFormData({ ...formData, subjects: updated });
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <GlassCard>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Education Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your educational background and qualifications
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </motion.button>
          </div>
        </GlassCard>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isCreating ? 'Add New Education' : 'Edit Education'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    value={formData.collageName || ''}
                    onChange={(e) => setFormData({...formData, collageName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Indian Institute of Technology, Delhi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course/Degree
                  </label>
                  <input
                    type="text"
                    value={formData.course || ''}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., B.Tech in Computer Science Engineering"
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
                    placeholder="e.g., 2017 - 2021"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Institution Website
                  </label>
                  <input
                    type="url"
                    value={formData.link || ''}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="https://university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Institution Image URL
                </label>
                <input
                  type="url"
                  value={formData.collageImage || ''}
                  onChange={(e) => setFormData({...formData, collageImage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="https://example.com/college-image.jpg"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subjects/Courses
                  </label>
                  <button
                    type="button"
                    onClick={addSubject}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Subject
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.subjects?.map((subject, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => updateSubject(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="e.g., Data Structures & Algorithms"
                      />
                      {formData.subjects && formData.subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(index)}
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

        {/* Education Items */}
        <div className="grid gap-6">
          {educations.map((education, index) => (
            <GlassCard key={education.id} delay={index * 0.1}>
              <div className="flex gap-6">
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
                      <div className="flex items-center gap-2 mb-2">
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
                        onClick={() => handleDelete(education.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
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
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {educations.length === 0 && !isCreating && (
          <GlassCard>
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Education Added
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start building your academic profile by adding your educational background.
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