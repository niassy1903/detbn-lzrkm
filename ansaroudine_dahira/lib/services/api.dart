import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Api {
  static const String baseUrl = 'https://backend-bjzg.onrender.com/api';

  static Future<Map<String, String>> _getHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<dynamic> _handleResponse(http.Response response) async {
    final data = json.decode(response.body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return data;
    } else {
      throw Exception(data['message'] ?? 'Erreur: ${response.statusCode}');
    }
  }

  // Auth
  static Future<Map<String, dynamic>> login(Map<String, dynamic> credentials) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(credentials),
    );
    return await _handleResponse(response);
  }

  static Future<Map<String, dynamic>> getProfile() async {
    final response = await http.get(
      Uri.parse('$baseUrl/auth/profile'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  // Events
  static Future<List<dynamic>> getEvents() async {
    final response = await http.get(Uri.parse('$baseUrl/events'));
    return await _handleResponse(response);
  }

  static Future<Map<String, dynamic>> participateInEvent(String id) async {
    final response = await http.post(
      Uri.parse('$baseUrl/events/$id/participate'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  // Messages
  static Future<List<dynamic>> getMessages() async {
    final response = await http.get(
      Uri.parse('$baseUrl/messages'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  static Future<Map<String, dynamic>> sendMessage(Map<String, dynamic> messageData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/messages'),
      headers: await _getHeaders(),
      body: json.encode(messageData),
    );
    return await _handleResponse(response);
  }

  // Notifications
  static Future<List<dynamic>> getNotifications() async {
    final response = await http.get(
      Uri.parse('$baseUrl/notifications'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  // Users (Admin)
  static Future<List<dynamic>> getUsers() async {
    final response = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }

  // Documents
  static Future<List<dynamic>> getDocuments() async {
    final response = await http.get(
      Uri.parse('$baseUrl/documents'),
      headers: await _getHeaders(),
    );
    return await _handleResponse(response);
  }
}
