import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'https://backend-bjzg.onrender.com/api';

  static Future<Map<String, String>> _getHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<dynamic> _handleResponse(http.Response res) async {
    final data = json.decode(res.body);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return data;
    } else {
      throw Exception(data['message'] ?? 'Error: ${res.statusCode}');
    }
  }

  // Auth
  static Future<Map<String, dynamic>> login(Map<String, dynamic> credentials) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(credentials),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(userData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> getProfile() async {
    final res = await http.get(
      Uri.parse('$baseUrl/auth/profile'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Events
  static Future<List<dynamic>> getEvents() async {
    final res = await http.get(Uri.parse('$baseUrl/events'));
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> getEventById(String id) async {
    final res = await http.get(Uri.parse('$baseUrl/events/$id'));
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> createEvent(Map<String, dynamic> eventData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/events'),
      headers: await _getHeaders(),
      body: json.encode(eventData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> updateEvent(String id, Map<String, dynamic> eventData) async {
    final res = await http.put(
      Uri.parse('$baseUrl/events/$id'),
      headers: await _getHeaders(),
      body: json.encode(eventData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteEvent(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/events/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> participateInEvent(String id) async {
    final res = await http.post(
      Uri.parse('$baseUrl/events/$id/participate'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // News
  static Future<List<dynamic>> getNews() async {
    final res = await http.get(Uri.parse('$baseUrl/news'));
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> createNews(Map<String, dynamic> newsData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/news'),
      headers: await _getHeaders(),
      body: json.encode(newsData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> updateNews(String id, Map<String, dynamic> newsData) async {
    final res = await http.put(
      Uri.parse('$baseUrl/news/$id'),
      headers: await _getHeaders(),
      body: json.encode(newsData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteNews(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/news/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Gallery
  static Future<List<dynamic>> getGallery() async {
    final res = await http.get(Uri.parse('$baseUrl/gallery'));
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> createGalleryItem(Map<String, dynamic> itemData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/gallery'),
      headers: await _getHeaders(),
      body: json.encode(itemData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteGalleryItem(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/gallery/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Messages
  static Future<List<dynamic>> getMessages() async {
    final res = await http.get(
      Uri.parse('$baseUrl/messages'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> sendMessage(Map<String, dynamic> messageData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/messages'),
      headers: await _getHeaders(),
      body: json.encode(messageData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> markMessageAsRead(String id) async {
    final res = await http.patch(
      Uri.parse('$baseUrl/messages/$id/read'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteMessage(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/messages/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Documents
  static Future<List<dynamic>> getDocuments() async {
    final res = await http.get(
      Uri.parse('$baseUrl/documents'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> uploadDocument(Map<String, dynamic> docData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/documents'),
      headers: await _getHeaders(),
      body: json.encode(docData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteDocument(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/documents/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Notifications
  static Future<List<dynamic>> getNotifications() async {
    final res = await http.get(
      Uri.parse('$baseUrl/notifications'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> createNotification(Map<String, dynamic> notifData) async {
    final res = await http.post(
      Uri.parse('$baseUrl/notifications'),
      headers: await _getHeaders(),
      body: json.encode(notifData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> markNotificationAsRead(String id) async {
    final res = await http.patch(
      Uri.parse('$baseUrl/notifications/$id/read'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteNotification(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/notifications/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  // Users Management (Admin)
  static Future<List<dynamic>> getUsers() async {
    final res = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> updateUser(String id, Map<String, dynamic> userData) async {
    final res = await http.put(
      Uri.parse('$baseUrl/users/$id'),
      headers: await _getHeaders(),
      body: json.encode(userData),
    );
    return await _handleResponse(res);
  }

  static Future<Map<String, dynamic>> deleteUser(String id) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/users/$id'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(res);
  }
}
