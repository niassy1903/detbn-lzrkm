import '../core/constant.dart';

class AppNotification {
  final String id;
  final String? recipient;
  final String title;
  final String message;
  final NotificationType type;
  final bool isRead;
  final String? link;
  final DateTime createdAt;

  AppNotification({
    required this.id,
    this.recipient,
    required this.title,
    required this.message,
    required this.type,
    required this.isRead,
    this.link,
    required this.createdAt,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    String? recipientId;
    if (json['recipient'] != null) {
      recipientId = json['recipient'] is Map ? (json['recipient']['_id'] ?? '').toString() : json['recipient'].toString();
    }

    return AppNotification(
      id: json['_id']?.toString() ?? '',
      recipient: recipientId,
      title: json['title']?.toString() ?? '',
      message: json['message']?.toString() ?? '',
      type: NotificationType.values.firstWhere(
        (e) => e.name == (json['type']?.toString() ?? 'INFO'),
        orElse: () => NotificationType.INFO,
      ),
      isRead: json['isRead'] ?? false,
      link: json['link']?.toString(),
      createdAt: json['createdAt'] != null 
          ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
