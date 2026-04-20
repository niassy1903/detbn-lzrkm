import '../services/api_service.dart';
import '../types.dart';

class MessageController {
  Future<List<Message>> getMessages() async {
    final data = await ApiService.getMessages();
    return (data as List).map((m) => Message.fromJson(m)).toList();
  }

  Future<Message> sendMessage(Map<String, dynamic> messageData) async {
    final data = await ApiService.sendMessage(messageData);
    return Message.fromJson(data);
  }

  Future<void> markAsRead(String id) async {
    await ApiService.markMessageAsRead(id);
  }

  Future<void> deleteMessage(String id) async {
    await ApiService.deleteMessage(id);
  }
}
