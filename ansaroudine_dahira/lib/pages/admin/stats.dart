import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/admin_layout.dart';
import '../../context/data_context.dart';

class AdminStats extends StatefulWidget {
  const AdminStats({super.key});

  @override
  State<AdminStats> createState() => _AdminStatsState();
}

class _AdminStatsState extends State<AdminStats> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('ADMIN');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);

    final totalMembers = data.members.length;
    final totalEvents = data.events.length;
    final totalDocs = data.documents.length;

    return AdminLayout(
      title: "Statistiques",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Statistiques & Analyses",
                    style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                const SizedBox(height: 4),
                const Text("Suivez l'évolution et l'engagement de votre Dahira.",
                    style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500, fontSize: 16)),
              ],
            ),

            const SizedBox(height: 40),

            // Main Stats Grid
            LayoutBuilder(
              builder: (context, constraints) {
                int crossAxisCount = constraints.maxWidth > 900 ? 3 : (constraints.maxWidth > 600 ? 2 : 1);
                return GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 24,
                  mainAxisSpacing: 24,
                  childAspectRatio: 1.8,
                  children: [
                    _buildSummaryCard("Membres Totaux", totalMembers.toString(), Icons.people_outline, const Color(0xFF10B981)),
                    _buildSummaryCard("Événements Organisés", totalEvents.toString(), Icons.calendar_today_outlined, const Color(0xFF3B82F6)),
                    _buildSummaryCard("Documents Partagés", totalDocs.toString(), Icons.bar_chart_outlined, const Color(0xFF8B5CF6)),
                  ],
                );
              },
            ),

            const SizedBox(height: 40),

            // Charts Section
            LayoutBuilder(
              builder: (context, constraints) {
                if (constraints.maxWidth > 1000) {
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(child: _buildParticipationChart()),
                      const SizedBox(width: 24),
                      Expanded(child: _buildDistributionChart(totalMembers)),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      _buildParticipationChart(),
                      const SizedBox(height: 24),
                      _buildDistributionChart(totalMembers),
                    ],
                  );
                }
              },
            ),
            const SizedBox(height: 60),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(40),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: const Color(0xFF020617),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const Spacer(),
          Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }

  Widget _buildParticipationChart() {
    final List<double> values = [0.4, 0.7, 0.45, 0.9, 0.65, 0.85, 0.55, 0.75, 0.95, 0.6, 0.8, 0.5];
    
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(48),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Participation aux Événements", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              Icon(Icons.bar_chart, color: const Color(0xFF1E293B), size: 24),
            ],
          ),
          const SizedBox(height: 40),
          SizedBox(
            height: 200,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: values.map((val) => Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: AnimatedContainer(
                    duration: const Duration(seconds: 1),
                    height: 200 * val,
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withValues(alpha: 0.2),
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
                    ),
                  ),
                ),
              )).toList(),
            ),
          ),
          const SizedBox(height: 16),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("JAN", style: TextStyle(color: Color(0xFF475569), fontSize: 10, fontWeight: FontWeight.bold)),
              Text("JUIN", style: TextStyle(color: Color(0xFF475569), fontSize: 10, fontWeight: FontWeight.bold)),
              Text("DÉC", style: TextStyle(color: Color(0xFF475569), fontSize: 10, fontWeight: FontWeight.bold)),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildDistributionChart(int total) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(48),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Répartition des Membres", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              Icon(Icons.pie_chart_outline, color: const Color(0xFF1E293B), size: 24),
            ],
          ),
          const SizedBox(height: 32),
          Center(
            child: SizedBox(
              width: 160,
              height: 160,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 160,
                    height: 160,
                    child: CircularProgressIndicator(
                      value: 0.75,
                      strokeWidth: 16,
                      backgroundColor: const Color(0xFF10B981).withValues(alpha: 0.1),
                      color: const Color(0xFF10B981),
                    ),
                  ),
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(total.toString(), style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900)),
                      const Text("TOTAL", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            childAspectRatio: 4,
            children: [
              _buildDistributionItem("Hommes", (total * 0.6).floor(), const Color(0xFF10B981)),
              _buildDistributionItem("Femmes", (total * 0.4).ceil(), const Color(0xFF10B981).withValues(alpha: 0.3)),
              _buildDistributionItem("Jeunes", (total * 0.3).floor(), Colors.blueAccent),
              _buildDistributionItem("Séniors", (total * 0.15).floor(), Colors.orangeAccent),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDistributionItem(String label, int value, Color color) {
    return Row(
      children: [
        Container(width: 12, height: 12, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 12),
        Text("$label : ", style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12, fontWeight: FontWeight.bold)),
        Text(value.toString(), style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w900)),
      ],
    );
  }
}
