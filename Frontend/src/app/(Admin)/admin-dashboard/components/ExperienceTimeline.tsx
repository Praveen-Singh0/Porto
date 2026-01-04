// components/ExperienceTimeline.tsx
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Experience {
  id: string | number;
  title: string;
  company: string;
  type: string;
  color: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience Timeline</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
        
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-16 pb-8"
          >
            {/* Timeline dot */}
            <div 
              className="absolute left-4 top-6 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900"
              style={{ backgroundColor: exp.color }}
            />
            
            <GlassCard hover={false}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                  <p className="text-blue-600 dark:text-blue-300 font-medium">{exp.company}</p>
                </div>
                <Badge 
                  className="text-xs"
                  style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                >
                  {exp.type}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-gray-900 dark:text-white font-medium mb-2">Responsibilities:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>• {resp}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
