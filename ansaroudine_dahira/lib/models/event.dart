import '../core/constant.dart';

class DahiraEvent {
  final String id;
  final String title;
  final String description;
  final DateTime date;
  final String time;
  final String location;
  final String category;
  final String? image;
  final EventStatus status;
  final List<String> participants;
  final DateTime createdAt;

  DahiraEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.date,
    required this.time,
    required this.location,
    required this.category,
    this.image,
    required this.status,
    required this.participants,
    required this.createdAt,
  });

  factory DahiraEvent.fromJson(Map<String, dynamic> json) {
    return DahiraEvent(
      id: json['_id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      date: json['date'] != null ? DateTime.parse(json['date']) : DateTime.now(),
      time: json['time'] ?? '',
      location: json['location'] ?? '',
      category: json['category'] ?? '',
      image: json['image'] is Map ? json['image']['url'] : json['image'],
      status: EventStatus.values.firstWhere(
        (e) => e.name == (json['status'] ?? 'UPCOMING'),
        orElse: () => EventStatus.UPCOMING,
      ),
      participants: json['participants'] != null 
          ? List<String>.from(json['participants']) 
          : [],
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'date': date.toIso8601String(),
      'time': time,
      'location': location,
      'category': category,
      'image': image,
      'status': status.name,
    };
  }
}
