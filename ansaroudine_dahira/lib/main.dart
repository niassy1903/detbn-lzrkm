import 'package:flutter/material.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'app.dart';
import 'services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeDateFormatting('fr_FR', null);
  
  // Initialisation du service de notification
  await NotificationService().init();

  runApp(const App());
}
