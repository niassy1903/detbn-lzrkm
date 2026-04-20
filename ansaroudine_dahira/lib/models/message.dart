import '../core/constant.dart';

class Message {
  final String id;
  final String sender;
  final String? recipient;
  final String subject;
  final String content;
  final bool isRead;
  final MessageType type;
  final DateTime createdAt;

  Message({
    required this.id,
    required this.sender,
    this.recipient,
    required this.subject,
    required this.content,
    required this.isRead,
    required this.type,
    required this.createdAt,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    // Sécurisation du sender (peut être un ID ou un objet User)
    String senderId = '';
    if (json['sender'] != null) {
      senderId = json['sender'] is Map ? (json['sender']['_id'] ?? json['sender']['name'] ?? '').toString() : json['sender'].toString();
    }

    // Sécurisation du recipient (peut être un ID ou un objet User)
    String? recipientId;
    if (json['recipient'] != null) {
      recipientId = json['recipient'] is Map ? (json['recipient']['_id'] ?? '').toString() : json['recipient'].toString();
    }

    return Message(
      id: json['_id']?.toString() ?? '',
      sender: senderId,
      recipient: recipientId,
      subject: json['subject']?.toString() ?? '',
      content: json['content']?.toString() ?? '',
      isRead: json['isRead'] ?? false,
      type: MessageType.values.firstWhere(
        (e) => e.name == (json['type']?.toString() ?? 'DIRECT'),
        orElse: () => MessageType.DIRECT,
      ),
      createdAt: json['createdAt'] != null 
          ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
