import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/event.dart';
import '../../components/image_upload.dart';

class AdminEvents extends StatefulWidget {
  const AdminEvents({super.key});

  @override
  State<AdminEvents> createState() => _AdminEventsState();
}

class _AdminEventsState extends State<AdminEvents> {
  String _searchTerm = '';
  String _statusFilter = 'ALL';

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('ADMIN');
      }
    });
  }

  void _showEventModal([DahiraEvent? event]) {
    showDialog(
      context: context,
      builder: (context) => EventFormModal(event: event),
    );
  }

  void _showParticipantsModal(DahiraEvent event) {
    showDialog(
      context: context,
      builder: (context) => ParticipantsModal(event: event),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final events = data.events;

    final filteredEvents = events.where((e) {
      final matchesSearch = e.title.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          e.description.toLowerCase().contains(_searchTerm.toLowerCase());
      final matchesStatus = _statusFilter == 'ALL' || e.status.name == _statusFilter;
      return matchesSearch && matchesStatus;
    }).toList();

    return AdminLayout(
      title: "Gestion Événements",
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
                      Text("Gestion des Événements",
                          style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                      const SizedBox(height: 4),
                      const Text("Planifiez, modifiez et suivez la participation aux événements.",
                          style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500, fontSize: 16)),
                    ],
                  ),
                ),
                const SizedBox(width: 24),
                ElevatedButton.icon(
                  onPressed: () => _showEventModal(),
                  icon: const Icon(Icons.add, size: 20),
                  label: const Text("Créer un événement", style: TextStyle(fontWeight: FontWeight.bold)),
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
                          hintText: "Rechercher un événement...",
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
                      width: isWide ? 200 : double.infinity,
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFF1E293B)),
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          dropdownColor: const Color(0xFF1E293B),
                          value: _statusFilter,
                          isExpanded: true,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          items: const [
                            DropdownMenuItem(value: 'ALL', child: Text("Tous les statuts")),
                            DropdownMenuItem(value: 'UPCOMING', child: Text("À venir")),
                            DropdownMenuItem(value: 'ONGOING', child: Text("En cours")),
                            DropdownMenuItem(value: 'COMPLETED', child: Text("Terminé")),
                          ],
                          onChanged: (val) => setState(() => _statusFilter = val!),
                        ),
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.filter_list, size: 20),
                      label: const Text("Plus de filtres"),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0F172A),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        side: const BorderSide(color: Color(0xFF1E293B)),
                      ),
                    ),
                  ],
                );
              },
            ),

            const SizedBox(height: 40),

            // Events Grid
            LayoutBuilder(
              builder: (context, constraints) {
                int crossAxisCount = constraints.maxWidth > 1200 ? 2 : 1;
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    mainAxisExtent: 600,
                  ),
                  itemCount: filteredEvents.length,
                  itemBuilder: (context, index) {
                    final event = filteredEvents[index];
                    return _buildEventCard(event);
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


  Widget _buildEventCard(DahiraEvent event) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              SizedBox(
                height: 220,
                width: double.infinity,
                child: event.image != null && event.image!.isNotEmpty
                    ? (event.image!.startsWith('data:image') 
                        ? Image.memory(base64Decode(event.image!.split(',').last), fit: BoxFit.cover)
                        : Image.network(event.image!, fit: BoxFit.cover, errorBuilder: (c, e, s) => Container(color: const Color(0xFF1E293B))))
                    : Container(color: const Color(0xFF1E293B)),
              ),
              Container(
                height: 220,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black.withValues(alpha: 0.8)],
                  ),
                ),
              ),
              Positioned(
                top: 20,
                left: 20,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    event.status.name,
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),
                  ),
                ),
              ),
              Positioned(
                bottom: 20,
                left: 24,
                right: 24,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(event.title, style: GoogleFonts.blackHanSans(color: Colors.white, fontSize: 24)),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.calendar_today, size: 14, color: Color(0xFF10B981)),
                        const SizedBox(width: 6),
                        Text(DateFormat('d MMMM', 'fr_FR').format(event.date),
                            style: const TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w500)),
                        const SizedBox(width: 16),
                        const Icon(Icons.location_on_outlined, size: 14, color: Color(0xFF10B981)),
                        const SizedBox(width: 6),
                        Text(event.location,
                            style: const TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(event.description,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 14, height: 1.5)),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: const Color(0xFF1E293B)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: const Color(0xFF10B981).withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Icon(Icons.people, color: Color(0xFF10B981), size: 24),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text("PARTICIPANTS",
                                  style: TextStyle(color: Color(0xFF64748B), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),
                              Text("${event.participants.length}",
                                  style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                      ),
                      TextButton(
                        onPressed: () => _showParticipantsModal(event),
                        child: const Text("Voir la liste",
                            style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: () => _showEventModal(event),
                        icon: const Icon(Icons.edit, size: 16),
                        label: const Text("Modifier"),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1E293B),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          side: const BorderSide(color: Color(0xFF334155)),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    IconButton(
                      onPressed: () => _deleteEvent(event),
                      icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
                      style: IconButton.styleFrom(
                        backgroundColor: Colors.redAccent.withValues(alpha: 0.1),
                        padding: const EdgeInsets.all(16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _deleteEvent(DahiraEvent event) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: Text("Voulez-vous supprimer l'événement \"${event.title}\" ?", style: const TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      try {
        await Provider.of<DataContext>(context, listen: false).deleteEvent(event.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Événement supprimé")));
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e"), backgroundColor: Colors.redAccent));
        }
      }
    }
  }
}

class EventFormModal extends StatefulWidget {
  final DahiraEvent? event;
  const EventFormModal({super.key, this.event});

  @override
  State<EventFormModal> createState() => _EventFormModalState();
}

class _EventFormModalState extends State<EventFormModal> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  late TextEditingController _descController;
  late TextEditingController _locController;
  late DateTime _selectedDate;
  late String _status;
  String? _imageBase64;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.event?.title ?? '');
    _descController = TextEditingController(text: widget.event?.description ?? '');
    _locController = TextEditingController(text: widget.event?.location ?? '');
    _selectedDate = widget.event?.date ?? DateTime.now();
    _status = widget.event?.status.name ?? 'UPCOMING';
    _imageBase64 = widget.event?.image;
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    _locController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);
    final dataContext = Provider.of<DataContext>(context, listen: false);

    final eventData = {
      'title': _titleController.text,
      'description': _descController.text,
      'location': _locController.text,
      'date': _selectedDate.toIso8601String(),
      'time': widget.event?.time ?? "00:00",
      'category': widget.event?.category ?? "Général",
      'status': _status,
      if (_imageBase64 != null) 'image': _imageBase64,
    };

    try {
      if (widget.event != null) {
        await dataContext.updateEvent(widget.event!.id, eventData);
      } else {
        await dataContext.addEvent(eventData);
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
        constraints: const BoxConstraints(maxWidth: 600),
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
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: const Color(0xFF10B981).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
                    child: Icon(widget.event != null ? Icons.edit : Icons.add, color: const Color(0xFF10B981)),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.event != null ? "Modifier l'événement" : "Créer un événement",
                            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                        const Text("Définissez les détails de l'événement.",
                            style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
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
                padding: const EdgeInsets.all(24),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      ImageUpload(
                        label: "Image de couverture",
                        initialImage: _imageBase64,
                        onImageSelect: (base64) => setState(() => _imageBase64 = base64),
                      ),
                      const SizedBox(height: 24),
                      _buildField("Titre de l'événement", _titleController, Icons.title),
                      const SizedBox(height: 20),
                      _buildField("Description", _descController, Icons.notes, maxLines: 3),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text("DATE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                                const SizedBox(height: 8),
                                InkWell(
                                  onTap: () async {
                                    final date = await showDatePicker(
                                      context: context,
                                      initialDate: _selectedDate,
                                      firstDate: DateTime.now().subtract(const Duration(days: 365)),
                                      lastDate: DateTime.now().add(const Duration(days: 365 * 2)),
                                    );
                                    if (date != null) setState(() => _selectedDate = date);
                                  },
                                  child: Container(
                                    padding: const EdgeInsets.all(16),
                                    decoration: BoxDecoration(
                                      color: Colors.black.withValues(alpha: 0.3),
                                      borderRadius: BorderRadius.circular(16),
                                      border: Border.all(color: const Color(0xFF1E293B)),
                                    ),
                                    child: Row(
                                      children: [
                                        const Icon(Icons.calendar_today, size: 18, color: Color(0xFF64748B)),
                                        const SizedBox(width: 12),
                                        Text(DateFormat('dd/MM/yyyy').format(_selectedDate), style: const TextStyle(color: Colors.white)),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: _buildField("Lieu", _locController, Icons.location_on),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text("STATUT", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
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
                                      value: _status,
                                      items: const [
                                        DropdownMenuItem(value: 'UPCOMING', child: Text("À venir", style: TextStyle(color: Colors.white))),
                                        DropdownMenuItem(value: 'ONGOING', child: Text("En cours", style: TextStyle(color: Colors.white))),
                                        DropdownMenuItem(value: 'COMPLETED', child: Text("Terminé", style: TextStyle(color: Colors.white))),
                                      ],
                                      onChanged: (val) => setState(() => _status = val!),
                                    ),
                                  ),
                                ),
                              ],
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
              padding: const EdgeInsets.all(24),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text("Annuler", style: TextStyle(color: Colors.white70)),
                  ),
                  const SizedBox(width: 16),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _handleSubmit,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF10B981),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: _isLoading 
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text(widget.event != null ? "Mettre à jour" : "Créer l'événement"),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, IconData icon, {int maxLines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          maxLines: maxLines,
          style: const TextStyle(color: Colors.white),
          validator: (v) => v == null || v.isEmpty ? "Champ requis" : null,
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: const Color(0xFF64748B), size: 20),
            filled: true,
            fillColor: Colors.black.withValues(alpha: 0.3),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          ),
        ),
      ],
    );
  }
}

