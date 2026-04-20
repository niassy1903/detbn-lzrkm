import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../context/auth_context.dart';
import 'package:google_fonts/google_fonts.dart';

class AdminLayout extends StatelessWidget {
  final Widget child;
  final String title;

  const AdminLayout({
    super.key,
    required this.child,
    this.title = "Backoffice",
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF020617), // Slate-950
      appBar: AppBar(
        backgroundColor: const Color(0xFF020617),
        elevation: 0,
        centerTitle: false,
        iconTheme: const IconThemeData(color: Colors.white),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text(
              "Gestion complète de votre Dahira",
              style: TextStyle(color: Color(0xFF64748B), fontSize: 10),
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A), // Slate-900
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF1E293B)),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              children: [
                Container(
                  width: 6,
                  height: 6,
                  decoration: const BoxDecoration(
                    color: Color(0xFF10B981),
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                const Text(
                  "En ligne",
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
      drawer: const AdminSidebar(),
      body: child,
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF10B981),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}

class AdminSidebar extends StatelessWidget {
  const AdminSidebar({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    final String currentRoute = ModalRoute.of(context)?.settings.name ?? '';

    final List<Map<String, dynamic>> menuItems = [
      { 'name': 'Dashboard', 'path': '/admin', 'icon': Icons.dashboard_rounded },
      { 'name': 'Membres', 'path': '/admin/members', 'icon': Icons.people_rounded },
      { 'name': 'Événements', 'path': '/admin/events', 'icon': Icons.calendar_today_rounded },
      { 'name': 'Actualités', 'path': '/admin/news', 'icon': Icons.newspaper_rounded },
      { 'name': 'Galerie', 'path': '/admin/gallery', 'icon': Icons.image_rounded },
      { 'name': 'Messages', 'path': '/admin/messages', 'icon': Icons.message_rounded },
      { 'name': 'Documents', 'path': '/admin/documents', 'icon': Icons.file_copy_rounded },
      { 'name': 'Notifications', 'path': '/admin/notifications', 'icon': Icons.notifications_rounded },
      { 'name': 'Statistiques', 'path': '/admin/stats', 'icon': Icons.bar_chart_rounded },
      { 'name': 'Paramètres', 'path': '/admin/settings', 'icon': Icons.settings_rounded },
    ];

    return Drawer(
      backgroundColor: const Color(0xFF020617),
      child: Column(
        children: [
          // Header
          DrawerHeader(
            decoration: const BoxDecoration(
              border: Border(bottom: BorderSide(color: Color(0xFF1E293B))),
            ),
            child: Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981),
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF10B981).withOpacity(0.2),
                        blurRadius: 10,
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Text(
                      "D",
                      style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  "AdminPanel",
                  style: GoogleFonts.blackHanSans(
                    color: Colors.white,
                    fontSize: 20,
                  ),
                ),
              ],
            ),
          ),

          // Navigation
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              children: [
                const Padding(
                  padding: EdgeInsets.only(left: 12, bottom: 8, top: 8),
                  child: Text(
                    "MENU PRINCIPAL",
                    style: TextStyle(
                      color: Color(0xFF475569),
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                ),
                ...menuItems.map((item) {
                  final bool isSelected = currentRoute == item['path'];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 4),
                    child: ListTile(
                      onTap: () {
                        if (currentRoute != item['path']) {
                          Navigator.pushReplacementNamed(context, item['path']);
                        }
                      },
                      leading: Icon(
                        item['icon'],
                        color: isSelected ? const Color(0xFF10B981) : const Color(0xFF64748B),
                        size: 20,
                      ),
                      title: Text(
                        item['name'],
                        style: TextStyle(
                          color: isSelected ? Colors.white : const Color(0xFF94A3B8),
                          fontSize: 14,
                          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      selected: isSelected,
                      selectedTileColor: const Color(0xFF10B981).withOpacity(0.1),
                      dense: true,
                    ),
                  );
                }),
              ],
            ),
          ),

          // User Profile
          Container(
            padding: const EdgeInsets.all(24),
            decoration: const BoxDecoration(
              border: Border(top: BorderSide(color: Color(0xFF1E293B))),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 20,
                      backgroundImage: NetworkImage(auth.user?.avatar ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'),
                      backgroundColor: const Color(0xFF10B981).withOpacity(0.1),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            auth.user?.name ?? "Admin",
                            style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                            overflow: TextOverflow.ellipsis,
                          ),
                          const Text(
                            "ADMINISTRATEUR",
                            style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () {
                      auth.logout();
                      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
                    },
                    icon: const Icon(Icons.logout, size: 16),
                    label: const Text("DÉCONNEXION"),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFF94A3B8),
                      side: const BorderSide(color: Color(0xFF1E293B)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      textStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
