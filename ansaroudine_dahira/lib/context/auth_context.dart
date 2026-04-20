import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';
import '../types.dart';
import '../core/constant.dart';

class AuthContext with ChangeNotifier {
  User? _user;
  bool _isLoading = true;

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;
  bool get isAdmin => _user?.role == UserRole.ADMIN;

  AuthContext() {
    _loadUser();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    final savedUser = prefs.getString('dahira_user');
    final token = prefs.getString('token');

    if (savedUser != null && token != null) {
      _user = User.fromJson(json.decode(savedUser));
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<void> login(Map<String, String> credentials) async {
    try {
      final data = await ApiService.login(credentials);
      
      // The response structure seems to be { "user": { ... }, "token": "..." }
      final Map<String, dynamic> userJson = data['user'] ?? data;

      final userData = User.fromJson(userJson);

      _user = userData;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('dahira_user', json.encode(userData.toJson()));
      await prefs.setString('token', data['token']);
      
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logout() async {
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('dahira_user');
    await prefs.remove('token');
    notifyListeners();
  }
}
