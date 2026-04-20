import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class ActivitiesPage extends StatelessWidget {
  const ActivitiesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final activities = [
      {
        "title": "Hadratoul Juma",
        "desc": "Le grand rassemblement du vendredi soir. Un moment d'intense ferveur spirituelle, de zikr et de louanges au Prophète (PSL).",
        "icon": Icons.music_note,
        "tag": "Spiritualité",
        "image": "https://images.unsplash.com/photo-1519810755548-39cd217da494?auto=format&fit=crop&q=80&w=800"
      },
      {
        "title": "Wazifa Quotidienne",
        "desc": "Séances de zikr quotidiennes après le Fajr et l'Asr, piliers de la pratique Tidjane pour la purification du cœur.",
        "icon": Icons.star,
        "tag": "Discipline",
        "image": "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800"
      },
      {
        "title": "Conférences & Daara",
        "desc": "Enseignements sur la vie de Baye Niass, le Coran et les sciences islamiques adaptés au milieu scolaire.",
        "icon": Icons.school,
        "tag": "Éducation",
        "image": "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800"
      },
      {
        "title": "Actions Sociales",
        "desc": "Soutien aux élèves en difficulté, journées de nettoyage et entraide communautaire au sein du lycée.",
        "icon": Icons.favorite,
        "tag": "Solidarité",
        "image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
      }
    ];

    return PublicLayout(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Header Section
            Container(
              color: Colors.grey[50],
              width: double.infinity,
              padding: const EdgeInsets.only(top: 120, bottom: 60, left: 24, right: 24),
              child: Column(
                children: [
                  const Text(
                    "Notre Vie Communautaire",
                    style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    "Activités & Rayonnement.",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.blackHanSans(fontSize: 48, height: 1.1),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Découvrez les moments forts qui rythment la vie de notre Dahira, entre dévotion spirituelle et engagement citoyen.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 18, height: 1.6),
                  ),
                ],
              ),
            ),

            // Activities List
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
              child: Column(
                children: activities.map((act) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 40),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(40),
                      child: Container(
                        height: 500,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: NetworkImage(act["image"] as String),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Stack(
                          children: [
                            Container(
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.bottomCenter,
                                  end: Alignment.topCenter,
                                  colors: [
                                    Colors.black.withOpacity(0.9),
                                    Colors.black.withOpacity(0.4),
                                    Colors.transparent,
                                  ],
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(40),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF10B981).withOpacity(0.2),
                                          borderRadius: BorderRadius.circular(20),
                                          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
                                        ),
                                        child: Text(
                                          act["tag"] as String,
                                          style: const TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 10),
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      Container(
                                        padding: const EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          color: Colors.white10,
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: Icon(act["icon"] as IconData, color: const Color(0xFF10B981), size: 20),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 24),
                                  Text(
                                    act["title"] as String,
                                    style: GoogleFonts.blackHanSans(color: Colors.white, fontSize: 32),
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    act["desc"] as String,
                                    style: const TextStyle(color: Colors.white70, fontSize: 16, height: 1.5),
                                  ),
                                  const SizedBox(height: 24),
                                  Row(
                                    children: const [
                                      Text(
                                        "EN SAVOIR PLUS",
                                        style: TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold, fontSize: 12, letterSpacing: 2),
                                      ),
                                      SizedBox(width: 12),
                                      Icon(Icons.arrow_forward, color: Color(0xFF34D399), size: 16),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            // Calendar Section
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(60),
                child: Container(
                  padding: const EdgeInsets.all(40),
                  color: const Color(0xFF10B981),
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white10,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: const [
                            Icon(Icons.calendar_today, color: Colors.white, size: 16),
                            SizedBox(width: 8),
                            Text("Agenda 2026", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 32),
                      Text(
                        "Ne manquez aucun moment fort.",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.blackHanSans(color: Colors.white, fontSize: 32),
                      ),
                      const SizedBox(height: 24),
                      const Text(
                        "Consultez notre calendrier complet pour rester informé des prochaines conférences, séances de zikr et événements sociaux.",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white70, fontSize: 16),
                      ),
                      const SizedBox(height: 48),
                      Column(
                        children: [
                          ElevatedButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.calendar_month),
                            label: const Text("Voir le Calendrier"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: const Color(0xFF065F46),
                              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                              minimumSize: const Size(double.infinity, 0),
                            ),
                          ),
                          const SizedBox(height: 16),
                          OutlinedButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.flash_on),
                            label: const Text("S'inscrire"),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: Colors.white38),
                              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                              minimumSize: const Size(double.infinity, 0),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Quote Section
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.1),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.star, color: Color(0xFF10B981), size: 40),
                  ),
                  const SizedBox(height: 40),
                  Text(
                    "\"L'activité la plus noble est celle qui rapproche le serviteur de son Créateur tout en étant utile à ses semblables.\"",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.libreBaskerville(fontSize: 24, fontStyle: FontStyle.italic),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Sagesse de la Fayda",
                    style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, letterSpacing: 4),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
