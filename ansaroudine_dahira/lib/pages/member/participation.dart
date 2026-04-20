import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/data_context.dart';
import '../../context/auth_context.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../layouts/member_layout.dart';

class ParticipationPage extends StatelessWidget {
  const ParticipationPage({super.key});

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final auth = Provider.of<AuthContext>(context);
    final user = auth.user;

    final myEvents = data.events.where((e) => e.participants.contains(user?.id)).toList();

    return MemberLayout(
      title: "Ma Participation",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 60),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Ma Participation", style: GoogleFonts.blackHanSans(fontSize: 32)),
                      const Text("Retrouvez tous les événements auxquels vous participez.", style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(32)),
                  child: const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 32),
                ),
              ],
            ),

            const SizedBox(height: 40),

            if (myEvents.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(80),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(40)),
                child: Column(
                  children: [
                    Icon(Icons.calendar_month, size: 60, color: Colors.grey[200]),
                    const SizedBox(height: 24),
                    const Text("Aucune participation active", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      onPressed: () => Navigator.pushNamed(context, '/member/events'),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),
                      child: const Text("Découvrir les événements", style: TextStyle(color: Colors.white)),
                    ),
                  ],
                ),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1,
                  mainAxisSpacing: 24,
                  mainAxisExtent: 450,
                ),
                itemCount: myEvents.length,
                itemBuilder: (context, index) {
                  final event = myEvents[index];
                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(40),
                      border: Border.all(color: Colors.grey[100]!),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Image.network(
                            event.image ?? 'https://images.unsplash.com/photo-1504150559433-c4aae2f1b145?auto=format&fit=crop&q=80&w=800',
                            height: 200,
                            width: double.infinity,
                            fit: BoxFit.cover),
                        Padding(
                          padding: const EdgeInsets.all(32),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(event.title, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 12),
                              Text(event.description, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.grey)),
                              const SizedBox(height: 24),
                              Row(
                                children: [
                                  _buildInfoTag(Icons.calendar_today, DateFormat('dd/MM/yyyy').format(event.date)),
                                  const SizedBox(width: 16),
                                  _buildInfoTag(Icons.location_on, event.location),
                                ],
                              ),
                              const SizedBox(height: 32),
                              ElevatedButton(
                                onPressed: () {},
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.grey[50],
                                  foregroundColor: Colors.grey[700],
                                  minimumSize: const Size(double.infinity, 56),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  elevation: 0,
                                ),
                                child: const Text("Détails de l'événement", style: TextStyle(fontWeight: FontWeight.bold)),
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

  Widget _buildInfoTag(IconData icon, String text) {
    return Expanded(
      child: Row(
        children: [
          Icon(icon, size: 14, color: const Color(0xFF10B981)),
          const SizedBox(width: 6),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey), overflow: TextOverflow.ellipsis)),
        ],
      ),
    );
  }
}
