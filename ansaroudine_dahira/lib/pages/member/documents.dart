import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../context/data_context.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/member_layout.dart';
import '../../models/document.dart';

class DocumentsPage extends StatefulWidget {
  const DocumentsPage({super.key});

  @override
  State<DocumentsPage> createState() => _DocumentsPageState();
}

class _DocumentsPageState extends State<DocumentsPage> {
  String _currentFilter = 'ALL';
  final _searchController = TextEditingController();

  final categories = [
    {'id': 'ALL', 'name': 'Tous'},
    {'id': 'ADMIN', 'name': 'Administration'},
    {'id': 'SPIRITUAL', 'name': 'Spirituel'},
    {'id': 'EVENTS', 'name': 'Événements'},
    {'id': 'OTHER', 'name': 'Autres'}
  ];

  Future<void> _openDocument(String url) async {
    final Uri uri = Uri.parse(url);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Impossible d'ouvrir le document")),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Erreur : $e")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final dataProvider = Provider.of<DataContext>(context);
    final documents = dataProvider.documents;

    final filteredDocs = documents.where((doc) {
      final matchesSearch = doc.title.toLowerCase().contains(_searchController.text.toLowerCase()) ||
          (doc.description?.toLowerCase().contains(_searchController.text.toLowerCase()) ?? false);
      final matchesCategory = _currentFilter == 'ALL' || doc.category.name == _currentFilter;
      return matchesSearch && matchesCategory;
    }).toList();

    return MemberLayout(
      title: "Mes Documents",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 60),
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Documents Partagés", style: GoogleFonts.blackHanSans(fontSize: 32)),
                      const Text("Accédez aux ressources et documents officiels.", style: TextStyle(color: Colors.grey, fontSize: 16)),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(32),
                  ),
                  child: const Icon(Icons.file_copy, color: Color(0xFF10B981), size: 32),
                ),
              ],
            ),

            const SizedBox(height: 40),

            // Search and Filters
            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(40),
                border: Border.all(color: Colors.grey[100]!),
              ),
              child: Column(
                children: [
                  TextField(
                    controller: _searchController,
                    onChanged: (_) => setState(() {}),
                    decoration: InputDecoration(
                      hintText: "Rechercher un document...",
                      prefixIcon: const Icon(Icons.search, color: Colors.grey),
                      filled: true,
                      fillColor: Colors.grey[50],
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.all(20),
                    ),
                  ),
                  const SizedBox(height: 24),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: categories.map((cat) {
                        final isSelected = _currentFilter == cat['id'];
                        return Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: GestureDetector(
                            onTap: () => setState(() => _currentFilter = cat['id']!),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 300),
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                              decoration: BoxDecoration(
                                color: isSelected ? const Color(0xFF10B981) : Colors.grey[100],
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Text(
                                cat['name']!.toUpperCase(),
                                style: TextStyle(
                                  color: isSelected ? Colors.white : Colors.grey,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 10,
                                  letterSpacing: 1.5,
                                ),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 40),

            // Results Grid
            if (filteredDocs.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(80),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(40),
                  border: Border.all(color: Colors.grey[100]!),
                ),
                child: Column(
                  children: [
                    Icon(Icons.folder_open, size: 60, color: Colors.grey[300]),
                    const SizedBox(height: 24),
                    const Text("Aucun document trouvé", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  ],
                ),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1,
                  mainAxisSpacing: 16,
                  mainAxisExtent: 240, // Augmenté de 220 à 240
                ),
                itemCount: filteredDocs.length,
                itemBuilder: (context, index) {
                  final doc = filteredDocs[index];
                  return Container(
                    padding: const EdgeInsets.all(20), // Réduit de 32 à 20
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(32), // Ajusté de 40 à 32
                      border: Border.all(color: Colors.grey[100]!),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () => _openDocument(doc.fileUrl),
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(16)),
                                child: const Icon(Icons.picture_as_pdf, color: Colors.red, size: 28),
                              ),
                            ),
                            Row(
                              children: [
                                IconButton(onPressed: () {}, icon: const Icon(Icons.share, color: Colors.grey)),
                                IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, color: Colors.grey)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Text(doc.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18), maxLines: 1, overflow: TextOverflow.ellipsis),
                        Text(doc.description ?? 'Aucune description.', style: const TextStyle(color: Colors.grey), maxLines: 1),
                        const Spacer(),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(DateFormat('dd/MM/yyyy').format(doc.createdAt), style: const TextStyle(color: Colors.grey, fontSize: 12)),
                            ElevatedButton.icon(
                              onPressed: () => _openDocument(doc.fileUrl),
                              icon: const Icon(Icons.download, size: 16),
                              label: const Text("Ouvrir"),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.black,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            ),
                          ],
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
