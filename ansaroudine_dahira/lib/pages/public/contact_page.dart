import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../layouts/public_layout.dart';

class ContactPage extends StatefulWidget {
  const ContactPage({super.key});

  @override
  State<ContactPage> createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();

  final LatLng _location = const LatLng(14.7883026, -17.3144645); // Coordonnées du Lycée

  void _handleSubmit() {
    if (_formKey.currentState!.validate()) {
      // Simulate WhatsApp link opening logic
      final name = _nameController.text;
      final email = _emailController.text;
      final subject = _subjectController.text;
      final message = _messageController.text;
      
      final text = "*Nouveau message de Ansaroudine Dahira*\n\n*Nom:* $name\n*Email:* $email\n*Sujet:* $subject\n*Message:* $message";
      
      // In a real app, use url_launcher:
      // final phoneNumber = '221770000000';
      // final whatsappUrl = "https://wa.me/$phoneNumber?text=${Uri.encodeComponent(text)}";
      // launchUrl(Uri.parse(whatsappUrl));
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Message envoyé (Simulation WhatsApp)')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
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
                  const Text("Nous Joindre", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text(
                    "Contact & Fraternité.",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.blackHanSans(fontSize: 48, height: 1.1),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Vous avez des questions sur notre Dahira ou souhaitez nous rejoindre ? Notre équipe est à votre entière disposition.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 18, height: 1.6),
                  ),
                ],
              ),
            ),

            // Info Section
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 24),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(40),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.teal[900],
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Nos Coordonnées",
                          style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 40),
                        _buildContactInfo(Icons.location_on, "LOCALISATION", "Lycée Zone de Recasement, Keur Massar, Dakar"),
                        _buildContactInfo(Icons.phone, "TÉLÉPHONE", "+221 77 000 00 00"),
                        _buildContactInfo(Icons.email, "EMAIL", "contact@ansaroudine.sn"),
                        _buildContactInfo(Icons.access_time, "DISPONIBILITÉ", "Hadratoul Juma : Vendredi 21h"),
                      ],
                    ),
                  ),

                  const SizedBox(height: 40),

                  Container(
                    padding: const EdgeInsets.all(40),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.grey[50],
                      borderRadius: BorderRadius.circular(50),
                      border: Border.all(color: Colors.grey[100]!),
                    ),
                    child: Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
                          child: const Icon(Icons.forum, color: Color(0xFF10B981), size: 32),
                        ),
                        const SizedBox(height: 24),
                        const Text("Espace Membre", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 12),
                        const Text(
                          "Déjà membre de l'Ansaroudine ? Connectez-vous à votre espace pour accéder aux ressources exclusives.",
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.grey),
                        ),
                        const SizedBox(height: 32),
                        ElevatedButton(
                          onPressed: () => Navigator.pushNamed(context, '/login'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            minimumSize: const Size(double.infinity, 54),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          child: const Text("Se Connecter", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 40),

                  // Contact Form
                  Container(
                    padding: const EdgeInsets.all(40),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(60),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 40, spreadRadius: 0),
                      ],
                    ),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            crossAxisAlignment: WrapCrossAlignment.center,
                            children: [
                              Text("Envoyez-nous un ", style: GoogleFonts.blackHanSans(fontSize: 24)),
                              Text("Message", style: GoogleFonts.blackHanSans(fontSize: 24, color: const Color(0xFF10B981), fontStyle: FontStyle.italic)),
                            ],
                          ),
                          const SizedBox(height: 40),
                          _buildTextField(_nameController, "Nom complet", "Votre nom"),
                          _buildTextField(_emailController, "Email", "votre@email.com", keyboardType: TextInputType.emailAddress),
                          _buildTextField(_subjectController, "Sujet", "Comment pouvons-nous vous aider ?"),
                          _buildTextField(_messageController, "Message", "Votre message ici...", maxLines: 5),
                          const SizedBox(height: 40),
                          ElevatedButton.icon(
                            onPressed: _handleSubmit,
                            icon: const Icon(Icons.send),
                            label: const Text("Envoyer le Message"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF10B981),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Real Interactive Map (Leaflet)
            Container(
              height: 400,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey[200]!),
              ),
              child: FlutterMap(
                options: MapOptions(
                  initialCenter: _location,
                  initialZoom: 15.0,
                ),
                children: [
                  TileLayer(
                    urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    userAgentPackageName: 'com.example.ansaroudine_dahira',
                  ),
                  MarkerLayer(
                    markers: [
                      Marker(
                        point: _location,
                        width: 80,
                        height: 80,
                        child: const Icon(
                          Icons.location_on,
                          color: Color(0xFF10B981),
                          size: 40,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Final Quote
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
              child: Column(
                children: [
                  Text(
                    "\"La communication est le pont qui relie les cœurs sincères dans la quête de la vérité.\"",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.libreBaskerville(fontSize: 24, fontStyle: FontStyle.italic),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Esprit de l'Ansaroudine",
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

  Widget _buildContactInfo(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: Icon(icon, color: const Color(0xFF10B981), size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2)),
                const SizedBox(height: 4),
                Text(value, style: const TextStyle(color: Colors.white, fontSize: 16)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String label, String placeholder, {int maxLines = 1, TextInputType keyboardType = TextInputType.text}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 2)),
          const SizedBox(height: 8),
          TextFormField(
            controller: controller,
            maxLines: maxLines,
            keyboardType: keyboardType,
            decoration: InputDecoration(
              hintText: placeholder,
              filled: true,
              fillColor: Colors.grey[50],
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: BorderSide.none),
              contentPadding: const EdgeInsets.all(20),
            ),
            validator: (value) => value == null || value.isEmpty ? 'Champ requis' : null,
          ),
        ],
      ),
    );
  }
}
