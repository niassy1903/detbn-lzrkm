import 'dart:convert';
import 'dart:io';
import 'package:path/path.dart' as p;
import '../services/api_service.dart';
import '../models/document.dart';

class DocumentController {
  Future<List<AppDocument>> getDocuments() async {
    final data = await ApiService.getDocuments();
    return (data as List).map((doc) => AppDocument.fromJson(doc)).toList();
  }

  /// Upload direct du fichier en le convertissant en Base64
  Future<AppDocument> uploadDocument({
    required String title,
    String? description,
    required File file,
    required String category,
    bool isPublic = false,
    bool sharedWithAll = false,
    List<String>? recipients,
  }) async {
    // 1. Préparer les métadonnées du fichier
    final bytes = await file.readAsBytes();
    final fileSize = bytes.length;
    final extension = p.extension(file.path).replaceAll('.', '');
    final fileType = _determineMimeType(extension);
    
    // 2. Convertir en Base64
    final base64File = 'data:$fileType;base64,${base64Encode(bytes)}';

    // 3. Construire l'objet pour le backend (conforme à votre contrôleur Node.js)
    final Map<String, dynamic> docData = {
      'title': title,
      'description': description,
      'fileUrl': base64File, // On envoie le contenu direct ici
      'fileType': fileType,
      'fileSize': fileSize,
      'category': category,
      'isPublic': isPublic,
      'sharedWithAll': sharedWithAll,
      'recipients': recipients ?? [],
    };

    final data = await ApiService.uploadDocument(docData);
    return AppDocument.fromJson(data);
  }

  Future<void> deleteDocument(String id) async {
    await ApiService.deleteDocument(id);
  }

  String _determineMimeType(String ext) {
    switch (ext.toLowerCase()) {
      case 'pdf': return 'application/pdf';
      case 'doc':
      case 'docx': return 'application/msword';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      default: return 'application/octet-stream';
    }
  }
}
