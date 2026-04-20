import 'package:flutter/material.dart';
import '../components/common/public_navbar.dart';
import '../components/common/logo.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../context/auth_context.dart';

class PublicLayout extends StatelessWidget {
  final Widget child;
  final bool showNavbar;

  const PublicLayout({
    super.key,
    required this.child,
    this.showNavbar = true,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      drawer: const PublicSidebar(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu_rounded, color: Color(0xFF0F172A)),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        title: Row(
          children: [
            const DahiraLogo(size: 32),
            const SizedBox(width: 12),
            Text(
              "Ansaroudine",
              style: GoogleFonts.blackHanSans(
                color: const Color(0xFF0F172A),
                fontSize: 18,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded, color: Color(0xFF64748B)),
            onPressed: () => Navigator.pushNamed(context, '/notifications'),
          ),
        ],
      ),
      body: child,
      bottomNavigationBar: showNavbar ? const PublicNavbar() : null,
    );
  }
}

class PublicSidebar extends StatelessWidget {
  const PublicSidebar({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    const Color emerald = Color(0xFF10B981);

    final List<Map<String, dynamic>> menuItems = [
      {'name': 'Accueil', 'path': '/home', 'icon': Icons.home_rounded},
      {'name': 'À Propos', 'path': '/about', 'icon': Icons.info_rounded},
      {'name': 'Activités', 'path': '/activities', 'icon': Icons.calendar_today_rounded},
      {'name': 'Actualités', 'path': '/news', 'icon': Icons.newspaper_rounded},
      {'name': 'Galerie', 'path': '/gallery', 'icon': Icons.image_rounded},
      {'name': 'Contact', 'path': '/contact', 'icon': Icons.mail_rounded},
    ];

    final List<Map<String, dynamic>> legalItems = [
      {'name': 'Sécurité', 'path': '/security', 'icon': Icons.shield_rounded},
      {'name': 'Conseils', 'path': '/tips', 'icon': Icons.lightbulb_rounded},
      {'name': 'Confidentialité', 'path': '/privacy', 'icon': Icons.lock_rounded},
    ];

    return Drawer(
      child: Column(
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color(0xFF0F172A),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const DahiraLogo(size: 60),
                  const SizedBox(height: 12),
                  Text(
                    "ANSAROUDINE",
                    style: GoogleFonts.blackHanSans(color: Colors.white, fontSize: 20),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                ...menuItems.map((item) {
                  return ListTile(
                    leading: Icon(item['icon'], color: const Color(0xFF64748B)),
                    title: Text(
                      item['name'],
                      style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0F172A)),
                    ),
                    onTap: () {
                      Navigator.pop(context); // Ferme le drawer
                      Navigator.pushNamed(context, item['path']);
                    },
                  );
                }).toList(),
                const Divider(),
                const Padding(
                  padding: EdgeInsets.only(left: 16, top: 16, bottom: 8),
                  child: Text(
                    "LÉGAL & SÉCURITÉ",
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey,
                      letterSpacing: 1.5,
                    ),
                  ),
                ),
                ...legalItems.map((item) {
                  return ListTile(
                    leading: Icon(item['icon'], color: const Color(0xFF64748B), size: 20),
                    title: Text(
                      item['name'],
                      style: const TextStyle(fontSize: 14, color: Color(0xFF1E293B)),
                    ),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, item['path']);
                    },
                  );
                }).toList(),
              ],
            ),
          ),
          const Divider(),
          ListTile(
            leading: Icon(
              auth.isAuthenticated ? Icons.dashboard_rounded : Icons.login_rounded,
              color: emerald,
            ),
            title: Text(
              auth.isAuthenticated ? 'Espace Membre' : 'Connexion',
              style: const TextStyle(fontWeight: FontWeight.bold, color: emerald),
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, auth.isAuthenticated 
                ? (auth.isAdmin ? '/admin' : '/member') 
                : '/login');
            },
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
