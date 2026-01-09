'use client'
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface multiSelectInputProps {
  technologies: string[];
  onChange: (technologies: string[]) => void;
}

export default function multiSelectInput({ technologies, onChange }: multiSelectInputProps) {
  const [input, setInput] = useState('');

  const addTechnology = () => {
    const trimmed = input.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      onChange([...technologies, trimmed]);
      setInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    onChange(technologies.filter(t => t !== tech));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Technologies <span className="text-red-500">*</span>
      </label>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., React, Node.js"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addTechnology}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400 rounded-full text-sm"
          >
            {tech}
            <button
              type="button"
              onClick={() => removeTechnology(tech)}
              className="hover:text-violet-900 dark:hover:text-violet-200"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
