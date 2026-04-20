import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';
import '../services/socket_service.dart';
import '../types.dart';

class DataContext with ChangeNotifier {
  List<User> _members = [];
  List<DahiraEvent> _events = [];
  List<AppNotification> _notifications = [];
  List<Message> _messages = [];
  List<AppDocument> _documents = [];
  List<NewsItem> _news = [];
  List<GalleryItem> _gallery = [];
  bool _loading = false;
  String? _userRole;

  DataContext() {
    _initSocketListeners();
  }

  void _initSocketListeners() {
    SocketService().notificationsStream.listen((data) {
      _notifications.insert(0, AppNotification.fromJson(data));
      notifyListeners();
    });

    SocketService().messagesStream.listen((data) {
      _messages.insert(0, Message.fromJson(data));
      notifyListeners();
    });
  }

  List<User> get members => _members;
  List<DahiraEvent> get events => _events;
  List<AppNotification> get notifications => _notifications;
  List<Message> get messages => _messages;
  List<AppDocument> get documents => _documents;
  List<NewsItem> get news => _news;
  List<GalleryItem> get gallery => _gallery;
  bool get loading => _loading;

  Future<void> refreshData(String? role) async {
    _loading = true;
    _userRole = role;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      // Public Data
      final eventsData = await ApiService.getEvents();
      final newsData = await ApiService.getNews();
      final galleryData = await ApiService.getGallery();

      _events = (eventsData as List).map((e) => DahiraEvent.fromJson(e)).toList();
      _news = (newsData as List).map((n) => NewsItem.fromJson(n)).toList();
      _gallery = (galleryData as List).map((g) => GalleryItem.fromJson(g)).toList();

      // Authenticated Data
      if (token != null) {
        final messagesData = await ApiService.getMessages();
        final documentsData = await ApiService.getDocuments();
        final notificationsData = await ApiService.getNotifications();

        _messages = (messagesData as List).map((m) => Message.fromJson(m)).toList();
        _documents = (documentsData as List).map((d) => AppDocument.fromJson(d)).toList();
        _notifications = (notificationsData as List).map((n) => AppNotification.fromJson(n)).toList();

        if (_userRole == 'ADMIN') {
          final membersData = await ApiService.getUsers();
          _members = (membersData as List).map((m) => User.fromJson(m)).toList();
        }
      } else {
        _messages = [];
        _documents = [];
        _notifications = [];
        _members = [];
      }
    } catch (e) {
      debugPrint('Error fetching data: $e');
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  // Members
  Future<void> addMember(Map<String, dynamic> member) async {
    await ApiService.register(member);
    await refreshData(_userRole);
  }

  Future<void> updateMember(String id, Map<String, dynamic> member) async {
    await ApiService.updateUser(id, member);
    await refreshData(_userRole);
  }

  Future<void> deleteMember(String id) async {
    await ApiService.deleteUser(id);
    await refreshData(_userRole);
  }

  // Events
  Future<void> addEvent(Map<String, dynamic> event) async {
    await ApiService.createEvent(event);
    await refreshData(_userRole);
  }

  Future<void> updateEvent(String id, Map<String, dynamic> event) async {
    await ApiService.updateEvent(id, event);
    await refreshData(_userRole);
  }

  Future<void> deleteEvent(String id) async {
    await ApiService.deleteEvent(id);
    await refreshData(_userRole);
  }

  Future<void> participateInEvent(String eventId) async {
    await ApiService.participateInEvent(eventId);
    await refreshData(_userRole);
  }

  // News
  Future<void> addNews(Map<String, dynamic> item) async {
    await ApiService.createNews(item);
    await refreshData(_userRole);
  }

  Future<void> updateNews(String id, Map<String, dynamic> item) async {
    await ApiService.updateNews(id, item);
    await refreshData(_userRole);
  }

  Future<void> deleteNews(String id) async {
    await ApiService.deleteNews(id);
    await refreshData(_userRole);
  }

  // Gallery
  Future<void> addGalleryItem(Map<String, dynamic> item) async {
    await ApiService.createGalleryItem(item);
    await refreshData(_userRole);
  }

  Future<void> deleteGalleryItem(String id) async {
    await ApiService.deleteGalleryItem(id);
    await refreshData(_userRole);
  }

  // Messages
  Future<void> addMessage(Map<String, dynamic> message) async {
    await ApiService.sendMessage(message);
    await refreshData(_userRole);
  }

  Future<void> deleteMessage(String id) async {
    await ApiService.deleteMessage(id);
    await refreshData(_userRole);
  }

  Future<void> markMessageAsRead(String id) async {
    await ApiService.markMessageAsRead(id);
    await refreshData(_userRole);
  }

  // Documents
  Future<void> addDocument(Map<String, dynamic> doc) async {
    await ApiService.uploadDocument(doc);
    await refreshData(_userRole);
  }

  Future<void> deleteDocument(String id) async {
    await ApiService.deleteDocument(id);
    await refreshData(_userRole);
  }

  // Notifications
  Future<void> addNotification(Map<String, dynamic> notification) async {
    await ApiService.createNotification(notification);
    await refreshData(_userRole);
  }

  Future<void> deleteNotification(String id) async {
    await ApiService.deleteNotification(id);
    await refreshData(_userRole);
  }

  Future<void> markNotificationAsRead(String id) async {
    await ApiService.markNotificationAsRead(id);
    await refreshData(_userRole);
  }
}
