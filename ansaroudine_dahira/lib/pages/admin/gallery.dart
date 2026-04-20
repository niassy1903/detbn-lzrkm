import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/gallery.dart';
import '../../components/image_upload.dart';

class AdminGallery extends StatefulWidget {
  const AdminGallery({super.key});

  @override
  State<AdminGallery> createState() => _AdminGalleryState();
}

class _AdminGalleryState extends State<AdminGallery> {
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

  void _showAddModal() {
    showDialog(
      context: context,
      builder: (context) => const GalleryFormModal(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final gallery = data.gallery;

    final filteredGallery = gallery.where((item) {
      final matchesSearch = item.title.toLowerCase().contains(_searchTerm.toLowerCase());
      final matchesCategory = _categoryFilter == 'ALL' || item.category == _categoryFilter;
      return matchesSearch && matchesCategory;
    }).toList();

    return AdminLayout(
      title: "Galerie Photo",
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
                      Text("Gestion de la Galerie",
                          style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                      const SizedBox(height: 4),
                      const Text("Gérez les photos et albums de la communauté.",
                          style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500, fontSize: 16)),
                    ],
                  ),
                ),
                const SizedBox(width: 24),
                ElevatedButton.icon(
                  onPressed: _showAddModal,
                  icon: const Icon(Icons.add_a_photo, size: 20),
                  label: const Text("Ajouter une photo", style: TextStyle(fontWeight: FontWeight.bold)),
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
                          hintText: "Rechercher une photo...",
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
                            DropdownMenuItem(value: 'Événement', child: Text("Événement")),
                            DropdownMenuItem(value: 'Conférence', child: Text("Conférence")),
                            DropdownMenuItem(value: 'Social', child: Text("Social")),
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

            // Gallery Grid
            LayoutBuilder(
              builder: (context, constraints) {
                int crossAxisCount = constraints.maxWidth > 1200 
                    ? 4 
                    : (constraints.maxWidth > 800 ? 3 : 2);
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    childAspectRatio: 1,
                  ),
                  itemCount: filteredGallery.length,
                  itemBuilder: (context, index) {
                    final item = filteredGallery[index];
                    return _buildGalleryCard(item);
                  },
                );
              },
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildGalleryCard(GalleryItem item) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        fit: StackFit.expand,
        children: [
          item.url.isNotEmpty
              ? (item.url.startsWith('data:image') 
                  ? Image.memory(base64Decode(item.url.split(',').last), fit: BoxFit.cover, color: Colors.white.withValues(alpha: 0.6), colorBlendMode: BlendMode.dstATop)
                  : Image.network(item.url, fit: BoxFit.cover, color: Colors.white.withValues(alpha: 0.6), colorBlendMode: BlendMode.dstATop))
              : Container(color: const Color(0xFF1E293B)),
          
          // Hover Overlay (simplified)
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Colors.black.withValues(alpha: 0.8)],
              ),
            ),
          ),

          // Actions
          Positioned(
            top: 16,
            right: 16,
            child: Row(
              children: [
                IconButton(
                  onPressed: () => _deleteGalleryItem(item),
                  icon: const Icon(Icons.delete_outline, size: 20, color: Colors.white),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.redAccent,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ],
            ),
          ),

          // Details
          Positioned(
            bottom: 24,
            left: 24,
            right: 24,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (item.category != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      item.category!.toUpperCase(),
                      style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.w900, letterSpacing: 1),
                    ),
                  ),
                Text(
                  item.title,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _deleteGalleryItem(GalleryItem item) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: Text("Voulez-vous supprimer cette photo \"${item.title}\" ?", style: const TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      try {
        await Provider.of<DataContext>(context, listen: false).deleteGalleryItem(item.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Photo supprimée")));
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e"), backgroundColor: Colors.redAccent));
        }
      }
    }
  }
}

class GalleryFormModal extends StatefulWidget {
  const GalleryFormModal({super.key});

  @override
  State<GalleryFormModal> createState() => _GalleryFormModalState();
}

class _GalleryFormModalState extends State<GalleryFormModal> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  String _category = 'Événement';
  String? _imageBase64;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController();
  }

  @override
  void dispose() {
    _titleController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate() || _imageBase64 == null) {
      if (_imageBase64 == null) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Veuillez sélectionner une image")));
      }
      return;
    }

    setState(() => _isLoading = true);
    final dataContext = Provider.of<DataContext>(context, listen: false);

    final itemData = {
      'title': _titleController.text,
      'category': _category,
      'url': _imageBase64,
    };

    try {
      await dataContext.addGalleryItem(itemData);
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
        constraints: const BoxConstraints(maxWidth: 550),
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
                    child: const Icon(Icons.add_photo_alternate_outlined, color: const Color(0xFF10B981), size: 32),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("Ajouter une photo",
                            style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                        const Text("Partagez un moment avec la communauté.",
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
                        label: "Photo",
                        initialImage: _imageBase64,
                        onImageSelect: (base64) => setState(() => _imageBase64 = base64),
                      ),
                      const SizedBox(height: 32),
                      _buildField("Titre / Légende", _titleController, Icons.title, hint: "Ex: Conférence à Dakar"),
                      const SizedBox(height: 24),
                      Column(
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
                                  DropdownMenuItem(value: 'Événement', child: Text("Événement")),
                                  DropdownMenuItem(value: 'Conférence', child: Text("Conférence")),
                                  DropdownMenuItem(value: 'Social', child: Text("Social")),
                                ],
                                onChanged: (val) => setState(() => _category = val!),
                              ),
                            ),
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
                      : const Text("Ajouter à la galerie", style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, IconData icon, {String? hint}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
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
