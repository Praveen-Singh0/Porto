import { ReactNode } from 'react';
import DashboardLayout from './DashboardLayout';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

  return (
    <DashboardLayout >
      {children}
    </DashboardLayout>
  );
} 