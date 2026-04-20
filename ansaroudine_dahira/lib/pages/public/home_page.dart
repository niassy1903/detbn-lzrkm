import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final quotes = [
      {
        "text": "Le savoir est la vie de l'âme et la lumière de l'esprit. Cherchez-le avec ardeur et humilité.",
        "author": "Cheikh Al Islam El Hadji Ibrahim Niass"
      },
      {
        "text": "La Tidjaniya n'est pas une simple confrérie, c'est un chemin de pureté vers la présence divine.",
        "author": "Cheikh Al Islam El Hadji Ibrahim Niass"
      },
      {
        "text": "Soyez des modèles de droiture, de paix et d'amour pour toute l'humanité.",
        "author": "Cheikh Al Islam El Hadji Ibrahim Niass"
      }
    ];

    return PublicLayout(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Hero Section
            Stack(
              children: [
                Container(
                  height: MediaQuery.of(context).size.height * 0.9,
                  width: double.infinity,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/niass5.jpeg'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Container(
                  height: MediaQuery.of(context).size.height * 0.9,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withOpacity(0.4),
                        const Color(0xFF064E3B).withOpacity(0.9),
                      ],
                    ),
                  ),
                ),
                Positioned.fill(
                  child: SafeArea(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Spacer(flex: 2),
                          // Badge Animé
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(30),
                              border: Border.all(color: Colors.white.withOpacity(0.2)),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: const [
                                Icon(Icons.auto_awesome, color: Color(0xFF10B981), size: 14),
                                SizedBox(width: 8),
                                Text(
                                  "BIENVENUE CHEZ ANSAROUDINE",
                                  style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 24),
                          // Titre Dynamic & Artistique (Ultra Pop)
                          FittedBox(
                            fit: BoxFit.scaleDown,
                            child: Column(
                              children: [
                                RichText(
                                  textAlign: TextAlign.center,
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: "La ",
                                        style: GoogleFonts.blackHanSans(
                                          fontSize: 35,
                                          color: Colors.white.withOpacity(0.9),
                                          letterSpacing: 1,
                                        ),
                                      ),
                                      TextSpan(
                                        text: "Plume",
                                        style: GoogleFonts.carattere(
                                          fontSize: 100,
                                          color: const Color(0xFF10B981),
                                          shadows: [
                                            Shadow(
                                              color: const Color(0xFF10B981).withOpacity(0.8),
                                              blurRadius: 25,
                                            ),
                                          ],
                                        ),
                                      ),
                                      TextSpan(
                                        text: " & le\n",
                                        style: GoogleFonts.blackHanSans(
                                          fontSize: 35,
                                          color: Colors.white.withOpacity(0.9),
                                        ),
                                      ),
                                      TextSpan(
                                        text: "Chapelet",
                                        style: GoogleFonts.carattere(
                                          fontSize: 100,
                                          color: const Color(0xFF34D399),
                                          shadows: [
                                            Shadow(
                                              color: const Color(0xFF34D399).withOpacity(0.8),
                                              blurRadius: 25,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 10),
                                // Barre décorative animée (visuelle)
                                Container(
                                  height: 3,
                                  width: 120,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    gradient: const LinearGradient(
                                      colors: [Colors.transparent, Color(0xFF10B981), Colors.transparent],
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 15),
                                Text(
                                  "POUR UN AVENIR PROSPÈRE",
                                  style: GoogleFonts.inter(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w900,
                                    color: Colors.white,
                                    letterSpacing: 6,
                                    shadows: [
                                      Shadow(color: Colors.black.withOpacity(0.5), blurRadius: 10)
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 40),
                          // Boutons Pop avec dégradé et ombre
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Expanded(
                                child: Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(18),
                                    boxShadow: [
                                      BoxShadow(
                                        color: const Color(0xFF10B981).withOpacity(0.4),
                                        blurRadius: 15,
                                        offset: const Offset(0, 8),
                                      ),
                                    ],
                                  ),
                                  child: ElevatedButton(
                                    onPressed: () => Navigator.pushNamed(context, '/login'),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF10B981),
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(vertical: 22),
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                                      elevation: 0,
                                    ),
                                    child: const Text("REJOINDRE", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.5)),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 15),
                              Expanded(
                                child: OutlinedButton(
                                  onPressed: () => Navigator.pushNamed(context, '/about'),
                                  style: OutlinedButton.styleFrom(
                                    side: const BorderSide(color: Colors.white, width: 2.5),
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(vertical: 22),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                                    backgroundColor: Colors.white.withOpacity(0.05),
                                  ),
                                  child: const Text("HISTOIRE", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.5)),
                                ),
                              ),
                            ],
                          ),
                          const Spacer(flex: 3),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),

            // Sagesse Section
            Container(
              color: Colors.grey[50],
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  const Text(
                    "LUMIÈRES DE LA FAYDA",
                    style: TextStyle(
                      color: Color(0xFF10B981),
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2.5,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    "Sagesse de Baye Niass",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.blackHanSans(
                      fontSize: 36,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    width: 60,
                    height: 5,
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981),
                      borderRadius: BorderRadius.circular(2.5),
                    ),
                  ),
                  const SizedBox(height: 60),
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: quotes.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 32),
                    itemBuilder: (context, index) {
                      return Container(
                        padding: const EdgeInsets.all(32),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(32),
                          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.1)),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF064E3B).withOpacity(0.06),
                              blurRadius: 30,
                              offset: const Offset(0, 15),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.format_quote_rounded, color: Color(0xFF10B981), size: 56),
                            const SizedBox(height: 8),
                            Text(
                              "\"${quotes[index]['text']}\"",
                              style: GoogleFonts.libreBaskerville(
                                fontSize: 19,
                                fontStyle: FontStyle.italic,
                                color: const Color(0xFF1E293B),
                                height: 1.7,
                              ),
                            ),
                            const SizedBox(height: 32),
                            Row(
                              children: [
                                Container(width: 40, height: 2, color: const Color(0xFF10B981)),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Text(
                                    quotes[index]['author']!.toUpperCase(),
                                    style: GoogleFonts.inter(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w800,
                                      color: const Color(0xFF10B981),
                                      letterSpacing: 2,
                                    ),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),

            // Tidjanisme Section
            Container(
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(40),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 30,
                          offset: const Offset(0, 20),
                        )
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(40),
                      child: Image.asset('assets/niass3.jpeg', fit: BoxFit.cover),
                    ),
                  ),
                  const SizedBox(height: 60),
                  const Text(
                    "NOTRE IDENTITÉ",
                    style: TextStyle(
                      color: Color(0xFF10B981),
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2.5,
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    "Le Tidjanisme & la Fayda",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.blackHanSans(
                      fontSize: 36,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Notre Dahira s'inscrit dans la lignée de la Fayda Tidjaniya, un mouvement de renouveau spirituel initié par Cheikh Ibrahima Niass. Nous prônons l'excellence académique alliée à une profonde spiritualité.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Color(0xFF64748B), fontSize: 17, height: 1.8),
                  ),
                  const SizedBox(height: 60),
                  _buildIdentityItem(Icons.auto_stories_rounded, "Éducation Spirituelle", "Cours de Tarbiya et de connaissance de soi approfondis."),
                  _buildIdentityItem(Icons.groups_rounded, "Fraternité Sacrée", "Unir les cœurs dans l'amour pur de Dieu et du Prophète (SAW)."),
                  _buildIdentityItem(Icons.workspace_premium_rounded, "Excellence Académique", "Réussir ses études pour servir dignement la communauté."),
                ],
              ),
            ),

            // CTA Section
            Container(
              margin: const EdgeInsets.all(24),
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 32),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.teal[900]!, const Color(0xFF064E3B)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(40),
                boxShadow: [
                  BoxShadow(
                    color: Colors.teal[900]!.withOpacity(0.3),
                    blurRadius: 30,
                    offset: const Offset(0, 15),
                  )
                ],
              ),
              child: Column(
                children: [
                  const Icon(Icons.mosque_rounded, color: Color(0xFF10B981), size: 64),
                  const SizedBox(height: 32),
                  const Text(
                    "Prêt à rejoindre l'aventure ?",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    "Devenez membre de l'Ansaroudine et participez activement à la vie de notre Dahira.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white70, fontSize: 18, height: 1.5),
                  ),
                  const SizedBox(height: 48),
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/login'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.teal[900],
                      padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 22),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 10,
                    ),
                    child: const Text("S'INSCRIRE MAINTENANT", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 60),
          ],
        ),
      ),
    );
  }

  Widget _buildIdentityItem(IconData icon, String title, String desc) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF10B981).withOpacity(0.08),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF10B981).withOpacity(0.1)),
            ),
            child: Icon(icon, color: const Color(0xFF10B981), size: 28),
          ),
          const SizedBox(width: 24),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: GoogleFonts.blackHanSans(fontSize: 22, color: const Color(0xFF1E293B))),
                const SizedBox(height: 6),
                Text(desc, style: const TextStyle(color: Color(0xFF64748B), fontSize: 16, height: 1.5)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
