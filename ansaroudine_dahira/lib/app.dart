import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'context/auth_context.dart';
import 'context/data_context.dart';
import 'context/notification_context.dart';
import 'core/constant.dart';
import 'pages/public/home_page.dart';
import 'pages/public/about_page.dart';
import 'pages/public/activities_page.dart';
import 'pages/public/news_page.dart';
import 'pages/public/gallery_page.dart';
import 'pages/public/contact_page.dart';
import 'pages/public/login_page.dart';
import 'pages/legal/privacy_policy.dart';
import 'pages/legal/security_page.dart';
import 'pages/legal/usage_tips.dart';
import 'pages/member/dashboard.dart';
import 'pages/member/documents.dart';
import 'pages/member/events.dart';
import 'pages/member/messages.dart';
import 'pages/member/notifications.dart';
import 'pages/member/participation.dart';
import 'pages/member/profile.dart';
import 'pages/admin/dashboard.dart';
import 'pages/admin/documents.dart';
import 'pages/admin/events.dart';
import 'pages/admin/gallery.dart';
import 'pages/admin/members.dart';
import 'pages/admin/messages.dart';
import 'pages/admin/news.dart';
import 'pages/admin/notifications.dart';
import 'pages/admin/stats.dart';
import 'pages/admin/settings.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthContext()),
        ChangeNotifierProxyProvider<AuthContext, DataContext>(
          create: (context) => DataContext(),
          update: (context, auth, data) => data!..refreshData(auth.user?.role.name),
        ),
        ChangeNotifierProxyProvider<AuthContext, NotificationContext>(
          create: (context) => NotificationContext(),
          update: (context, auth, notifications) => notifications!..refreshNotifications(auth.isAuthenticated),
        ),
      ],
      child: MaterialApp(
        title: 'Ansaroudine Dahira',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF10B981)),
          useMaterial3: true,
          textTheme: const TextTheme(
            displayLarge: TextStyle(fontWeight: FontWeight.bold),
            displayMedium: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        home: const AuthWrapper(),
        routes: {
          '/home': (context) => const HomePage(),
          '/about': (context) => const AboutPage(),
          '/activities': (context) => const ActivitiesPage(),
          '/news': (context) => const NewsPage(),
          '/gallery': (context) => const GalleryPage(),
          '/contact': (context) => const ContactPage(),
          '/login': (context) => const LoginPage(),
          '/privacy': (context) => const PrivacyPolicyPage(),
          '/security': (context) => const SecurityPage(),
          '/tips': (context) => const UsageTipsPage(),
          '/member': (context) => const MemberDashboard(),
          '/member/documents': (context) => const DocumentsPage(),
          '/member/events': (context) => const MemberEventsPage(),
          '/member/messages': (context) => const MessagesPage(),
          '/member/notifications': (context) => const MemberNotifications(),
          '/member/participation': (context) => const ParticipationPage(),
          '/member/profile': (context) => const ProfilePage(),
          '/admin': (context) => const AdminDashboard(),
          '/admin/documents': (context) => const AdminDocuments(),
          '/admin/events': (context) => const AdminEvents(),
          '/admin/gallery': (context) => const AdminGallery(),
          '/admin/members': (context) => const AdminMembers(),
          '/admin/messages': (context) => const AdminMessages(),
          '/admin/news': (context) => const AdminNews(),
          '/admin/notifications': (context) => const AdminNotifications(),
          '/admin/stats': (context) => const AdminStats(),
          '/admin/settings': (context) => const AdminSettings(),
        },
      ),
    );
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    
    if (auth.isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    
    if (auth.isAuthenticated) {
      if (auth.user?.role == UserRole.ADMIN) return const AdminDashboard();
      return const MemberDashboard();
    }
    
    return const HomePage();
  }
}
