'use client'
import DashboardLayout from './components/DashboardLayout';
import StatsCard from './components/StatsCard';
import SkillsTable from './components/SkillsTable';
import ExperienceTimeline from './components/ExperienceTimeline';
import { Users, Briefcase, Code, GraduationCap, LucideIcon } from 'lucide-react';
import { dummySkills, dummyExperiences, dummyUser } from '../../../../public/assets/data/dummyData';

interface Stat {
  icon: LucideIcon;
  title: string;
  value: string;
  change: number;
  color: string;
}

export default function Dashboard() {
  const stats: Stat[] = [
    { icon: Briefcase, title: 'Total Experience', value: '5+', change: 12, color: '#3b82f6' },
    { icon: Code, title: 'Skills', value: '25', change: 8, color: '#10b981' },
    { icon: GraduationCap, title: 'Certifications', value: '12', change: 5, color: '#f59e0b' },
    { icon: Users, title: 'Projects', value: '48', change: 15, color: '#8b5cf6' },
  ];

  return (
    <DashboardLayout userRole={dummyUser.role}>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Skills Table */}
      <div className="mb-8">
        <SkillsTable skills={dummySkills} />
      </div>

      {/* Experience Timeline */}
      <ExperienceTimeline experiences={dummyExperiences} />
    </DashboardLayout>
  );
}
