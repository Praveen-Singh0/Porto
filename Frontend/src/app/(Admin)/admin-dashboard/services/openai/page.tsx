'use client'
import GlassCard from '../../components/GlassCard';
import { Bot, Zap, MessageSquare, TrendingUp } from 'lucide-react';

export default function OpenAIPage() {
  return (
    <div className="space-y-6">
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                OpenAI
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage AI services and intelligent features integration
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Calls</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12,456</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">This month</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tokens Used</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2.4M</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total tokens</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Success Rate</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">99.2%</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">API success rate</p>
          </GlassCard>
        </div>
      </div>
  );
}