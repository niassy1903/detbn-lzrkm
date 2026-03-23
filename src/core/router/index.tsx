import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import MemberLayout from '../../layouts/MemberLayout';
import AdminLayout from '../../layouts/AdminLayout';
import ProtectedRoute from '../guards/ProtectedRoute';
import { UserRole } from '../constants';

// Pages
import HomePage from '../../pages/public/HomePage';
import LoginPage from '../../pages/public/LoginPage';
import AboutPage from '../../pages/public/AboutPage';
import ActivitiesPage from '../../pages/public/ActivitiesPage';
import ContactPage from '../../pages/public/ContactPage';
import NewsPage from '../../pages/public/NewsPage';
import GalleryPage from '../../pages/public/GalleryPage';
import MemberDashboard from '../../pages/member/Dashboard';
import EventsPage from '../../pages/member/EventsPage';
import MessagesPage from '../../pages/member/MessagesPage';
import DocumentsPage from '../../pages/member/DocumentsPage';
import NotificationsPage from '../../pages/member/NotificationsPage';
import ProfilePage from '../../pages/member/ProfilePage';
import AdminDashboard from '../../pages/admin/Dashboard';
import MembersPage from '../../pages/admin/MembersPage';
import EventsManagement from '../../pages/admin/EventsManagement';
import NewsManagement from '../../pages/admin/NewsManagement';
import GalleryManagement from '../../pages/admin/GalleryManagement';
import MessagesAdmin from '../../pages/admin/MessagesAdmin';
import DocumentsAdmin from '../../pages/admin/DocumentsAdmin';
import StatsPage from '../../pages/admin/StatsPage';
import SettingsPage from '../../pages/admin/SettingsPage';
import FinancePage from '../../pages/admin/FinancePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'activities', element: <ActivitiesPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
    ]
  },
  {
    path: '/member',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.MEMBER, UserRole.ADMIN]}>
        <MemberLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MemberDashboard /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'members', element: <MembersPage /> },
      { path: 'events', element: <EventsManagement /> },
      { path: 'news', element: <NewsManagement /> },
      { path: 'gallery', element: <GalleryManagement /> },
      { path: 'messages', element: <MessagesAdmin /> },
      { path: 'documents', element: <DocumentsAdmin /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'stats', element: <StatsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
