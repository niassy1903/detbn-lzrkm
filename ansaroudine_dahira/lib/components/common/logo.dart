import 'package:flutter/material.dart';

class DahiraLogo extends StatelessWidget {
  final double size;
  const DahiraLogo({super.key, this.size = 64});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Glow effect
        Container(
          width: size * 1.2,
          height: size * 1.2,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              colors: [Color(0xFF34D399), Color(0xFF10B981), Color(0xFF059669)],
              begin: Alignment.bottomLeft,
              end: Alignment.topRight,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF10B981).withOpacity(0.4),
                blurRadius: 20,
                spreadRadius: 2,
              ),
            ],
          ),
        ),
        // Gradient Ring
        Container(
          width: size,
          height: size,
          padding: const EdgeInsets.all(3),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: [Color(0xFF34D399), Color(0xFF10B981), Color(0xFF059669)],
              begin: Alignment.bottomLeft,
              end: Alignment.topRight,
            ),
          ),
          child: Container(
            padding: const EdgeInsets.all(3),
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(size),
              child: Image.asset(
                'assets/logo.jpeg',
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Container(
                  color: const Color(0xFFECFDF5),
                  child: const Icon(Icons.school, color: Color(0xFF10B981)),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
