import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../context/auth_context.dart';
import '../core/constant.dart';

class AuthMiddleware {
  /// Logic equivalent to the 'protect' middleware
  /// Returns null if authorized, or a widget (like Login page) if not
  static bool isAuthenticated(BuildContext context) {
    final auth = Provider.of<AuthContext>(context, listen: false);
    return auth.isAuthenticated;
  }

  /// Logic equivalent to the 'admin' middleware
  static bool isAdmin(BuildContext context) {
    final auth = Provider.of<AuthContext>(context, listen: false);
    return auth.isAdmin;
  }

  /// Helper to guard a route or action
  static void guard(BuildContext context, {required VoidCallback onSuccess, bool requireAdmin = false}) {
    final auth = Provider.of<AuthContext>(context, listen: false);
    
    if (!auth.isAuthenticated) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Veuillez vous connecter pour continuer')),
      );
      // Optional: Navigate to login
      return;
    }

    if (requireAdmin && !auth.isAdmin) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Accès refusé : Droits administrateur requis')),
      );
      return;
    }

    onSuccess();
  }
}
