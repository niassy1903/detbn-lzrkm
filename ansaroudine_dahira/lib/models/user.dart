import '../core/constant.dart';

class User {
  final String id;
  final String name;
  final String email;
  final UserRole role;
  final String? avatar;
  final UserStatus status;
  final DateTime createdAt;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.avatar,
    required this.status,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    String? avatarUrl;
    if (json['avatar'] != null) {
      if (json['avatar'] is String) {
        avatarUrl = json['avatar'];
      } else if (json['avatar'] is Map && json['avatar']['url'] != null) {
        avatarUrl = json['avatar']['url'];
      }
    }

    return User(
      id: json['_id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      email: json['email']?.toString() ?? '',
      role: UserRole.values.firstWhere(
        (e) => e.name == (json['role']?.toString() ?? 'MEMBER'),
        orElse: () => UserRole.MEMBER,
      ),
      avatar: avatarUrl,
      status: UserStatus.values.firstWhere(
        (e) => e.name == (json['status']?.toString() ?? 'ACTIVE'),
        orElse: () => UserStatus.ACTIVE,
      ),
      createdAt: json['createdAt'] != null 
          ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'role': role.name,
      'avatar': avatar,
      'status': status.name,
    };
  }
}
