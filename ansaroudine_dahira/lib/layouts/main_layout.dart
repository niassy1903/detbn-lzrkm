import 'package:flutter/material.dart';

class MainLayout extends StatelessWidget {
  final Widget child;
  final String title;
  final List<Widget>? actions;

  const MainLayout({
    super.key,
    required this.child,
    required this.title,
    this.actions,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: actions,
      ),
      body: child,
    );
  }
}
