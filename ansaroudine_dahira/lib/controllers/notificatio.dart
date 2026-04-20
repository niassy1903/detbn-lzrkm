import '../services/api_service.dart';
import '../services/socket_service.dart';
import '../types.dart';

class NotificationController {
  final SocketService _socketService = SocketService();

  Stream<AppNotification> get onNotificationReceived => 
    _socketService.notificationsStream.map((data) => AppNotification.fromJson(data));

  Future<List<AppNotification>> getNotifications() async {
    final data = await ApiService.getNotifications();
    return (data as List).map((n) => AppNotification.fromJson(n)).toList();
  }

  Future<AppNotification> createNotification(Map<String, dynamic> notifData) async {
    final data = await ApiService.createNotification(notifData);
    return AppNotification.fromJson(data);
  }

  Future<void> markAsRead(String id) async {
    await ApiService.markNotificationAsRead(id);
  }

  Future<void> deleteNotification(String id) async {
    await ApiService.deleteNotification(id);
  }
}
