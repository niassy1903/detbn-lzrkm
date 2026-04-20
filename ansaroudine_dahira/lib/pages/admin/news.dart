import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/news.dart';
import '../../components/image_upload.dart';

class AdminNews extends StatefulWidget {
  const AdminNews({super.key});

  @override
  State<AdminNews> createState() => _AdminNewsState();
}

class _AdminNewsState extends State<AdminNews> {
  String _searchTerm = '';
  String _categoryFilter = 'ALL';

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('ADMIN');
      }
    });
  }

  void _showNewsModal([NewsItem? item]) {
    showDialog(
      context: context,
      builder: (context) => NewsFormModal(item: item),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final news = data.news;

    final filteredNews = news.where((n) {
      final matchesSearch = n.title.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          n.excerpt.toLowerCase().contains(_searchTerm.toLowerCase());
      final matchesCategory = _categoryFilter == 'ALL' || n.category == _categoryFilter;
      return matchesSearch && matchesCategory;
    }).toList();

    return AdminLayout(
      title: "Actualités",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Gestion des Actualités",
                          style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                      const SizedBox(height: 4),
                      const Text("Publiez et gérez les articles et annonces du Dahira.",
                          style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500, fontSize: 16)),
                    ],
                  ),
                ),
                const SizedBox(width: 24),
                ElevatedButton.icon(
                  onPressed: () => _showNewsModal(),
                  icon: const Icon(Icons.plus_one, size: 20),
                  label: const Text("Nouvel Article", style: TextStyle(fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    elevation: 10,
                    shadowColor: const Color(0xFF10B981).withValues(alpha: 0.3),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 40),

            // Filters
            LayoutBuilder(
              builder: (context, constraints) {
                bool isWide = constraints.maxWidth > 800;
                return Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    SizedBox(
                      width: isWide ? 400 : double.infinity,
                      child: TextField(
                        onChanged: (val) => setState(() => _searchTerm = val),
                        style: const TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: "Rechercher un article...",
                          hintStyle: const TextStyle(color: Color(0xFF64748B)),
                          prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                          filled: true,
                          fillColor: const Color(0xFF0F172A),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: const BorderSide(color: Color(0xFF1E293B)),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: const BorderSide(color: Color(0xFF1E293B)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: const BorderSide(color: Color(0xFF10B981)),
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      width: isWide ? 250 : double.infinity,
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          dropdownColor: const Color(0xFF1E293B),
                          value: _categoryFilter,
                          isExpanded: true,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          items: const [
                            DropdownMenuItem(value: 'ALL', child: Text("Toutes les catégories")),
                            DropdownMenuItem(value: 'Actualité', child: Text("Actualité")),
                            DropdownMenuItem(value: 'Événement', child: Text("Événement")),
                            DropdownMenuItem(value: 'Annonce', child: Text("Annonce")),
                          ],
                          onChanged: (val) => setState(() => _categoryFilter = val!),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),

            const SizedBox(height: 40),

            // News Table/Grid
            Container(
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(40),
                border: Border.all(color: const Color(0xFF1E293B)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.2),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              clipBehavior: Clip.antiAlias,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: ConstrainedBox(
                  constraints: BoxConstraints(minWidth: MediaQuery.of(context).size.width - 48),
                  child: DataTable(
                    headingRowHeight: 70,
                    dataRowMaxHeight: 80,
                    columnSpacing: 24,
                    columns: const [
                      DataColumn(label: Text("ARTICLE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1))),
                      DataColumn(label: Text("CATÉGORIE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1))),
                      DataColumn(label: Text("DATE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1))),
                      DataColumn(label: Text("AUTEUR", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1))),
                      DataColumn(numeric: true, label: Text("ACTIONS", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1))),
                    ],
                    rows: filteredNews.map((item) {
                      return DataRow(
                        cells: [
                          DataCell(
                            Container(
                              constraints: const BoxConstraints(maxWidth: 300),
                              child: Row(
                                children: [
                                  Container(
                                    width: 64,
                                    height: 48,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12),
                                      color: const Color(0xFF1E293B),
                                      image: item.image != null && item.image!.isNotEmpty
                                          ? DecorationImage(
                                              image: item.image!.startsWith('data:image') 
                                                  ? MemoryImage(base64Decode(item.image!.split(',').last)) as ImageProvider
                                                  : NetworkImage(item.image!), 
                                              fit: BoxFit.cover)
                                          : null,
                                    ),
                                    child: item.image == null || item.image!.isEmpty
                                        ? const Icon(Icons.image_outlined, color: Color(0xFF64748B), size: 20)
                                        : null,
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(item.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14), maxLines: 1, overflow: TextOverflow.ellipsis),
                                        Text(item.excerpt, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12), maxLines: 1, overflow: TextOverflow.ellipsis),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          DataCell(
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: const Color(0xFF3B82F6).withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: const Color(0xFF3B82F6).withValues(alpha: 0.2)),
                              ),
                              child: Text(item.category.toUpperCase(), style: const TextStyle(color: Color(0xFF3B82F6), fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 1)),
                            ),
                          ),
                          DataCell(Text(DateFormat('dd/MM/yyyy').format(item.date), style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13))),
                          DataCell(Text(item.author, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13))),
                          DataCell(
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                IconButton(
                                  onPressed: () => _showNewsModal(item),
                                  icon: const Icon(Icons.edit_outlined, size: 20, color: Color(0xFF10B981)),
                                  style: IconButton.styleFrom(backgroundColor: const Color(0xFF1E293B), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                                ),
                                const SizedBox(width: 8),
                                IconButton(
                                  onPressed: () => _deleteNews(item),
                                  icon: const Icon(Icons.delete_outline, size: 20, color: Colors.redAccent),
                                  style: IconButton.styleFrom(backgroundColor: const Color(0xFF1E293B), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                                ),
                              ],
                            ),
                          ),
                        ],
                      );
                    }).toList(),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  void _deleteNews(NewsItem item) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: Text("Voulez-vous supprimer l'article \"${item.title}\" ?", style: const TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      try {
        await Provider.of<DataContext>(context, listen: false).deleteNews(item.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Article supprimé")));
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e"), backgroundColor: Colors.redAccent));
        }
      }
    }
  }
}

class NewsFormModal extends StatefulWidget {
  final NewsItem? item;
  const NewsFormModal({super.key, this.item});

  @override
  State<NewsFormModal> createState() => _NewsFormModalState();
}

class _NewsFormModalState extends State<NewsFormModal> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  late TextEditingController _excerptController;
  late TextEditingController _contentController;
  late TextEditingController _authorController;
  late String _category;
  String? _imageBase64;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.item?.title ?? '');
    _excerptController = TextEditingController(text: widget.item?.excerpt ?? '');
    _contentController = TextEditingController(text: widget.item?.content ?? '');
    _authorController = TextEditingController(text: widget.item?.author ?? 'Admin');
    _category = widget.item?.category ?? 'Actualité';
    _imageBase64 = widget.item?.image;
  }

  @override
  void dispose() {
    _titleController.dispose();
    _excerptController.dispose();
    _contentController.dispose();
    _authorController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);
    final dataContext = Provider.of<DataContext>(context, listen: false);

    final newsData = {
      'title': _titleController.text,
      'excerpt': _excerptController.text,
      'content': _contentController.text,
      'category': _category,
      'author': _authorController.text,
      'date': widget.item?.date.toIso8601String() ?? DateTime.now().toIso8601String(),
      if (_imageBase64 != null) 'image': _imageBase64,
    };

    try {
      if (widget.item != null) {
        await dataContext.updateNews(widget.item!.id, newsData);
      } else {
        await dataContext.addNews(newsData);
      }
      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e"), backgroundColor: Colors.redAccent));
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.all(16),
      child: Container(
        width: double.infinity,
        constraints: const BoxConstraints(maxWidth: 700),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(40),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(32),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: const Color(0xFF10B981).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
                    child: Icon(widget.item != null ? Icons.edit_note : Icons.add_circle_outline, color: const Color(0xFF10B981), size: 32),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.item != null ? "Modifier l'article" : "Nouvel article",
                            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                        const Text("Rédigez votre contenu ci-dessous.",
                            style: TextStyle(color: Color(0xFF64748B), fontSize: 14, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
                  IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.close, color: Color(0xFF64748B))),
                ],
              ),
            ),
            const Divider(color: Color(0xFF1E293B), height: 1),

            // Form
            Flexible(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(32),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      ImageUpload(
                        label: "Image de l'article",
                        initialImage: _imageBase64,
                        onImageSelect: (base64) => setState(() => _imageBase64 = base64),
                      ),
                      const SizedBox(height: 32),
                      _buildField("Titre de l'article", _titleController, Icons.title, hint: "Ex: Les bienfaits du Zikr"),
                      const SizedBox(height: 24),
                      _buildField("Résumé (Extrait)", _excerptController, Icons.short_text, maxLines: 2, hint: "Un court résumé pour la liste..."),
                      const SizedBox(height: 24),
                      _buildField("Contenu Complet", _contentController, Icons.article_outlined, maxLines: 8, hint: "Rédigez votre article ici..."),
                      const SizedBox(height: 24),
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text("CATÉGORIE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
                                const SizedBox(height: 8),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 16),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withValues(alpha: 0.3),
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(color: const Color(0xFF1E293B)),
                                  ),
                                  child: DropdownButtonHideUnderline(
                                    child: DropdownButton<String>(
                                      isExpanded: true,
                                      dropdownColor: const Color(0xFF1E293B),
                                      value: _category,
                                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500),
                                      items: const [
                                        DropdownMenuItem(value: 'Actualité', child: Text("Actualité")),
                                        DropdownMenuItem(value: 'Événement', child: Text("Événement")),
                                        DropdownMenuItem(value: 'Annonce', child: Text("Annonce")),
                                      ],
                                      onChanged: (val) => setState(() => _category = val!),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 24),
                          Expanded(
                            child: _buildField("Auteur", _authorController, Icons.person_outline),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Footer
            Padding(
              padding: const EdgeInsets.all(32),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text("Annuler", style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(width: 24),
                  ElevatedButton.icon(
                    onPressed: _isLoading ? null : _handleSubmit,
                    icon: _isLoading ? const SizedBox.shrink() : const Icon(Icons.check, size: 20),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF10B981),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 8,
                      shadowColor: const Color(0xFF10B981).withValues(alpha: 0.3),
                    ),
                    label: _isLoading 
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text(widget.item != null ? "Mettre à jour" : "Publier l'article", style: const TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, IconData icon, {int maxLines = 1, String? hint}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          maxLines: maxLines,
          style: const TextStyle(color: Colors.white),
          validator: (v) => v == null || v.isEmpty ? "Champ requis" : null,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: Color(0xFF475569), fontSize: 14),
            prefixIcon: Icon(icon, color: const Color(0xFF64748B), size: 20),
            filled: true,
            fillColor: Colors.black.withValues(alpha: 0.3),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF10B981))),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          ),
        ),
      ],
    );
  }
}
