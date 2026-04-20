import '../core/constant.dart';

class AppDocument {
  final String id;
  final String title;
  final String? description;
  final String fileUrl;
  final String fileType;
  final int fileSize;
  final String uploadedBy;
  final DocumentCategory category;
  final bool isPublic;
  final bool sharedWithAll;
  final List<String> recipients;
  final DateTime createdAt;
  final DateTime updatedAt;

  AppDocument({
    required this.id,
    required this.title,
    this.description,
    required this.fileUrl,
    required this.fileType,
    required this.fileSize,
    required this.uploadedBy,
    required this.category,
    required this.isPublic,
    required this.sharedWithAll,
    required this.recipients,
    required this.createdAt,
    required this.updatedAt,
  });

  factory AppDocument.fromJson(Map<String, dynamic> json) {
    String uploader = '';
    if (json['uploadedBy'] != null) {
      uploader = json['uploadedBy'] is Map 
          ? (json['uploadedBy']['name'] ?? json['uploadedBy']['_id'] ?? '').toString() 
          : json['uploadedBy'].toString();
    }

    List<String> recipientsList = [];
    if (json['recipients'] != null && json['recipients'] is List) {
      recipientsList = (json['recipients'] as List).map((r) {
        if (r is Map) return (r['_id'] ?? '').toString();
        return r.toString();
      }).where((id) => id.isNotEmpty).toList();
    }

    return AppDocument(
      id: json['_id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString(),
      fileUrl: json['fileUrl']?.toString() ?? '',
      fileType: json['fileType']?.toString() ?? '',
      fileSize: json['fileSize'] is int ? json['fileSize'] : (int.tryParse(json['fileSize']?.toString() ?? '0') ?? 0),
      uploadedBy: uploader,
      category: DocumentCategory.values.firstWhere(
        (e) => e.name == (json['category']?.toString() ?? 'OTHER'),
        orElse: () => DocumentCategory.OTHER,
      ),
      isPublic: json['isPublic'] ?? false,
      sharedWithAll: json['sharedWithAll'] ?? false,
      recipients: recipientsList,
      createdAt: json['createdAt'] != null 
          ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
      updatedAt: json['updatedAt'] != null 
          ? DateTime.tryParse(json['updatedAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'fileUrl': fileUrl,
      'fileType': fileType,
      'fileSize': fileSize,
      'category': category.name,
      'isPublic': isPublic,
      'sharedWithAll': sharedWithAll,
      'recipients': recipients,
    };
  }
}
