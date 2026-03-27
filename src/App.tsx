import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import MemberLayout from './layouts/MemberLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Activities from './pages/public/Activities';
import News from './pages/public/News';
import Gallery from './pages/public/Gallery';
import MemberDashboard from './pages/member/Dashboard';
import MemberEvents from './pages/member/Events';
import MemberNotifications from './pages/member/Notifications';
import MemberProfile from './pages/member/Profile';
import Participation from './pages/member/Participation';
import Messages from './pages/member/Messages';
import Documents from './pages/member/Documents';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminEvents from './pages/admin/Events';
import AdminNews from './pages/admin/News';
import AdminGallery from './pages/admin/Gallery';
import AdminMessages from './pages/admin/Messages';
import AdminDocuments from './pages/admin/Documents';
import AdminNotifications from './pages/admin/Notifications';
import AdminStats from './pages/admin/Stats';
import AdminSettings from './pages/admin/Settings';

// Guards
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'ADMIN' | 'MEMBER' }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Member Routes */}
      <Route path="/member" element={
        <ProtectedRoute role="MEMBER">
          <MemberLayout />
        </ProtectedRoute>
      }>
        <Route index element={<MemberDashboard />} />
        <Route path="events" element={<MemberEvents />} />
        <Route path="participation" element={<Participation />} />
        <Route path="messages" element={<Messages />} />
        <Route path="documents" element={<Documents />} />
        <Route path="profile" element={<MemberProfile />} />
        <Route path="notifications" element={<MemberNotifications />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<AdminMembers />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="stats" element={<AdminStats />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

import { DataProvider } from './context/DataContext';

// ... existing code ...

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
