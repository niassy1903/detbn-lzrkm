import '../services/api_service.dart';
import '../types.dart';

class UserController {
  Future<List<User>> getUsers() async {
    final data = await ApiService.getUsers();
    return (data as List).map((u) => User.fromJson(u)).toList();
  }

  Future<User> updateUser(String id, Map<String, dynamic> userData) async {
    final data = await ApiService.updateUser(id, userData);
    return User.fromJson(data);
  }

  Future<void> deleteUser(String id) async {
    await ApiService.deleteUser(id);
  }
}
