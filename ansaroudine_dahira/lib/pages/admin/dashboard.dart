import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    
    final stats = [
      {'label': 'Membres Totaux', 'value': data.members.length.toString(), 'change': '+12%', 'icon': Icons.people, 'color': const Color(0xFF10B981)},
      {'label': 'Événements', 'value': data.events.length.toString(), 'change': '+2', 'icon': Icons.calendar_today, 'color': Colors.blue},
      {'label': 'Articles News', 'value': data.news.length.toString(), 'change': '+5%', 'icon': Icons.newspaper, 'color': Colors.amber},
      {'label': 'Photos Galerie', 'value': data.gallery.length.toString(), 'change': 'Nouveau', 'icon': Icons.image, 'color': Colors.purple},
    ];

    return AdminLayout(
      title: "Dashboard",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick Actions & Search
            Wrap(
              spacing: 16,
              runSpacing: 16,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                SizedBox(
                  width: MediaQuery.of(context).size.width > 600 ? 300 : double.infinity,
                  child: TextField(
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: "Rechercher...",
                      hintStyle: const TextStyle(color: Color(0xFF64748B)),
                      prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                      filled: true,
                      fillColor: const Color(0xFF1E293B),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                    ),
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.download, color: Colors.white),
                      style: IconButton.styleFrom(backgroundColor: const Color(0xFF1E293B), padding: const EdgeInsets.all(16)),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton.icon(
                      onPressed: () => Navigator.pushNamed(context, '/admin/events'),
                      icon: const Icon(Icons.add, size: 18),
                      label: const Text("Événement"),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                      ),
                    ),
                  ],
                ),
              ],
            ),

            const SizedBox(height: 40),

            // Stats Grid
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: MediaQuery.of(context).size.width > 600 ? 4 : 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                childAspectRatio: 1.0,
              ),
              itemCount: stats.length,
              itemBuilder: (context, index) {
                final stat = stats[index];
                final color = stat['color'] as Color;
                return Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(32),
                    border: Border.all(color: Colors.white10),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Flexible(
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                              child: Icon(stat['icon'] as IconData, color: color, size: 20),
                            ),
                          ),
                          const SizedBox(width: 4),
                          Flexible(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                              child: Text(stat['change'] as String, style: const TextStyle(color: Color(0xFF10B981), fontSize: 9, fontWeight: FontWeight.bold), overflow: TextOverflow.ellipsis),
                            ),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(stat['label'] as String, style: const TextStyle(color: Color(0xFF64748B), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1.0), overflow: TextOverflow.ellipsis),
                          const SizedBox(height: 2),
                          FittedBox(
                            fit: BoxFit.scaleDown,
                            child: Text(stat['value'] as String, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w900)),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),

            const SizedBox(height: 40),

            // Recent Members
            Container(
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(32),
                border: Border.all(color: Colors.white10),
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(24),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text("Derniers Membres", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                        TextButton(onPressed: () => Navigator.pushNamed(context, '/admin/members'), child: const Text("Voir tout", style: TextStyle(color: Color(0xFF10B981)))),
                      ],
                    ),
                  ),
                  const Divider(color: Colors.white10, height: 1),
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: data.members.take(4).length,
                    separatorBuilder: (context, index) => const Divider(color: Colors.white10, height: 1),
                    itemBuilder: (context, index) {
                      final member = data.members[index];
                      // Ensure avatar is a string and handle it properly
                      final String? avatarUrl = member.avatar is String ? member.avatar : null;
                      final String memberName = member.name.toString();
                      final String memberEmail = member.email.toString();

                      return ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                        leading: CircleAvatar(
                          backgroundImage: NetworkImage(
                            avatarUrl != null && avatarUrl.isNotEmpty
                                ? (avatarUrl.startsWith('http') ? avatarUrl : 'https://backend-bjzg.onrender.com$avatarUrl')
                                : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(memberName)}&background=10B981&color=fff',
                          ),
                          backgroundColor: const Color(0xFF64748B),
                        ),
                        title: Text(memberName, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                        subtitle: Text(memberEmail, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                        trailing: const Icon(Icons.more_vert, color: Color(0xFF64748B)),
                      );
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 40),

            // System Activity
            const Text("Activité Système", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 20)),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(32),
                border: Border.all(color: Colors.white10),
              ),
              child: Column(
                children: [
                  _buildActivityItem('Événement créé', 'Grande Conférence', 'Il y a 10 min', const Color(0xFF10B981)),
                  _buildActivityItem('Nouveau membre', 'Ousmane Diop a rejoint', 'Il y a 1h', Colors.blue),
                  _buildActivityItem('Article publié', 'Sagesse de la Fayda', 'Il y a 3h', Colors.amber),
                ],
              ),
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(String title, String desc, String time, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 12,
            height: 12,
            margin: const EdgeInsets.only(top: 4),
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 24),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                Text(desc, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                const SizedBox(height: 4),
                Text(time.toUpperCase(), style: const TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
