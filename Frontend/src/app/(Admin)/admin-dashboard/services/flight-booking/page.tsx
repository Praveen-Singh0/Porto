'use client'
import GlassCard from '../../components/GlassCard';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';

export default function FlightBookingPage() {
  return (
    <div className="space-y-6">
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Flight Booking
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage flight bookings and travel services integration
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Destinations</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">150+</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Available destinations</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bookings</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total bookings</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customers</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">856</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Active customers</p>
          </GlassCard>
        </div>
      </div>
  );
}