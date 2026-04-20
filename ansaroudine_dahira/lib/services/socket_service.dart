import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';
import 'notification_service.dart';

class SocketService {
  static final SocketService _instance = SocketService._internal();
  factory SocketService() => _instance;
  SocketService._internal();

  IO.Socket? socket;
  final _notificationController = StreamController<Map<String, dynamic>>.broadcast();
  final _messageController = StreamController<Map<String, dynamic>>.broadcast();

  Stream<Map<String, dynamic>> get notificationsStream => _notificationController.stream;
  Stream<Map<String, dynamic>> get messagesStream => _messageController.stream;

  void initSocket() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token == null) return;

    socket = IO.io('https://backend-bjzg.onrender.com', 
      IO.OptionBuilder()
        .setTransports(['websocket'])
        .setAuth({'token': token})
        .enableAutoConnect()
        .build()
    );

    socket!.onConnect((_) {
      print('Socket connecté');
    });

    socket!.on('notification', (data) {
      print('Nouvelle notification reçue: $data');
      _notificationController.add(Map<String, dynamic>.from(data));
      
      // Affichage de la notification système
      NotificationService().showNotification(
        id: DateTime.now().millisecond,
        title: data['title'] ?? 'Nouvelle Notification',
        body: data['content'] ?? 'Vous avez reçu une nouvelle notification',
      );
    });

    socket!.on('message', (data) {
      print('Nouveau message reçu: $data');
      _messageController.add(Map<String, dynamic>.from(data));
      
      // Affichage de la notification système pour les messages
      NotificationService().showNotification(
        id: DateTime.now().millisecond,
        title: data['sender']?['name'] ?? 'Nouveau Message',
        body: data['content'] ?? 'Vous avez reçu un message',
      );
    });

    socket!.onDisconnect((_) => print('Socket déconnecté'));
  }

  void disconnect() {
    socket?.disconnect();
    socket = null;
  }
}
