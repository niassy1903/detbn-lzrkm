import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../context/auth_context.dart';
import '../../core/constant.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;
  String? _error;

  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      setState(() => _error = "Veuillez remplir tous les champs.");
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final authProvider = Provider.of<AuthContext>(context, listen: false);
      await authProvider.login({
        'email': email,
        'password': password,
      });

      if (authProvider.isAuthenticated) {
        final user = authProvider.user;
        if (user != null) {
          if (user.role == UserRole.ADMIN) {
            Navigator.pushReplacementNamed(context, '/admin');
          } else {
            Navigator.pushReplacementNamed(context, '/member');
          }
        }
      } else {
        setState(() => _error = "Email ou mot de passe incorrect.");
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isMobile = size.width < 900;

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: Stack(
        children: [
          // Background Decorative Elements
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF10B981).withValues(alpha: 0.05),
              ),
            ),
          ),
          Positioned(
            bottom: -50,
            left: -50,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF3B82F6).withValues(alpha: 0.05),
              ),
            ),
          ),

          Row(
            children: [
              // Left Side - Visual (Desktop only)
              if (!isMobile)
                Expanded(
                  flex: 12,
                  child: Container(
                    padding: const EdgeInsets.all(64),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1E293B),
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: const Color(0xFF334155)),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: Image.asset(
                              'assets/logo.jpeg',
                              height: 60,
                              errorBuilder: (context, error, stackTrace) => const Icon(Icons.mosque, color: Color(0xFF10B981), size: 40),
                            ),
                          ),
                        ),
                        const SizedBox(height: 48),
                        Text(
                          "Ansaroudine\nDahira Management",
                          style: GoogleFonts.blackHanSans(
                            color: Colors.white,
                            fontSize: 56,
                            height: 1.1,
                            letterSpacing: -1,
                          ),
                        ),
                        const SizedBox(height: 24),
                        Text(
                          "Une plateforme moderne pour la gestion et le suivi de vos activités religieuses et communautaires.",
                          style: TextStyle(
                            color: const Color(0xFF94A3B8),
                            fontSize: 18,
                            height: 1.6,
                            fontFamily: GoogleFonts.inter().fontFamily,
                          ),
                        ),
                        const SizedBox(height: 48),
                        _buildFeatureRow(Icons.security, "Accès sécurisé et rôles définis"),
                        _buildFeatureRow(Icons.analytics, "Statistiques et rapports en temps réel"),
                        _buildFeatureRow(Icons.notifications_active, "Notifications et alertes instantanées"),
                      ],
                    ),
                  ),
                ),

              // Right Side - Login Form
              Expanded(
                flex: 10,
                child: Center(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(40),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          constraints: const BoxConstraints(maxWidth: 480),
                          padding: const EdgeInsets.all(40),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1E293B).withValues(alpha: 0.5),
                            borderRadius: BorderRadius.circular(40),
                            border: Border.all(color: const Color(0xFF334155)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (isMobile) ...[
                                Center(
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: Image.asset('assets/logo.jpeg', height: 80, errorBuilder: (c, e, s) => const Icon(Icons.mosque, color: Color(0xFF10B981), size: 60)),
                                  ),
                                ),
                                const SizedBox(height: 32),
                              ],
                              Text(
                                "Bienvenue",
                                style: GoogleFonts.blackHanSans(
                                  color: Colors.white,
                                  fontSize: 32,
                                ),
                              ),
                              const SizedBox(height: 8),
                              const Text(
                                "Connectez-vous pour continuer",
                                style: TextStyle(color: Color(0xFF94A3B8), fontSize: 16),
                              ),
                              const SizedBox(height: 40),
                              _buildInputLabel("EMAIL"),
                              _buildInputField(
                                controller: _emailController,
                                icon: Icons.alternate_email,
                                hint: "exemple@dahira.com",
                              ),
                              const SizedBox(height: 24),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  _buildInputLabel("MOT DE PASSE"),
                                  GestureDetector(
                                    onTap: () {},
                                    child: const Text(
                                      "Oublié ?",
                                      style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 12),
                                    ),
                                  ),
                                ],
                              ),
                              _buildInputField(
                                controller: _passwordController,
                                icon: Icons.lock_outline,
                                hint: "••••••••",
                                isPassword: true,
                              ),
                              const SizedBox(height: 32),
                              if (_error != null) _buildErrorCard(),
                              const SizedBox(height: 16),
                              SizedBox(
                                width: double.infinity,
                                height: 60,
                                child: ElevatedButton(
                                  onPressed: _isLoading ? null : _handleLogin,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF10B981),
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                                    elevation: 0,
                                  ),
                                  child: _isLoading
                                      ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                                      : Row(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          children: const [
                                            Text("SE CONNECTER", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                                            SizedBox(width: 12),
                                            Icon(Icons.arrow_forward, size: 20),
                                          ],
                                        ),
                                ),
                              ),
                              const SizedBox(height: 32),
                              Center(
                                child: TextButton(
                                  onPressed: () => Navigator.pop(context),
                                  child: Text(
                                    "RETOUR À L'ACCUEIL",
                                    style: TextStyle(
                                      color: const Color(0xFF94A3B8),
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      letterSpacing: 1,
                                      fontFamily: GoogleFonts.inter().fontFamily,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInputLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 8),
      child: Text(
        label,
        style: const TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.5),
      ),
    );
  }

  Widget _buildInputField({
    required TextEditingController controller,
    required IconData icon,
    required String hint,
    bool isPassword = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: TextFormField(
        controller: controller,
        obscureText: isPassword && _obscurePassword,
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: const TextStyle(color: Color(0xFF475569), fontSize: 14),
          prefixIcon: Icon(icon, color: const Color(0xFF64748B), size: 20),
          suffixIcon: isPassword
              ? IconButton(
                  icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility, color: const Color(0xFF64748B), size: 18),
                  onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                )
              : null,
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
        ),
      ),
    );
  }

  Widget _buildFeatureRow(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: const Color(0xFF10B981).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: const Color(0xFF10B981), size: 20),
          ),
          const SizedBox(width: 16),
          Text(text, style: const TextStyle(color: Color(0xFFCBD5E1), fontSize: 16)),
        ],
      ),
    );
  }

  Widget _buildErrorCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.redAccent.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.redAccent.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: Colors.redAccent, size: 20),
          const SizedBox(width: 12),
          Expanded(child: Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 13, fontWeight: FontWeight.w500))),
        ],
      ),
    );
  }
}
