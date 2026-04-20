import 'package:flutter/material.dart';
import '../services/api_service.dart';

class NotificationContext with ChangeNotifier {
  List<Map<String, dynamic>> _notifications = [];
  bool _isLoading = false;

  List<Map<String, dynamic>> get notifications => _notifications;
  bool get isLoading => _isLoading;
  int get unreadCount => _notifications.where((n) => !(n['read'] ?? false)).length;

  Future<void> refreshNotifications(bool isAuthenticated) async {
    if (!isAuthenticated) {
      _notifications = [];
      notifyListeners();
      return;
    }

    _isLoading = true;
    notifyListeners();

    try {
      final data = await ApiService.getNotifications();
      _notifications = List<Map<String, dynamic>>.from(data);
    } catch (e) {
      debugPrint('Error fetching notifications: $e');
      _notifications = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> markAsRead(String id) async {
    try {
      await ApiService.markNotificationAsRead(id);
      final index = _notifications.indexWhere((n) => (n['_id'] ?? n['id']) == id);
      if (index != -1) {
        _notifications[index]['read'] = true;
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error marking notification as read: $e');
    }
  }

  Future<void> deleteNotification(String id) async {
    try {
      await ApiService.deleteNotification(id);
      _notifications.removeWhere((n) => (n['_id'] ?? n['id']) == id);
      notifyListeners();
    } catch (e) {
      debugPrint('Error deleting notification: $e');
    }
  }

  Future<void> clearAll() async {
    try {
      // Assuming we need to clear one by one if there's no backend clearAll
      await Future.wait(_notifications.map((n) => ApiService.deleteNotification(n['_id'] ?? n['id'])));
      _notifications = [];
      notifyListeners();
    } catch (e) {
      debugPrint('Error clearing all notifications: $e');
    }
  }

  Future<void> addNotification(Map<String, dynamic> notif) async {
    try {
      await ApiService.createNotification(notif);
      await refreshNotifications(true);
    } catch (e) {
      debugPrint('Error adding notification: $e');
    }
  }
}
