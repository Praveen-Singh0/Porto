'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Check, 
  CheckCheck,
  Clock,
  MessageCircle,
  Users,
  Archive,
  Star,
  ArrowLeft
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
  unreadCount: number;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface Chat {
  userId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
}

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      lastSeen: 'online',
      isOnline: true,
      unreadCount: 3
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastSeen: '2 minutes ago',
      isOnline: false,
      unreadCount: 1
    },
    {
      id: '3',
      name: 'Mike Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      lastSeen: '1 hour ago',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      lastSeen: 'online',
      isOnline: true,
      unreadCount: 5
    },
    {
      id: '5',
      name: 'Alex Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      lastSeen: '5 minutes ago',
      isOnline: false,
      unreadCount: 0
    }
  ]);

  const [chats] = useState<Chat[]>([
    {
      userId: '1',
      lastMessage: 'Hey, I need help with my booking',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 3,
      isPinned: true,
      isArchived: false
    },
    {
      userId: '2',
      lastMessage: 'Thank you for your assistance!',
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 1,
      isPinned: false,
      isArchived: false
    },
    {
      userId: '3',
      lastMessage: 'When will the feature be available?',
      lastMessageTime: new Date(Date.now() - 60 * 60 * 1000),
      unreadCount: 0,
      isPinned: false,
      isArchived: false
    },
    {
      userId: '4',
      lastMessage: 'I love the new update! 🎉',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 5,
      isPinned: true,
      isArchived: false
    },
    {
      userId: '5',
      lastMessage: 'Can we schedule a call?',
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
      isPinned: false,
      isArchived: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '1',
      content: 'Hi there! I need help with my flight booking.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isFromUser: true,
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      userId: '1',
      content: 'Hello John! I\'d be happy to help you with your booking. What specific issue are you facing?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isFromUser: false,
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      userId: '1',
      content: 'I can\'t seem to find my confirmation email.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      isFromUser: true,
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      userId: '1',
      content: 'Let me check that for you. Can you provide me with your booking reference number?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isFromUser: false,
      status: 'read',
      type: 'text'
    },
    {
      id: '5',
      userId: '1',
      content: 'Sure, it\'s BK123456789',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isFromUser: true,
      status: 'delivered',
      type: 'text'
    }
  ]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredChats = chats.filter(chat => {
    const user = users.find(u => u.id === chat.userId);
    if (!user) return false;
    
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'unread' && chat.unreadCount > 0) ||
                     (activeTab === 'archived' && chat.isArchived);
    
    return matchesSearch && matchesTab;
  });

  const selectedUserData = users.find(u => u.id === selectedUser);
  const selectedUserMessages = messages.filter(m => m.userId === selectedUser);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: selectedUser,
      content: newMessage,
      timestamp: new Date(),
      isFromUser: false,
      status: 'sent',
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedUserMessages]);

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  // Show chat list on mobile when no user selected, or always show on desktop
  const showChatList = !isMobileView || !selectedUser;
  const showChatArea = !isMobileView || selectedUser;

  return (
    <div className="h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex h-full relative">
        {/* Chat List Sidebar */}
        <div className={`${
          isMobileView 
            ? 'absolute inset-0 z-20' 
            : 'w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700'
        } ${showChatList ? 'flex' : 'hidden'} flex-col bg-white dark:bg-gray-900`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-500" />
                Chats
              </h2>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {totalUnread}
                </span>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Tabs */}
            <div className="flex mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {[
                { key: 'all', label: 'All', count: chats.length },
                { key: 'unread', label: 'Unread', count: chats.filter(c => c.unreadCount > 0).length },
                { key: 'archived', label: 'Archived', count: chats.filter(c => c.isArchived).length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-1 px-3 rounded text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => {
              const user = users.find(u => u.id === chat.userId);
              if (!user) return null;

              return (
                <motion.div
                  key={chat.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedUser === chat.userId ? 'bg-red-50 dark:bg-red-900/20 border-r-2 border-r-red-500' : ''
                  }`}
                  onClick={() => handleSelectUser(chat.userId)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate flex items-center gap-1">
                          {user.name}
                          {chat.isPinned && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatLastMessageTime(chat.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {chat.lastMessage}
                        </p>
                        {chat.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${
          isMobileView 
            ? 'absolute inset-0 z-30' 
            : 'flex-1'
        } ${showChatArea ? 'flex' : 'hidden'} flex-col bg-white dark:bg-gray-900`}>
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Back button for mobile */}
                    {isMobileView && (
                      <button
                        onClick={handleBackToList}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    )}
                    <div className="relative">
                      <img
                        src={selectedUserData?.avatar}
                        alt={selectedUserData?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {selectedUserData?.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {selectedUserData?.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedUserData?.isOnline ? 'Online' : `Last seen ${selectedUserData?.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                <AnimatePresence>
                  {selectedUserMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isFromUser ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[75%] md:max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isFromUser
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        <p className="text-sm break-words">{message.content}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${
                          message.isFromUser ? 'text-gray-500' : 'text-red-100'
                        }`}>
                          <span className="text-xs">{formatTime(message.timestamp)}</span>
                          {!message.isFromUser && (
                            <div className="flex">
                              {message.status === 'sent' && <Clock className="w-3 h-3" />}
                              {message.status === 'delivered' && <Check className="w-3 h-3" />}
                              {message.status === 'read' && <CheckCheck className="w-3 h-3" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected - Only shown on desktop */
            !isMobileView && (
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Chat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a conversation to start messaging
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{users.length} contacts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{chats.length} chats</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
