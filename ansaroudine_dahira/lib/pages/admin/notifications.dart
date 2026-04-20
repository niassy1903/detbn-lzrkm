import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../models/notification.dart';
import '../../core/constant.dart';

class AdminNotifications extends StatefulWidget {
  const AdminNotifications({super.key});

  @override
  State<AdminNotifications> createState() => _AdminNotificationsState();
}

class _AdminNotificationsState extends State<AdminNotifications> {
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
      builder: (context) => const NotificationFormModal(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final notifications = data.notifications;

    return AdminLayout(
      title: "Notifications",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Text("Espace Alertes",
                style: GoogleFonts.blackHanSans(fontSize: 28, color: Colors.white)),
            const SizedBox(height: 8),
            const Text("Envoyez des messages importants aux membres.",
                style: TextStyle(color: Color(0xFF64748B), fontSize: 14)),
            
            const SizedBox(height: 32),
            
            ElevatedButton.icon(
              onPressed: _showAddModal,
              icon: const Icon(Icons.add_alert_rounded),
              label: const Text("NOUVELLE NOTIFICATION"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),

            const SizedBox(height: 32),

            if (notifications.isEmpty)
              _buildEmptyState()
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: notifications.length,
                separatorBuilder: (_, __) => const SizedBox(height: 16),
                itemBuilder: (context, index) => _buildNotifCard(notifications[index]),
              ),
            
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildNotifCard(AppNotification notif) {
    Color typeColor;
    IconData typeIcon;

    switch (notif.type) {
      case NotificationType.SUCCESS:
        typeColor = const Color(0xFF10B981);
        typeIcon = Icons.check_circle_outline_rounded;
        break;
      case NotificationType.WARNING:
        typeColor = Colors.orangeAccent;
        typeIcon = Icons.warning_amber_rounded;
        break;
      case NotificationType.ERROR:
        typeColor = Colors.redAccent;
        typeIcon = Icons.error_outline_rounded;
        break;
      default:
        typeColor = const Color(0xFF3B82F6);
        typeIcon = Icons.info_outline_rounded;
    }

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
                    color: typeColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Icon(typeIcon, color: typeColor, size: 24),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          _buildBadge(notif.type.name, typeColor),
                          Text(
                            DateFormat('dd/MM HH:mm').format(notif.createdAt),
                            style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        notif.title,
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        notif.message,
                        style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 14, height: 1.5),
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
                if (notif.recipient == null)
                  _buildBadge("GLOBAL", const Color(0xFF64748B))
                else
                  _buildBadge("INDIVIDUEL", const Color(0xFF3B82F6)),
                const Spacer(),
                IconButton(
                  onPressed: () => _deleteNotification(notif.id),
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
          Icon(Icons.notifications_none_rounded, size: 64, color: Color(0xFF1E293B)),
          SizedBox(height: 16),
          Text("Aucune notification envoyée", style: TextStyle(color: Color(0xFF64748B))),
        ],
      ),
    );
  }

  void _deleteNotification(String id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Supprimer", style: TextStyle(color: Colors.white)),
        content: const Text("Voulez-vous supprimer cette notification ?", style: TextStyle(color: Colors.white70)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("Annuler")),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text("Supprimer", style: TextStyle(color: Colors.redAccent))),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      await Provider.of<DataContext>(context, listen: false).deleteNotification(id);
    }
  }
}

class NotificationFormModal extends StatefulWidget {
  const NotificationFormModal({super.key});

  @override
  State<NotificationFormModal> createState() => _NotificationFormModalState();
}

class _NotificationFormModalState extends State<NotificationFormModal> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _messageController = TextEditingController();
  String _type = 'INFO';
  String? _selectedRecipient;
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final members = data.members;

    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Nouvelle Alerte", style: GoogleFonts.blackHanSans(fontSize: 24, color: Colors.white)),
              const SizedBox(height: 24),
              
              const Text("DESTINATAIRE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.black26,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String?>(
                    isExpanded: true,
                    dropdownColor: const Color(0xFF1E293B),
                    value: _selectedRecipient,
                    hint: const Text("Tous les membres (Global)", style: TextStyle(color: Colors.white70)),
                    style: const TextStyle(color: Colors.white),
                    items: [
                      const DropdownMenuItem<String?>(value: null, child: Text("Tous les membres (Global)")),
                      ...members.map((m) => DropdownMenuItem<String?>(value: m.id, child: Text(m.name))),
                    ],
                    onChanged: (val) => setState(() => _selectedRecipient = val),
                  ),
                ),
              ),
              
              const SizedBox(height: 20),
              _buildInput("Titre", _titleController),
              const SizedBox(height: 16),
              _buildInput("Message", _messageController, maxLines: 3),
              const SizedBox(height: 20),
              
              const Text("TYPE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: ['INFO', 'SUCCESS', 'WARNING', 'ERROR'].map((t) {
                  final isSelected = _type == t;
                  return GestureDetector(
                    onTap: () => setState(() => _type = t),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: isSelected ? const Color(0xFF10B981) : Colors.black26,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(t, style: TextStyle(color: isSelected ? Colors.white : Colors.white54, fontSize: 10, fontWeight: FontWeight.bold)),
                    ),
                  );
                }).toList(),
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
                  : const Text("ENVOYER L'ALERTE", style: TextStyle(fontWeight: FontWeight.bold)),
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

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);
    try {
      final data = Provider.of<DataContext>(context, listen: false);
      await data.addNotification({
        'recipient': _selectedRecipient,
        'title': _titleController.text,
        'message': _messageController.text,
        'type': _type,
      });
      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e")));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }
}
