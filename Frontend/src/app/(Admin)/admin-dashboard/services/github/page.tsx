'use client'
import GlassCard from '../../components/GlassCard';
import { Github, GitBranch, Star, Users } from 'lucide-react';

export default function GitHubPage() {
  return (
    <div className="space-y-6">
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                GitHub
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage GitHub repositories and automation workflows
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-5 h-5 text-gray-900" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Repositories</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Active repositories</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stars</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,456</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total stars</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Followers</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">342</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">GitHub followers</p>
          </GlassCard>
        </div>
      </div>
  );
}