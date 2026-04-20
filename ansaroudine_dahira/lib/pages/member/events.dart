import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../context/auth_context.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/member_layout.dart';

class MemberEventsPage extends StatefulWidget {
  const MemberEventsPage({super.key});

  @override
  State<MemberEventsPage> createState() => _MemberEventsPageState();
}

class _MemberEventsPageState extends State<MemberEventsPage> {
  String _filter = 'ALL';

  Widget _buildImage(String? imagePath, {double? width, double? height}) {
    if (imagePath == null || imagePath.isEmpty) {
      return Container(
        width: width,
        height: height,
        color: Colors.grey[100],
        child: const Icon(Icons.image_outlined, color: Colors.grey, size: 40),
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

  Widget _buildFilterButton(String id, String label) {
    final isSelected = _filter == id;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _filter = id),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF10B981) : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.grey,
                fontWeight: FontWeight.bold,
                fontSize: 13,
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final auth = Provider.of<AuthContext>(context);
    final user = auth.user;

    final filteredEvents = data.events.where((e) {
      if (_filter == 'ALL') return true;
      return e.status.name == _filter;
    }).toList();

    return MemberLayout(
      title: "Événements",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Événements du Dahira", style: GoogleFonts.blackHanSans(fontSize: 32)),
            const Text("Participez aux activités et restez connecté.", style: TextStyle(color: Colors.grey, fontSize: 16)),
            
            const SizedBox(height: 32),
            
            // Filter Bar
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.grey[100]!),
              ),
              child: Row(
                children: [
                  _buildFilterButton("ALL", "Tous"),
                  _buildFilterButton("UPCOMING", "À venir"),
                  _buildFilterButton("COMPLETED", "Passés"),
                ],
              ),
            ),

            const SizedBox(height: 40),

            if (filteredEvents.isEmpty)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(80),
                  child: Text("Aucun événement trouvé.", style: TextStyle(color: Colors.grey)),
                ),
              )
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: filteredEvents.length,
                itemBuilder: (context, index) {
                  final event = filteredEvents[index];
                  final isParticipating = event.participants.contains(user?.id);

                  return Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(32),
                      border: Border.all(color: Colors.grey[100]!),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Stack(
                          children: [
                            _buildImage(
                                event.image,
                                height: 200,
                                width: double.infinity),
                            Positioned(
                              top: 16,
                              left: 16,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.9),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Column(
                                  children: [
                                    Text(
                                      event.date.day.toString(),
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                        color: Color(0xFF10B981),
                                      ),
                                    ),
                                    Text(
                                      DateFormat('MMM').format(event.date).toUpperCase(),
                                      style: const TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(32),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(event.title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 12),
                              Text(event.description, style: const TextStyle(color: Colors.grey, height: 1.5)),
                              const SizedBox(height: 24),
                              Row(
                                children: [
                                  const Icon(Icons.location_on, color: Color(0xFF10B981), size: 16),
                                  const SizedBox(width: 8),
                                  Text(event.location, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                                ],
                              ),
                              const SizedBox(height: 32),
                              Row(
                                children: [
                                  Expanded(
                                    child: ElevatedButton(
                                      onPressed: isParticipating || data.loading ? null : () async {
                                        try {
                                          await data.participateInEvent(event.id);
                                          if (mounted) {
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              const SnackBar(content: Text("Votre participation a été enregistrée !")),
                                            );
                                          }
                                        } catch (e) {
                                          if (mounted) {
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              SnackBar(content: Text("Erreur: ${e.toString()}")),
                                            );
                                          }
                                        }
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: isParticipating ? const Color(0xFF10B981).withOpacity(0.1) : const Color(0xFF10B981),
                                        foregroundColor: isParticipating ? const Color(0xFF10B981) : Colors.white,
                                        minimumSize: const Size(0, 56),
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                        elevation: 0,
                                      ),
                                      child: data.loading 
                                        ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                                        : Text(isParticipating ? "Déjà inscrit" : "Je participe", style: const TextStyle(fontWeight: FontWeight.bold)),
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Container(
                                    padding: const EdgeInsets.all(16),
                                    decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(16)),
                                    child: const Icon(Icons.info_outline, color: Colors.grey),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }
}