class ParticipantsModal extends StatelessWidget {
  final DahiraEvent event;
  const ParticipantsModal({super.key, required this.event});

  @override
  Widget build(BuildContext context) {
    final members = Provider.of<DataContext>(context).members;
    final participantMembers = members.where((m) => event.participants.contains(m.id)).toList();

    return Dialog(
      backgroundColor: Colors.transparent,
      child: Container(
        width: double.infinity,
        constraints: const BoxConstraints(maxWidth: 500),
        height: 600,
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(40),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: const Color(0xFF10B981).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
                    child: const Icon(Icons.people, color: Color(0xFF10B981)),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("Participants", style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                        Text(event.title, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12), overflow: TextOverflow.ellipsis),
                      ],
                    ),
                  ),
                  IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.close, color: Color(0xFF64748B))),
                ],
              ),
            ),
            const Divider(color: Color(0xFF1E293B), height: 1),
            Expanded(
              child: participantMembers.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.people_outline, size: 64, color: Color(0xFF1E293B)),
                          const SizedBox(height: 16),
                          const Text("Aucun participant", style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold)),
                          const Text("Personne n'est encore inscrit.", style: TextStyle(color: Color(0xFF64748B))),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(24),
                      itemCount: participantMembers.length,
                      itemBuilder: (context, index) {
                        final member = participantMembers[index];
                        return Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.black.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: const Color(0xFF1E293B)),
                          ),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 24,
                                backgroundImage: (member.avatar != null && member.avatar!.isNotEmpty)
                                    ? (member.avatar!.startsWith('data:image') 
                                        ? MemoryImage(base64Decode(member.avatar!.split(',').last)) as ImageProvider
                                        : NetworkImage(member.avatar!))
                                    : NetworkImage("https://ui-avatars.com/api/?name=${member.name}"),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(member.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                    Text(member.email, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                                  ],
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(color: const Color(0xFF10B981).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(20)),
                                child: const Text("INSCRIT", style: TextStyle(color: Color(0xFF10B981), fontSize: 8, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text("Fermer"),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
