import '../services/api_service.dart';
import '../types.dart';

class EventController {
  Future<List<DahiraEvent>> getEvents() async {
    final data = await ApiService.getEvents();
    return (data as List).map((e) => DahiraEvent.fromJson(e)).toList();
  }

  Future<DahiraEvent> getEventById(String id) async {
    final data = await ApiService.getEventById(id);
    return DahiraEvent.fromJson(data);
  }

  Future<DahiraEvent> createEvent(Map<String, dynamic> eventData) async {
    final data = await ApiService.createEvent(eventData);
    return DahiraEvent.fromJson(data);
  }

  Future<DahiraEvent> updateEvent(String id, Map<String, dynamic> eventData) async {
    final data = await ApiService.updateEvent(id, eventData);
    return DahiraEvent.fromJson(data);
  }

  Future<void> deleteEvent(String id) async {
    await ApiService.deleteEvent(id);
  }

  Future<void> participate(String id) async {
    await ApiService.participateInEvent(id);
  }
}
