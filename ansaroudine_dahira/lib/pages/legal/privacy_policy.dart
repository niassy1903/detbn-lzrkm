import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/public_layout.dart';

class PrivacyPolicyPage extends StatelessWidget {
  const PrivacyPolicyPage({super.key});

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
                "Politique de Confidentialité",
                style: GoogleFonts.blackHanSans(fontSize: 36, color: const Color(0xFF0F172A)),
              ),
              const SizedBox(height: 16),
              const Text(
                "Dernière mise à jour : 18 Avril 2024",
                style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 40),
              _buildSection("1. Introduction", 
                "L'application Ansaroudine Dahira est profondément attachée à la protection de la vie privée de ses membres. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations personnelles dans le respect de la Fayda Tidjaniya et des lois en vigueur."),
              _buildSection("2. Collecte des Données", 
                "Nous collectons les données nécessaires au bon fonctionnement de la communauté : \n• Nom et prénom pour l'identification.\n• Numéro de téléphone pour la communication WhatsApp et les alertes.\n• Adresse email pour la gestion du compte.\n• Photos de profil (optionnel) pour la personnalisation."),
              _buildSection("3. Utilisation des Informations", 
                "Vos données sont utilisées exclusivement pour :\n• La gestion des participations aux événements (Hadratoul Juma, Gamou, etc.).\n• L'envoi de notifications en temps réel pour les nouvelles du Dahira.\n• La coordination des activités de bienfaisance.\n• Nous ne vendons JAMAIS vos données à des tiers."),
              _buildSection("4. Stockage et Sécurité", 
                "Les données sont stockées sur des serveurs sécurisés avec un cryptage de bout en bout. L'accès aux informations sensibles est restreint aux administrateurs autorisés du Dahira uniquement."),
              _buildSection("5. Vos Droits", 
                "En tant que membre, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez modifier vos informations directement depuis votre profil ou nous contacter pour une suppression définitive de votre compte."),
              _buildSection("6. Contact", 
                "Pour toute question relative à la protection de vos données, veuillez contacter notre délégué à la protection des données via la page de contact officielle."),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection(String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: GoogleFonts.blackHanSans(fontSize: 22, color: const Color(0xFF1E293B))),
          const SizedBox(height: 12),
          Text(content, style: const TextStyle(color: Color(0xFF64748B), fontSize: 16, height: 1.6)),
        ],
      ),
    );
  }
}
