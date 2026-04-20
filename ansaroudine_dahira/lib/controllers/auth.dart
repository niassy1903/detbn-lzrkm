import '../services/api_service.dart';
import '../types.dart';

class AuthController {
  Future<Map<String, dynamic>> register(String name, String email, String password) async {
    final userData = {
      'name': name,
      'email': email,
      'password': password,
    };
    return await ApiService.register(userData);
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final credentials = {
      'email': email,
      'password': password,
    };
    return await ApiService.login(credentials);
  }

  Future<User> getProfile() async {
    final data = await ApiService.getProfile();
    return User.fromJson(data);
  }
}
