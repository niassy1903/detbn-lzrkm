import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/auth_context.dart';
import '../../context/data_context.dart';
import 'package:intl/intl.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../types.dart';
import '../../layouts/member_layout.dart';

class MemberDashboard extends StatelessWidget {
  const MemberDashboard({super.key});

  Widget _buildImage(String? imagePath, {double? width, double? height}) {
    if (imagePath == null || imagePath.isEmpty) {
      return Container(
        width: width,
        height: height,
        color: Colors.grey[100],
        child: const Icon(Icons.image_outlined, color: Colors.grey),
      );
    }

    if (imagePath.startsWith('data:image')) {
      try {
        final base64String = imagePath.split(',').last;
        return Image.memory(
          base64Decode(base64String),
          width: width,
          height: height,
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) => _buildImage(null, width: width, height: height),
        );
      } catch (e) {
        return _buildImage(null, width: width, height: height);
      }
    }

    return Image.network(
      imagePath,
      width: width,
      height: height,
      fit: BoxFit.cover,
      errorBuilder: (context, error, stackTrace) => _buildImage(null, width: width, height: height),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    final data = Provider.of<DataContext>(context);
    final user = auth.user;

    final userMessages = data.messages.length;

    return MemberLayout(
      title: "Tableau de Bord",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Header
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(32),
                border: Border.all(color: Colors.grey[100]!),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.02),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  )
                ],
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Stack(
                        children: [
                          CircleAvatar(
                            radius: 35,
                            backgroundColor: const Color(0xFF10B981).withOpacity(0.1),
                            child: user?.avatar != null && user!.avatar!.isNotEmpty
                                ? ClipOval(child: _buildImage(user.avatar, width: 70, height: 70))
                                : Text(user?.name[0].toUpperCase() ?? 'U', style: const TextStyle(fontSize: 24, color: Color(0xFF10B981))),
                          ),
                          Positioned(
                            bottom: 0,
                            right: 0,
                            child: Container(
                              width: 20,
                              height: 20,
                              decoration: BoxDecoration(
                                color: const Color(0xFF10B981),
                                border: Border.all(color: Colors.white, width: 3),
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Assalamou Alaykoum,",
                              style: GoogleFonts.poppins(fontSize: 14, color: Colors.grey),
                            ),
                            Text(
                              "${user?.name.split(' ')[0]} !",
                              style: GoogleFonts.blackHanSans(fontSize: 22, color: Colors.black87),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.05),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.access_time, color: Color(0xFF10B981), size: 16),
                        SizedBox(width: 8),
                        Flexible(
                          child: Text(
                            "Dernière activité : Aujourd'hui",
                            style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 12),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),

            // Stats Grid
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.3,
              children: [
                _buildStatCard("Participation", "85%", Icons.trending_up, const Color(0xFF10B981)),
                _buildStatCard("Événements", data.events.length.toString(), Icons.calendar_today, Colors.blue),
                _buildStatCard("Documents", data.documents.length.toString(), Icons.file_copy, Colors.amber),
                _buildStatCard("Messages", userMessages.toString(), Icons.notifications, Colors.purple),
              ],
            ),

            const SizedBox(height: 32),

            // Main Content Area
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Événements", style: GoogleFonts.blackHanSans(fontSize: 18)),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/member/events'),
                  child: const Text("Voir tout", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (data.events.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.grey[50],
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.grey[200]!),
                ),
                child: const Center(child: Text("Aucun événement à venir.", style: TextStyle(color: Colors.grey))),
              )
            else
              Column(
                children: data.events.take(3).map((event) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.grey[100]!),
                    ),
                    child: Row(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: _buildImage(event.image, width: 50, height: 50),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(event.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14), overflow: TextOverflow.ellipsis),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(Icons.calendar_month, size: 12, color: Colors.grey),
                                  const SizedBox(width: 4),
                                  Text(DateFormat('dd/MM/yyyy').format(event.date), style: const TextStyle(color: Colors.grey, fontSize: 11)),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const Icon(Icons.chevron_right, size: 20, color: Colors.grey),
                      ],
                    ),
                  );
                }).toList(),
              ),

            const SizedBox(height: 32),
            Text("Actualités", style: GoogleFonts.blackHanSans(fontSize: 18)),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.grey[100]!),
              ),
              child: Column(
                children: [
                   ...data.news.take(3).map((item) => Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(width: 6, height: 6, margin: const EdgeInsets.only(top: 6), decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle)),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), maxLines: 1, overflow: TextOverflow.ellipsis),
                              Text(DateFormat('dd MMM yyyy').format(item.date), style: const TextStyle(color: Colors.grey, fontSize: 11)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  )),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/news'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[50],
                      foregroundColor: Colors.grey[700],
                      minimumSize: const Size(double.infinity, 48),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      elevation: 0,
                    ),
                    child: const Text("Toutes les actualités", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16), // Réduit de 24 à 16
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24), // Réduit de 32 à 24
        border: Border.all(color: Colors.grey[100]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween, // Utilise l'espace de manière équilibrée
        children: [
          Container(
            padding: const EdgeInsets.all(8), // Réduit de 12 à 8
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 20), // Réduit de 24 à 20
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
              Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)), // Réduit de 24 à 20
            ],
          ),
        ],
      ),
    );
  }
}
