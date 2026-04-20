import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class UsageTipsPage extends StatelessWidget {
  const UsageTipsPage({super.key});

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
                "Conseils d'Utilisation",
                style: GoogleFonts.blackHanSans(fontSize: 36, color: const Color(0xFF0F172A)),
              ),
              const SizedBox(height: 16),
              const Text(
                "Comment tirer le meilleur parti de votre application Ansaroudine.",
                style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 40),
              _buildTip("1. Complétez votre Profil", 
                "Un profil complet avec votre vrai nom et une photo claire permet aux administrateurs de vous identifier rapidement et de valider votre accès aux sections réservées."),
              _buildTip("2. Gérez vos Notifications", 
                "Assurez-vous d'activer les notifications dans les paramètres de votre téléphone. C'est le seul moyen de recevoir les alertes en temps réel pour la Hadratoul Juma et les messages importants du Dahira."),
              _buildTip("3. Participation aux Événements", 
                "Utilisez le bouton 'Je participe' pour chaque événement. Cela aide les organisateurs à mieux prévoir la logistique (repas, espace, transport) pour le bien de tous."),
              _buildTip("4. Éthique et Adab", 
                "L'application est un prolongement de notre Zawiya. Nous vous prions de maintenir un comportement exemplaire dans les messages : courtoisie, fraternité et respect de la Fayda Tidjaniya."),
              _buildTip("5. Mise à jour de l'App", 
                "Vérifiez régulièrement les mises à jour sur le Play Store. Nous ajoutons souvent de nouvelles fonctionnalités pour améliorer votre expérience spirituelle et communautaire."),
              _buildTip("6. Support Technique", 
                "En cas de difficulté technique, n'hésitez pas à utiliser le formulaire de contact. Notre équipe de bénévoles fera son possible pour vous assister dans les plus brefs délais."),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTip(String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Colors.grey[50],
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.grey[100]!),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: GoogleFonts.blackHanSans(fontSize: 20, color: const Color(0xFF1E293B))),
            const SizedBox(height: 12),
            Text(content, style: const TextStyle(color: Color(0xFF64748B), fontSize: 16, height: 1.6)),
          ],
        ),
      ),
    );
  }
}
