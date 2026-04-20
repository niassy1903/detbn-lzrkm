import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    final values = [
      { "icon": Icons.book, "title": "Éducation", "desc": "Formez des esprits brillants capables d'allier savoir moderne et sagesse spirituelle." },
      { "icon": Icons.favorite, "title": "Amour & Paix", "desc": "Cultivez l'amour du Prophète (PSL) et de son prochain selon les enseignements de la Fayda." },
      { "icon": Icons.public, "title": "Engagement", "desc": "Servir la communauté et porter haut les valeurs de l'Islam dans notre environnement scolaire." },
    ];

    final milestones = [
      { "year": "2015", "title": "Les Prémices", "desc": "Un petit groupe d'élèves passionnés décide de se réunir pour partager la Fayda au lycée." },
      { "year": "2018", "title": "Reconnaissance", "desc": "L'Ansaroudine devient une référence au sein du Lycée Zone de Recasement." },
      { "year": "2022", "title": "Expansion", "desc": "Multiplication des activités sociales et spirituelles touchant des centaines d'élèves." },
      { "year": "2026", "title": "Digitalisation", "desc": "Lancement de notre portail officiel pour une gestion moderne et connectée." },
    ];

    return PublicLayout(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            Stack(
              children: [
                Container(
                  height: 400,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/niass6.jpeg'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Container(
                  height: 400,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.teal[900]!.withOpacity(0.8),
                        Colors.teal[900]!.withOpacity(1.0),
                      ],
                    ),
                  ),
                ),
                Positioned.fill(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            "Notre Identité",
                            style: TextStyle(
                              color: Color(0xFF34D399),
                              fontWeight: FontWeight.bold,
                              letterSpacing: 4,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            "Porteurs de Lumière.",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.blackHanSans(
                              color: Colors.white,
                              fontSize: 48,
                              height: 1.1,
                            ),
                          ),
                          const SizedBox(height: 24),
                          const Text(
                            "L'Ansaroudine est bien plus qu'un Dahira. C'est une famille d'élèves unis par la foi en Allah et l'amour de Cheikh Al Islam El Hadji Ibrahim Niass.",
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.white70, fontSize: 18, height: 1.6),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),

            // Baye Niass Section
            Container(
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  const Text(
                    "Le Guide Spirituel",
                    style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    "Cheikh Al Islam El Hadji Ibrahim Niass",
                    style: GoogleFonts.blackHanSans(fontSize: 28),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Né en 1900 à Taïba Niassène, Baye Niass a consacré sa vie à l'enseignement de l'Islam et de la Tidjaniya. Sa \"Fayda\" (l'Inondation spirituelle) a touché des millions de cœurs à travers le monde, prônant la connaissance directe d'Allah (Ma'rifa) et l'excellence humaine.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 16, height: 1.6),
                  ),
                  const SizedBox(height: 32),
                  Container(
                    padding: const EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(40),
                      border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
                    ),
                    child: Text(
                      "\"Mon seul but est de faire connaître Allah à Ses créatures et de les unir dans Son amour.\"",
                      textAlign: TextAlign.center,
                      style: GoogleFonts.libreBaskerville(
                        fontSize: 18,
                        fontStyle: FontStyle.italic,
                        color: const Color(0xFF065F46),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Values Section
            Container(
              color: Colors.grey[50],
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  const Text("Nos Piliers", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text("Valeurs Fondamentales", style: GoogleFonts.blackHanSans(fontSize: 28)),
                  const SizedBox(height: 60),
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: values.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 24),
                    itemBuilder: (context, index) {
                      return Container(
                        padding: const EdgeInsets.all(32),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(40),
                          boxShadow: [
                            BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 20),
                          ],
                        ),
                        child: Column(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(20),
                              decoration: BoxDecoration(
                                color: const Color(0xFF10B981).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(24),
                              ),
                              child: Icon(values[index]["icon"] as IconData, color: const Color(0xFF10B981), size: 32),
                            ),
                            const SizedBox(height: 16),
                            Text(values[index]["title"] as String, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 12),
                            Text(
                              values[index]["desc"] as String,
                              textAlign: TextAlign.center,
                              style: const TextStyle(color: Colors.grey, fontSize: 16, height: 1.4),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),

            // Milestone History
            Container(
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  const Text("Le Chemin Parcouru", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text("Notre Histoire", style: GoogleFonts.blackHanSans(fontSize: 28)),
                  const SizedBox(height: 60),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: milestones.length,
                    itemBuilder: (context, index) {
                      return IntrinsicHeight(
                        child: Row(
                          children: [
                            SizedBox(
                              width: 60,
                              child: Column(
                                children: [
                                  Container(
                                    width: 40,
                                    height: 40,
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF10B981),
                                      borderRadius: BorderRadius.circular(20),
                                      border: Border.all(color: Colors.white, width: 4),
                                      boxShadow: [const BoxShadow(color: Colors.black12, blurRadius: 10)],
                                    ),
                                    child: Center(
                                      child: Text(
                                        "${index + 1}",
                                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                  if (index != milestones.length - 1)
                                    Expanded(child: Container(width: 2, color: const Color(0xFF10B981).withOpacity(0.2))),
                                ],
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.only(bottom: 40),
                                child: Container(
                                  padding: const EdgeInsets.all(24),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(32),
                                    border: Border.all(color: Colors.grey[100]!),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        milestones[index]["year"]!,
                                        style: GoogleFonts.libreBaskerville(
                                          fontSize: 32,
                                          color: const Color(0xFF10B981).withOpacity(0.2),
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(milestones[index]["title"]!, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                                      const SizedBox(height: 8),
                                      Text(milestones[index]["desc"]!, style: const TextStyle(color: Colors.grey, height: 1.4)),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
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
