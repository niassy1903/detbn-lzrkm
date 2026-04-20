import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/auth_context.dart';
import '../../context/data_context.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/member_layout.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  String _activeTab = 'INFO';
  bool _isSaving = false;

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    final user = auth.user;

    return MemberLayout(
      title: "Mon Profil",
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Profile Header Card
            Container(
              margin: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(48),
                border: Border.all(color: Colors.grey[100]!),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 40)],
              ),
              clipBehavior: Clip.antiAlias,
              child: Column(
                children: [
                  Container(
                    height: 160,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(colors: [Color(0xFF10B981), Colors.teal]),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 0),
                    child: Transform.translate(
                      offset: const Offset(0, -60),
                      child: Column(
                        children: [
                          Stack(
                            alignment: Alignment.bottomRight,
                            children: [
                              CircleAvatar(
                                radius: 80,
                                backgroundColor: Colors.white,
                                child: CircleAvatar(
                                  radius: 74,
                                  backgroundImage: NetworkImage(user?.avatar ?? "https://picsum.photos/seed/avatar/200/200"),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(color: const Color(0xFF10B981), shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 4)),
                                child: const Icon(Icons.camera_alt, color: Colors.white, size: 20),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                          Text(user?.name ?? '', style: GoogleFonts.blackHanSans(fontSize: 32)),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              _buildBadge(user?.role.name == 'ADMIN' ? 'Administrateur' : 'Membre Actif', const Color(0xFF10B981)),
                              const SizedBox(width: 8),
                              _buildBadge('Fayda', Colors.amber),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.calendar_today, size: 14, color: Colors.grey),
                              const SizedBox(width: 8),
                              Text("Membre depuis le ${user?.createdAt.toString().split(' ')[0] ?? ''}", style: const TextStyle(color: Colors.grey)),
                            ],
                          ),
                          const SizedBox(height: 32),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              ElevatedButton.icon(
                                onPressed: () => auth.logout(),
                                icon: const Icon(Icons.logout),
                                label: const Text("Déconnexion"),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.red[50],
                                  foregroundColor: Colors.red,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  elevation: 0,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Tabs
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                children: [
                  _buildTabButton('INFO', Icons.person, 'Infos'),
                  const SizedBox(width: 12),
                  _buildTabButton('SECURITY', Icons.shield, 'Sécurité'),
                  const SizedBox(width: 12),
                  _buildTabButton('PREFERENCES', Icons.settings, 'Réglages'),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Form Content
            if (_activeTab == 'INFO')
              Padding(
                padding: const EdgeInsets.all(24),
                child: Container(
                  padding: const EdgeInsets.all(40),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(48), border: Border.all(color: Colors.grey[100]!)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Informations Personnelles", style: GoogleFonts.blackHanSans(fontSize: 24)),
                      const SizedBox(height: 40),
                      _buildField("Prénom & Nom", user?.name ?? ''),
                      _buildField("Adresse Email", user?.email ?? ''),
                      _buildField("Téléphone", '+221 77 123 45 67'),
                      _buildField("Ville", 'Dakar'),
                      const SizedBox(height: 40),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          minimumSize: const Size(double.infinity, 60),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                        ),
                        child: const Text("Enregistrer les modifications", style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              ),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20), border: Border.all(color: color.withOpacity(0.2))),
      child: Text(text, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
    );
  }

  Widget _buildTabButton(String id, IconData icon, String label) {
    bool isSelected = _activeTab == id;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _activeTab = id),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF10B981) : Colors.grey[50],
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            children: [
              Icon(icon, color: isSelected ? Colors.white : Colors.grey),
              const SizedBox(height: 4),
              Text(label, style: TextStyle(color: isSelected ? Colors.white : Colors.grey, fontWeight: FontWeight.bold, fontSize: 10)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildField(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          TextFormField(
            initialValue: value,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.grey[50],
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
              contentPadding: const EdgeInsets.all(20),
            ),
          ),
        ],
      ),
    );
  }
}
