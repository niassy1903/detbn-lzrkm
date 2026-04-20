import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../context/auth_context.dart';
import 'package:google_fonts/google_fonts.dart';

class MemberLayout extends StatelessWidget {
  final Widget child;
  final String title;

  const MemberLayout({
    super.key,
    required this.child,
    this.title = "Espace Membre",
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50], 
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        iconTheme: const IconThemeData(color: Color(0xFF0F172A)),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                color: Color(0xFF0F172A), // Slate-900
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text(
              "Ansaroudine Dahira",
              style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/member/notifications'),
            icon: Stack(
              children: [
                const Icon(Icons.notifications_outlined),
                Positioned(
                  right: 0,
                  top: 0,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      drawer: const MemberSidebar(),
      body: child,
    );
  }
}

class MemberSidebar extends StatelessWidget {
  const MemberSidebar({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    final String currentRoute = ModalRoute.of(context)?.settings.name ?? '';

    final List<Map<String, dynamic>> menuItems = [
      { 'name': 'Tableau de Bord', 'path': '/member', 'icon': Icons.dashboard_rounded },
      { 'name': 'Mes Documents', 'path': '/member/documents', 'icon': Icons.file_copy_rounded },
      { 'name': 'Événements', 'path': '/member/events', 'icon': Icons.calendar_today_rounded },
      { 'name': 'Messagerie', 'path': '/member/messages', 'icon': Icons.message_rounded },
      { 'name': 'Notifications', 'path': '/member/notifications', 'icon': Icons.notifications_rounded },
      { 'name': 'Ma Participation', 'path': '/member/participation', 'icon': Icons.bar_chart_rounded },
      { 'name': 'Mon Profil', 'path': '/member/profile', 'icon': Icons.person_rounded },
    ];

    return Drawer(
      backgroundColor: Colors.white,
      child: Column(
        children: [
          // Header
          DrawerHeader(
            decoration: BoxDecoration(
              color: const Color(0xFF10B981).withOpacity(0.05),
              border: const Border(bottom: BorderSide(color: Color(0xFFF1F5F9))),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 64,
                  height: 64,
                  padding: const EdgeInsets.all(3),
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [Color(0xFF34D399), Color(0xFF10B981)],
                    ),
                  ),
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(32),
                      child: Image.network(
                        auth.user?.avatar ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  auth.user?.name ?? "Membre",
                  style: const TextStyle(
                    color: Color(0xFF0F172A),
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // Navigation
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              children: menuItems.map((item) {
                final bool isSelected = currentRoute == item['path'];
                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  child: ListTile(
                    onTap: () {
                      if (currentRoute != item['path']) {
                        Navigator.pushReplacementNamed(context, item['path']);
                      }
                    },
                      leading: Icon(
                        item['icon'],
                        color: isSelected ? const Color(0xFF10B981) : const Color(0xFF64748B),
                      ),
                    title: Text(
                      item['name'],
                      style: TextStyle(
                        color: isSelected ? const Color(0xFF10B981) : const Color(0xFF475569),
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        fontSize: 14,
                      ),
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    selected: isSelected,
                    selectedTileColor: const Color(0xFF10B981).withOpacity(0.05),
                  ),
                );
              }).toList(),
            ),
          ),

          // Footer Actions
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      auth.logout();
                      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
                    },
                    icon: const Icon(Icons.logout, size: 18),
                    label: const Text("DÉCONNEXION"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.red[400],
                      elevation: 0,
                      side: BorderSide(color: Colors.red[100]!),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      textStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  "Version 1.0.0",
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
