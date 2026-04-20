import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/member_layout.dart';
import '../../models/notification.dart';
import '../../core/constant.dart';

class MemberNotifications extends StatefulWidget {
  const MemberNotifications({super.key});

  @override
  State<MemberNotifications> createState() => _MemberNotificationsState();
}

class _MemberNotificationsState extends State<MemberNotifications> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<DataContext>(context, listen: false).refreshData('MEMBER');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final notifications = data.notifications;

    return MemberLayout(
      title: "Mes Notifications",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Centre d'alertes",
                style: GoogleFonts.blackHanSans(fontSize: 28, color: Colors.white)),
            const SizedBox(height: 8),
            const Text("Restez informé des activités de la Dahira.",
                style: TextStyle(color: Color(0xFF64748B), fontSize: 14)),
            
            const SizedBox(height: 32),

            if (notifications.isEmpty)
              _buildEmptyState()
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: notifications.length,
                separatorBuilder: (_, __) => const SizedBox(height: 16),
                itemBuilder: (context, index) => _buildMemberNotifCard(notifications[index]),
              ),
            
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildMemberNotifCard(AppNotification notif) {
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

    return GestureDetector(
      onTap: () {
        if (!notif.isRead) {
          Provider.of<DataContext>(context, listen: false).markNotificationAsRead(notif.id);
        }
      },
      child: Container(
        decoration: BoxDecoration(
          color: notif.isRead ? const Color(0xFF0F172A) : const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: notif.isRead ? const Color(0xFF1E293B) : const Color(0xFF10B981).withOpacity(0.3),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: typeColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(typeIcon, color: typeColor, size: 20),
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
                          DateFormat('dd MMM • HH:mm').format(notif.createdAt),
                          style: const TextStyle(color: Color(0xFF64748B), fontSize: 10),
                        ),
                        if (!notif.isRead)
                          Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                          ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      notif.title,
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: notif.isRead ? FontWeight.normal : FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      notif.message,
                      style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13, height: 1.4),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
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
          Text("Vous n'avez aucune notification", style: TextStyle(color: Color(0xFF64748B))),
        ],
      ),
    );
  }
}
