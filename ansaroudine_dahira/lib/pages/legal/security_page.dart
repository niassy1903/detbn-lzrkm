import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class SecurityPage extends StatelessWidget {
  const SecurityPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PublicLayout(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 80),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Sécurité & Protection",
                style: GoogleFonts.blackHanSans(fontSize: 36, color: const Color(0xFF0F172A)),
              ),
              const SizedBox(height: 16),
              const Text(
                "Votre sécurité est notre priorité absolue.",
                style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 40),
              _buildSection(Icons.lock_outline, "Authentification Sécurisée", 
                "Tous les comptes membres sont protégés par un système d'authentification robuste. Nous recommandons l'utilisation de mots de passe complexes mêlant lettres, chiffres et caractères spéciaux."),
              _buildSection(Icons.shield_outlined, "Protection des Communications", 
                "Les échanges de messages et les notifications au sein de l'application sont cryptés (SSL/TLS). Vos discussions privées restent privées."),
              _buildSection(Icons.verified_user_outlined, "Vérification des Membres", 
                "L'accès à l'espace membre est soumis à une validation par les administrateurs du Dahira afin de garantir que seuls les talibés reconnus accèdent aux informations internes."),
              _buildSection(Icons.cloud_done_outlined, "Sauvegarde des Données", 
                "Nous effectuons des sauvegardes quotidiennes de nos bases de données pour prévenir toute perte d'information en cas d'incident technique."),
              _buildSection(Icons.bug_report_outlined, "Signalement de Vulnérabilité", 
                "Si vous constatez un comportement suspect ou une faille potentielle, nous vous prions de le signaler immédiatement à l'équipe technique via le formulaire de contact."),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection(IconData icon, String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 40),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF10B981).withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: const Color(0xFF10B981), size: 28),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: GoogleFonts.blackHanSans(fontSize: 20, color: const Color(0xFF1E293B))),
                const SizedBox(height: 8),
                Text(content, style: const TextStyle(color: Color(0xFF64748B), fontSize: 16, height: 1.6)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
