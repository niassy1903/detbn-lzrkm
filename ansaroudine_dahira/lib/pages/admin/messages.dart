import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/message.dart';
import '../../core/constant.dart';

class AdminMessages extends StatefulWidget {
  const AdminMessages({super.key});

  @override
  State<AdminMessages> createState() => _AdminMessagesState();
}

class _AdminMessagesState extends State<AdminMessages> {
  Message? _selectedMessage;
  String _searchTerm = '';

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('ADMIN');
      }
    });
  }

  void _showNewMessageModal() {
    showDialog(
      context: context,
      builder: (context) => const SendMessageModal(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final messages = data.messages;

    final filteredMessages = messages.where((m) {
      return m.subject.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          m.content.toLowerCase().contains(_searchTerm.toLowerCase());
    }).toList();

    return AdminLayout(
      title: "Messagerie",
      child: Container(
        height: MediaQuery.of(context).size.height - 100,
        margin: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(32),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Row(
          children: [
            // Sidebar: Message List
            Container(
              width: 400,
              decoration: const BoxDecoration(
                border: Border(right: BorderSide(color: Color(0xFF1E293B))),
              ),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Messages",
                                style: GoogleFonts.blackHanSans(fontSize: 24, color: Colors.white)),
                            IconButton(
                              onPressed: _showNewMessageModal,
                              icon: const Icon(Icons.add_comment, color: Color(0xFF10B981)),
                              style: IconButton.styleFrom(
                                backgroundColor: const Color(0xFF10B981).withValues(alpha: 0.1),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        TextField(
                          onChanged: (val) => setState(() => _searchTerm = val),
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: InputDecoration(
                            hintText: "Rechercher...",
                            hintStyle: const TextStyle(color: Color(0xFF64748B)),
                            prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B), size: 20),
                            filled: true,
                            fillColor: const Color(0xFF1E293B).withValues(alpha: 0.5),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                            contentPadding: const EdgeInsets.symmetric(vertical: 0),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: ListView.builder(
                      itemCount: filteredMessages.length,
                      itemBuilder: (context, index) {
                        final msg = filteredMessages[index];
                        final isSelected = _selectedMessage?.id == msg.id;
                        return InkWell(
                          onTap: () {
                            setState(() => _selectedMessage = msg);
                            if (!msg.isRead) {
                              Provider.of<DataContext>(context, listen: false).markMessageAsRead(msg.id);
                            }
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF1E293B) : Colors.transparent,
                              border: const Border(bottom: BorderSide(color: Color(0xFF1E293B), width: 0.5)),
                            ),
                            child: Row(
                              children: [
                                CircleAvatar(
                                  radius: 24,
                                  backgroundColor: const Color(0xFF10B981).withValues(alpha: 0.1),
                                  child: Text(msg.sender.substring(0, 1).toUpperCase(),
                                      style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            msg.type.name,
                                            style: TextStyle(
                                              color: msg.type == MessageType.DIRECT ? const Color(0xFF10B981) : Colors.orangeAccent,
                                              fontSize: 10,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          Text(
                                            DateFormat('HH:mm').format(msg.createdAt),
                                            style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        msg.subject,
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: msg.isRead ? FontWeight.normal : FontWeight.bold,
                                          fontSize: 14,
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      Text(
                                        msg.content,
                                        style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),

            // Content Area: Message Details
            Expanded(
              child: _selectedMessage == null
                  ? Center(
                      child: SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.mail_outline, size: 80, color: const Color(0xFF1E293B)),
                            const SizedBox(height: 16),
                            const Text("Sélectionnez un message pour le lire",
                                style: TextStyle(color: Color(0xFF64748B), fontSize: 16)),
                          ],
                        ),
                      ),
                    )
                  : Column(
                      children: [
                        // Header
                        Padding(
                          padding: const EdgeInsets.all(24),
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 24,
                                backgroundColor: const Color(0xFF10B981),
                                child: Text(_selectedMessage!.sender.substring(0, 1).toUpperCase(),
                                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(_selectedMessage!.subject,
                                        style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis),
                                    const SizedBox(height: 4),
                                    Text("De: ${_selectedMessage!.sender}",
                                        style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis),
                                  ],
                                ),
                              ),
                              IconButton(
                                onPressed: () => _deleteMessage(_selectedMessage!.id),
                                icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 20),
                                style: IconButton.styleFrom(
                                  backgroundColor: Colors.redAccent.withValues(alpha: 0.1),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Divider(color: Color(0xFF1E293B), height: 1),
                        // Content
                        Expanded(
                          child: SingleChildScrollView(
                            padding: const EdgeInsets.all(32),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF10B981).withValues(alpha: 0.1),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(_selectedMessage!.type.name,
                                          style: const TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold)),
                                    ),
                                    const SizedBox(width: 12),
                                    Text(
                                      DateFormat('dd MMMM yyyy à HH:mm', 'fr_FR').format(_selectedMessage!.createdAt),
                                      style: const TextStyle(color: Color(0xFF64748B), fontSize: 12),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 32),
                                Text(
                                  _selectedMessage!.content,
                                  style: const TextStyle(color: Colors.white, fontSize: 16, height: 1.6),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }

  void _deleteMessage(String id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: const Text("Voulez-vous supprimer ce message ?", style: TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      await Provider.of<DataContext>(context, listen: false).deleteMessage(id);
      setState(() => _selectedMessage = null);
    }
  }
}

class SendMessageModal extends StatefulWidget {
  const SendMessageModal({super.key});

  @override
  State<SendMessageModal> createState() => _SendMessageModalState();
}

class _SendMessageModalState extends State<SendMessageModal> {
  final _formKey = GlobalKey<FormState>();
  final _subjectController = TextEditingController();
  final _contentController = TextEditingController();
  String? _selectedRecipient;
  String _messageType = 'DIRECT';
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    // Filtrer les utilisateurs (exclure l'admin actuel idéalement)
    final users = data.members; 

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Container(
        width: 600,
        constraints: BoxConstraints(
          maxHeight: MediaQuery.of(context).size.height * 0.8,
        ),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(32),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Nouveau Message", style: GoogleFonts.blackHanSans(fontSize: 24, color: Colors.white)),
                const SizedBox(height: 24),
                
                // Type de message
                const Text("TYPE DE MESSAGE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: ['DIRECT', 'BROADCAST', 'SUPPORT'].map((type) {
                    final isSelected = _messageType == type;
                    return ChoiceChip(
                      label: Text(type, style: TextStyle(fontSize: 12, color: isSelected ? Colors.white : const Color(0xFF64748B))),
                      selected: isSelected,
                      onSelected: (val) => setState(() => _messageType = type),
                      selectedColor: const Color(0xFF10B981),
                      backgroundColor: const Color(0xFF1E293B),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      showCheckmark: false,
                    );
                  }).toList(),
                ),
              const SizedBox(height: 24),

              if (_messageType == 'DIRECT') ...[
                const Text("DESTINATAIRE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
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
                      value: _selectedRecipient,
                      hint: const Text("Sélectionner un membre", style: TextStyle(color: Color(0xFF475569))),
                      style: const TextStyle(color: Colors.white),
                      items: users.map((u) => DropdownMenuItem(value: u.id, child: Text(u.name))).toList(),
                      onChanged: (val) => setState(() => _selectedRecipient = val),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
              ],

              _buildField("Sujet", _subjectController, Icons.subject),
              const SizedBox(height: 24),
              _buildField("Message", _contentController, Icons.message, maxLines: 5),
                const SizedBox(height: 32),

                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(onPressed: () => Navigator.pop(context), child: const Text("Annuler")),
                    const SizedBox(width: 16),
                    ElevatedButton(
                      onPressed: _isLoading ? null : _send,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF10B981),
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: _isLoading ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text("Envoyer"),
                    ),
                  ],
                ),
              ],
            ),
          ),
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
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: const Color(0xFF64748B)),
            filled: true,
            fillColor: Colors.black.withValues(alpha: 0.3),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
          ),
        ),
      ],
    );
  }

  void _send() async {
    if (!_formKey.currentState!.validate()) return;
    if (_messageType == 'DIRECT' && _selectedRecipient == null) return;

    setState(() => _isLoading = true);
    try {
      await Provider.of<DataContext>(context, listen: false).addMessage({
        'recipient': _messageType == 'DIRECT' ? _selectedRecipient : null,
        'subject': _subjectController.text,
        'content': _contentController.text,
        'type': _messageType,
      });
      if (mounted) Navigator.pop(context);
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }
}
