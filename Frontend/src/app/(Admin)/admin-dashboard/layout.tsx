import { ReactNode } from 'react';
import DashboardLayout from './DashboardLayout';
import { AuthProvider } from '@/app/context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

  return (
    <AuthProvider>
    <DashboardLayout >
      {children}
    </DashboardLayout>
    </AuthProvider>
  );
} 