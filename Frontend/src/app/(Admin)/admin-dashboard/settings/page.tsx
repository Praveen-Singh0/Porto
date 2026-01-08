'use client'
import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
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
  Plus
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  service: string;
  key: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
  environment: 'development' | 'production';
}

const predefinedServices = [
  {
    name: 'PayU',
    description: 'Payment gateway integration for processing payments',
    icon: '💳',
    color: '#00A651'
  },
  {
    name: 'Amadeus',
    description: 'Travel and tourism API for flight, hotel bookings',
    icon: '✈️',
    color: '#1E40AF'
  },
  {
    name: 'GitHub',
    description: 'GitHub API for repository management and automation',
    icon: '🐙',
    color: '#24292E'
  },
  {
    name: 'OpenAI',
    description: 'AI and machine learning API for intelligent features',
    icon: '🤖',
    color: '#10A37F'
  },
  {
    name: 'Stripe',
    description: 'Payment processing and subscription management',
    icon: '💰',
    color: '#635BFF'
  },
  {
    name: 'AWS',
    description: 'Amazon Web Services for cloud infrastructure',
    icon: '☁️',
    color: '#FF9900'
  },
  {
    name: 'Google Maps',
    description: 'Maps and location services integration',
    icon: '🗺️',
    color: '#4285F4'
  },
  {
    name: 'SendGrid',
    description: 'Email delivery and marketing automation',
    icon: '📧',
    color: '#1A82E2'
  }
];

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<Partial<ApiKey>>({
    name: '',
    service: '',
    key: '',
    description: '',
    isActive: true,
    environment: 'development'
  });
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Load dummy data
  useEffect(() => {
    const dummyApiKeys: ApiKey[] = [
      {
        id: '1',
        name: 'PayU Production Key',
        service: 'PayU',
        key: 'pk_live_51234567890abcdef',
        description: 'Production payment gateway key for live transactions',
        isActive: true,
        environment: 'production',
        createdAt: new Date('2025-01-01'),
        lastUsed: new Date('2026-01-02')
      },
      {
        id: '2',
        name: 'OpenAI API Key',
        service: 'OpenAI',
        key: 'sk-1234567890abcdefghijklmnopqrstuvwxyz',
        description: 'API key for ChatGPT and AI features',
        isActive: true,
        environment: 'production',
        createdAt: new Date('2025-01-15'),
        lastUsed: new Date('2026-01-01')
      },
      {
        id: '3',
        name: 'GitHub Personal Token',
        service: 'GitHub',
        key: 'ghp_1234567890abcdefghijklmnopqrstuvwxyz',
        description: 'Personal access token for repository management',
        isActive: false,
        environment: 'development',
        createdAt: new Date('2025-02-01')
      }
    ];
    setApiKeys(dummyApiKeys);
  }, []);

  const handleCreate = () => {
    if (formData.name && formData.service && formData.key) {
      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: formData.name || '',
        service: formData.service || '',
        key: formData.key || '',
        description: formData.description || '',
        isActive: formData.isActive ?? true,
        environment: formData.environment || 'development',
        createdAt: new Date()
      };
      setApiKeys([...apiKeys, newApiKey]);
      setFormData({
        name: '',
        service: '',
        key: '',
        description: '',
        isActive: true,
        environment: 'development'
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, ...formData } : key
    ));
    setIsEditing(null);
    setFormData({
      name: '',
      service: '',
      key: '',
      description: '',
      isActive: true,
      environment: 'development'
    });
  };

  const handleDelete = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const startEdit = (apiKey: ApiKey) => {
    setFormData(apiKey);
    setIsEditing(apiKey.id);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      name: '',
      service: '',
      key: '',
      description: '',
      isActive: true,
      environment: 'development'
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
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleKeyStatus = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, isActive: !key.isActive } : key
    ));
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const getServiceInfo = (serviceName: string) => {
    return predefinedServices.find(s => s.name === serviceName) || {
      name: serviceName,
      description: 'Custom API service',
      icon: '🔑',
      color: '#6B7280'
    };
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <GlassCard>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                API Keys & Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your API keys and service integrations securely
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add API Key
            </motion.button>
          </div>
        </GlassCard>

        {/* Security Notice */}
        <GlassCard>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Security Best Practices
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Never share your API keys publicly or commit them to version control</li>
                <li>• Use environment variables to store keys in production</li>
                <li>• Regularly rotate your API keys for enhanced security</li>
                <li>• Monitor API key usage and disable unused keys</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isCreating ? 'Add New API Key' : 'Edit API Key'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., PayU Production Key"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service
                  </label>
                  <select
                    value={formData.service || ''}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a service</option>
                    {predefinedServices.map(service => (
                      <option key={service.name} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                    <option value="Custom">Custom Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Environment
                  </label>
                  <select
                    value={formData.environment || 'development'}
                    onChange={(e) => setFormData({...formData, environment: e.target.value as 'development' | 'production'})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="development">Development</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.isActive ?? true}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
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
                  value={formData.key || ''}
                  onChange={(e) => setFormData({...formData, key: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter your API key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Describe the purpose of this API key..."
                />
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
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: serviceInfo.color }}
                  >
                    {serviceInfo.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {apiKey.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {serviceInfo.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          apiKey.environment === 'production' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {apiKey.environment}
                        </span>
                        <div className="flex items-center gap-1">
                          {apiKey.isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span className={`text-xs font-medium ${
                            apiKey.isActive ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {apiKey.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Key className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          API Key
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm font-mono bg-white dark:bg-gray-900 px-3 py-2 rounded border text-gray-900 dark:text-white">
                          {isVisible ? apiKey.key : maskApiKey(apiKey.key)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          title={isVisible ? 'Hide key' : 'Show key'}
                        >
                          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
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

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <span>Created: {apiKey.createdAt.toLocaleDateString()}</span>
                        {apiKey.lastUsed && (
                          <span>Last used: {apiKey.lastUsed.toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleKeyStatus(apiKey.id)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            apiKey.isActive
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                          }`}
                        >
                          {apiKey.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => startEdit(apiKey)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Edit"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(apiKey.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
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
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No API Keys Configured
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Add your first API key to start integrating with external services.
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Setup
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {predefinedServices.slice(0, 4).map((service) => (
              <motion.div
                key={service.name}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  setFormData({
                    ...formData,
                    service: service.name,
                    name: `${service.name} API Key`,
                    description: service.description
                  });
                  setIsCreating(true);
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3"
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
  );
}