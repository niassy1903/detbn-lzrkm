import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:file_picker/file_picker.dart';
import 'package:path/path.dart' as p;
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/document.dart';
import '../../controllers/document.dart';

class AdminDocuments extends StatefulWidget {
  const AdminDocuments({super.key});

  @override
  State<AdminDocuments> createState() => _AdminDocumentsState();
}

class _AdminDocumentsState extends State<AdminDocuments> {
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
      builder: (context) => const DocumentFormModal(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final documents = data.documents;

    final filteredDocs = documents.where((doc) {
      final matchesSearch = doc.title.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          (doc.description?.toLowerCase().contains(_searchTerm.toLowerCase()) ?? false);
      final matchesCategory = _categoryFilter == 'ALL' || doc.category.name == _categoryFilter;
      return matchesSearch && matchesCategory;
    }).toList();

    return AdminLayout(
      title: "Gestion Documents",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Text("Espace Documentaire",
                style: GoogleFonts.blackHanSans(fontSize: 28, color: Colors.white)),
            const SizedBox(height: 8),
            const Text("Partagez vos fichiers en toute sécurité.",
                style: TextStyle(color: Color(0xFF64748B), fontSize: 14)),
            
            const SizedBox(height: 32),
            
            // Actions
            ElevatedButton.icon(
              onPressed: _showAddModal,
              icon: const Icon(Icons.cloud_upload_rounded),
              label: const Text("NOUVEAU DOCUMENT"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),

            const SizedBox(height: 24),

            // Search & Filter Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF1E293B)),
              ),
              child: Column(
                children: [
                  TextField(
                    onChanged: (val) => setState(() => _searchTerm = val),
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: "Rechercher...",
                      prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                      filled: true,
                      fillColor: Colors.black26,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: Colors.black26,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        dropdownColor: const Color(0xFF1E293B),
                        value: _categoryFilter,
                        isExpanded: true,
                        style: const TextStyle(color: Colors.white),
                        items: const [
                          DropdownMenuItem(value: 'ALL', child: Text("Toutes les catégories")),
                          DropdownMenuItem(value: 'ADMIN', child: Text("ADMIN")),
                          DropdownMenuItem(value: 'MEMBER', child: Text("MEMBER")),
                          DropdownMenuItem(value: 'EVENT', child: Text("EVENT")),
                          DropdownMenuItem(value: 'OTHER', child: Text("AUTRE")),
                        ],
                        onChanged: (val) => setState(() => _categoryFilter = val!),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Vertical List of Cards
            if (filteredDocs.isEmpty)
              _buildEmptyState()
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: filteredDocs.length,
                separatorBuilder: (_, __) => const SizedBox(height: 16),
                itemBuilder: (context, index) => _buildModernDocCard(filteredDocs[index]),
              ),
            
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildModernDocCard(AppDocument doc) {
    final bool isPdf = doc.fileType.contains('pdf');
    
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: (isPdf ? Colors.redAccent : const Color(0xFF10B981)).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Icon(
                    isPdf ? Icons.picture_as_pdf : Icons.description,
                    color: isPdf ? Colors.redAccent : const Color(0xFF10B981),
                    size: 32,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        doc.title,
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        doc.description ?? "Aucune description",
                        style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Divider(color: Color(0xFF1E293B), height: 1),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Row(
              children: [
                _buildBadge(doc.category.name, const Color(0xFF10B981)),
                if (doc.isPublic) ...[
                  const SizedBox(width: 8),
                  _buildBadge("PUBLIC", Colors.blueAccent),
                ],
                const Spacer(),
                Text(
                  "${(doc.fileSize / 1024 / 1024).toStringAsFixed(1)} MB",
                  style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.bold),
                ),
                const SizedBox(width: 12),
                IconButton(
                  onPressed: () => _deleteDocument(doc),
                  icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 20),
                  constraints: const BoxConstraints(),
                  padding: EdgeInsets.zero,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Text(
        label,
        style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        children: const [
          SizedBox(height: 60),
          Icon(Icons.folder_open, size: 64, color: Color(0xFF1E293B)),
          SizedBox(height: 16),
          Text("Aucun document trouvé", style: TextStyle(color: Color(0xFF64748B))),
        ],
      ),
    );
  }

  void _deleteDocument(AppDocument doc) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: const Text("Supprimer définitivement ce document ?", style: TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      await Provider.of<DataContext>(context, listen: false).deleteDocument(doc.id);
    }
  }
}

class DocumentFormModal extends StatefulWidget {
  const DocumentFormModal({super.key});

  @override
  State<DocumentFormModal> createState() => _DocumentFormModalState();
}

class _DocumentFormModalState extends State<DocumentFormModal> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  File? _selectedFile;
  String _category = 'OTHER';
  bool _isPublic = false;
  bool _sharedWithAll = false;
  bool _isLoading = false;

  Future<void> _pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['pdf', 'doc', 'docx', 'jpg', 'png'],
      );

      if (result != null && result.files.single.path != null) {
        setState(() => _selectedFile = File(result.files.single.path!));
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Erreur lors de la sélection : $e")),
        );
      }
    }
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate() || _selectedFile == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Veuillez sélectionner un fichier")));
      return;
    }

    setState(() => _isLoading = true);
    try {
      final controller = DocumentController();
      await controller.uploadDocument(
        title: _titleController.text,
        description: _descController.text,
        file: _selectedFile!,
        category: _category,
        isPublic: _isPublic,
        sharedWithAll: _sharedWithAll,
      );
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('ADMIN');
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e")));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      insetPadding: const EdgeInsets.all(16),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Nouveau Document", style: GoogleFonts.blackHanSans(fontSize: 24, color: Colors.white)),
              const SizedBox(height: 24),
              
              // File Picker Area
              GestureDetector(
                onTap: _pickFile,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 32),
                  decoration: BoxDecoration(
                    color: Colors.black26,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: _selectedFile != null ? const Color(0xFF10B981) : const Color(0xFF1E293B), style: BorderStyle.solid),
                  ),
                  child: Column(
                    children: [
                      Icon(
                        _selectedFile != null ? Icons.check_circle : Icons.upload_file,
                        color: _selectedFile != null ? const Color(0xFF10B981) : const Color(0xFF64748B),
                        size: 48,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        _selectedFile != null ? p.basename(_selectedFile!.path) : "Cliquez pour choisir un fichier",
                        style: TextStyle(color: _selectedFile != null ? Colors.white : const Color(0xFF64748B), fontWeight: FontWeight.bold),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),
              _buildInput("Titre", _titleController),
              const SizedBox(height: 16),
              _buildInput("Description", _descController, maxLines: 2),
              const SizedBox(height: 24),
              
              const Text("OPTIONS DE PARTAGE", style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
              const SizedBox(height: 8),
              SwitchListTile(
                title: const Text("Rendre Public", style: TextStyle(color: Colors.white, fontSize: 14)),
                subtitle: const Text("Visible par tous sans connexion", style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                value: _isPublic,
                onChanged: (v) => setState(() => _isPublic = v),
                activeColor: const Color(0xFF10B981),
                contentPadding: EdgeInsets.zero,
              ),
              SwitchListTile(
                title: const Text("Partager à tous les membres", style: TextStyle(color: Colors.white, fontSize: 14)),
                subtitle: const Text("Envoie une notification collective", style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                value: _sharedWithAll,
                onChanged: (v) => setState(() => _sharedWithAll = v),
                activeColor: const Color(0xFF10B981),
                contentPadding: EdgeInsets.zero,
              ),

              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isLoading ? null : _handleSubmit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 56),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: _isLoading 
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("PUBLIER LE DOCUMENT", style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInput(String label, TextEditingController controller, {int maxLines = 1}) {
    return TextFormField(
      controller: controller,
      maxLines: maxLines,
      style: const TextStyle(color: Colors.white),
      validator: (v) => v!.isEmpty ? "Champs requis" : null,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Color(0xFF64748B)),
        filled: true,
        fillColor: Colors.black26,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      ),
    );
  }
}
