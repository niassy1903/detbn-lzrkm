import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/admin_layout.dart';

class AdminSettings extends StatefulWidget {
  const AdminSettings({super.key});

  @override
  State<AdminSettings> createState() => _AdminSettingsState();
}

class _AdminSettingsState extends State<AdminSettings> {
  String _activeTab = 'general';
  bool _isSaving = false;
  bool _showSuccess = false;

  // Settings State
  final Map<String, dynamic> _settings = {
    'general': {
      'orgName': 'Ansaroudine Dahira',
      'email': 'contact@ansaroudine.sn',
      'language': 'Français',
      'timezone': '(GMT+00:00) Dakar'
    },
    'security': {
      'twoFactor': true,
      'activityLogs': true,
      'sessionExpiration': false
    },
    'notifications': {
      'emailAlerts': true,
      'pushNotifications': true,
      'smsAlerts': false,
      'memberJoinAlerts': true,
      'eventReminderAlerts': true
    },
    'appearance': {
      'primaryColor': const Color(0xFF10B981),
      'darkMode': true
    }
  };

  void _handleSave() async {
    setState(() => _isSaving = true);
    // Simulate API call
    await Future.delayed(const Duration(milliseconds: 1500));
    if (mounted) {
      setState(() {
        _isSaving = false;
        _showSuccess = true;
      });
      Future.delayed(const Duration(seconds: 3), () {
        if (mounted) setState(() => _showSuccess = false);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AdminLayout(
      title: "Paramètres",
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Paramètres Système",
                          style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                      const SizedBox(height: 4),
                      const Text("Configurez les options globales de votre plateforme.",
                          style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500, fontSize: 16)),
                    ],
                  ),
                ),
                if (_showSuccess)
                  Row(
                    children: [
                      const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 20),
                      const SizedBox(width: 8),
                      const Text("Enregistré !", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                      const SizedBox(width: 20),
                    ],
                  ),
                ElevatedButton.icon(
                  onPressed: _isSaving ? null : _handleSave,
                  icon: _isSaving 
                      ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.save, size: 20),
                  label: Text(_isSaving ? "Enregistrement..." : "Sauvegarder tout"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    elevation: 10,
                    shadowColor: const Color(0xFF10B981).withValues(alpha: 0.3),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 40),

            LayoutBuilder(
              builder: (context, constraints) {
                bool isWide = constraints.maxWidth > 900;
                if (isWide) {
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(width: 300, child: _buildSidebarTabs()),
                      const SizedBox(width: 40),
                      Expanded(child: _buildContentArea()),
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      _buildSidebarTabs(isHorizontal: true),
                      const SizedBox(height: 24),
                      _buildContentArea(),
                    ],
                  );
                }
              },
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildSidebarTabs({bool isHorizontal = false}) {
    final tabs = [
      {'id': 'general', 'icon': Icons.language, 'title': 'Général', 'desc': 'Identité'},
      {'id': 'security', 'icon': Icons.shield_outlined, 'title': 'Sécurité', 'desc': 'Accès'},
      {'id': 'notifications', 'icon': Icons.notifications_none, 'title': 'Alertes', 'desc': 'Emails'},
      {'id': 'appearance', 'icon': Icons.palette_outlined, 'title': 'Design', 'desc': 'Thèmes'},
      {'id': 'data', 'icon': Icons.storage_outlined, 'title': 'Données', 'desc': 'Maintenance'},
    ];

    if (isHorizontal) {
      return SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: tabs.map((tab) => _buildTabItem(tab, isHorizontal: true)).toList(),
        ),
      );
    }

    return Column(
      children: tabs.map((tab) => _buildTabItem(tab)).toList(),
    );
  }

  Widget _buildTabItem(Map<String, dynamic> tab, {bool isHorizontal = false}) {
    final isSelected = _activeTab == tab['id'];
    return Padding(
      padding: EdgeInsets.only(bottom: isHorizontal ? 0 : 16, right: isHorizontal ? 16 : 0),
      child: InkWell(
        onTap: () => setState(() => _activeTab = tab['id']),
        borderRadius: BorderRadius.circular(24),
        child: Container(
          width: isHorizontal ? 180 : double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF0F172A) : Colors.transparent,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: isSelected ? const Color(0xFF10B981).withValues(alpha: 0.3) : Colors.transparent),
            boxShadow: isSelected ? [BoxShadow(color: const Color(0xFF10B981).withValues(alpha: 0.05), blurRadius: 20)] : null,
          ),
          child: Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: isSelected ? const Color(0xFF10B981) : const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(tab['icon'] as IconData, size: 20, color: isSelected ? Colors.white : const Color(0xFF64748B)),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(tab['title'] as String, style: TextStyle(color: isSelected ? Colors.white : const Color(0xFF64748B), fontWeight: FontWeight.bold, fontSize: 14)),
                    Text(tab['desc'] as String, style: TextStyle(color: const Color(0xFF64748B).withValues(alpha: 0.6), fontSize: 10)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContentArea() {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: Container(
        key: ValueKey(_activeTab),
        padding: const EdgeInsets.all(40),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(40),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: _buildActiveTabContent(),
      ),
    );
  }

  Widget _buildActiveTabContent() {
    switch (_activeTab) {
      case 'general':
        return _buildGeneralTab();
      case 'security':
        return _buildSecurityTab();
      case 'notifications':
        return _buildNotificationsTab();
      case 'appearance':
        return _buildAppearanceTab();
      case 'data':
        return _buildDataTab();
      default:
        return const SizedBox.shrink();
    }
  }

  Widget _buildGeneralTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(Icons.language, "Identité du Dahira", "Informations publiques et localisation."),
        const SizedBox(height: 40),
        LayoutBuilder(builder: (context, constraints) {
          double spacing = 24;
          double width = (constraints.maxWidth - spacing) / 2;
          return Wrap(
            spacing: spacing,
            runSpacing: spacing,
            children: [
              SizedBox(width: constraints.maxWidth > 600 ? width : double.infinity, child: _buildInputField("Nom de l'organisation", _settings['general']['orgName'], (v) => _settings['general']['orgName'] = v)),
              SizedBox(width: constraints.maxWidth > 600 ? width : double.infinity, child: _buildInputField("Email officiel", _settings['general']['email'], (v) => _settings['general']['email'] = v, icon: Icons.mail_outline)),
              SizedBox(width: constraints.maxWidth > 600 ? width : double.infinity, child: _buildDropdownField("Langue par défaut", _settings['general']['language'], ['Français', 'Wolof', 'Arabe', 'Anglais'], (v) => setState(() => _settings['general']['language'] = v), icon: Icons.translate)),
              SizedBox(width: constraints.maxWidth > 600 ? width : double.infinity, child: _buildDropdownField("Fuseau Horaire", _settings['general']['timezone'], ['(GMT+00:00) Dakar', '(GMT+01:00) Paris'], (v) => setState(() => _settings['general']['timezone'] = v), icon: Icons.access_time)),
            ],
          );
        }),
      ],
    );
  }

  Widget _buildSecurityTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(Icons.shield_outlined, "Sécurité & Accès", "Protégez votre plateforme et vos données."),
        const SizedBox(height: 40),
        _buildToggleItem("Authentification à deux facteurs", "Ajoutez une couche de sécurité supplémentaire.", _settings['security']['twoFactor'], (v) => setState(() => _settings['security']['twoFactor'] = v)),
        _buildToggleItem("Logs d'activité", "Enregistrez toutes les actions administratives.", _settings['security']['activityLogs'], (v) => setState(() => _settings['security']['activityLogs'] = v)),
        _buildToggleItem("Expiration de session", "Déconnectez automatiquement après 30 min d'inactivité.", _settings['security']['sessionExpiration'], (v) => setState(() => _settings['security']['sessionExpiration'] = v)),
      ],
    );
  }

  Widget _buildNotificationsTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(Icons.notifications_none, "Alertes & Notifications", "Gérez comment vous êtes informé."),
        const SizedBox(height: 40),
        _buildToggleItem("Notifications par Email", "Recevoir des résumés d'activité par email.", _settings['notifications']['emailAlerts'], (v) => setState(() => _settings['notifications']['emailAlerts'] = v)),
        _buildToggleItem("Notifications Push", "Alertes en temps réel sur votre navigateur.", _settings['notifications']['pushNotifications'], (v) => setState(() => _settings['notifications']['pushNotifications'] = v)),
        _buildToggleItem("Alertes SMS", "Notifications critiques par SMS (frais applicables).", _settings['notifications']['smsAlerts'], (v) => setState(() => _settings['notifications']['smsAlerts'] = v)),
        _buildToggleItem("Nouveaux Membres", "Alerte lors de l'inscription d'un nouveau membre.", _settings['notifications']['memberJoinAlerts'], (v) => setState(() => _settings['notifications']['memberJoinAlerts'] = v)),
        _buildToggleItem("Rappels d'Événements", "Notifications automatiques avant le début des événements.", _settings['notifications']['eventReminderAlerts'], (v) => setState(() => _settings['notifications']['eventReminderAlerts'] = v)),
      ],
    );
  }

  Widget _buildAppearanceTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(Icons.palette_outlined, "Apparence & Design", "Personnalisez l'interface visuelle."),
        const SizedBox(height: 40),
        const Text("COULEUR PRIMAIRE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        const SizedBox(height: 16),
        Wrap(
          spacing: 16,
          children: [const Color(0xFF10B981), Colors.blue, Colors.purple, Colors.orange, Colors.red].map((color) {
            final isSelected = _settings['appearance']['primaryColor'] == color;
            return InkWell(
              onTap: () => setState(() => _settings['appearance']['primaryColor'] = color),
              borderRadius: BorderRadius.circular(12),
              child: Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: isSelected ? Colors.white : Colors.transparent, width: 3),
                ),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 40),
        const Text("THÈME", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(child: _buildThemeButton("Sombre", _settings['appearance']['darkMode'] == true, () => setState(() => _settings['appearance']['darkMode'] = true))),
            const SizedBox(width: 16),
            Expanded(child: _buildThemeButton("Clair", _settings['appearance']['darkMode'] == false, () => setState(() => _settings['appearance']['darkMode'] = false))),
          ],
        ),
      ],
    );
  }

  Widget _buildDataTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(Icons.storage_outlined, "Gestion des Données", "Sauvegardes et exports du système."),
        const SizedBox(height: 40),
        LayoutBuilder(builder: (context, constraints) {
          bool isSmall = constraints.maxWidth < 500;
          return Wrap(
            spacing: 24,
            runSpacing: 24,
            children: [
              SizedBox(
                width: isSmall ? double.infinity : (constraints.maxWidth - 24) / 2,
                child: _buildDataActionCard(Icons.cloud_upload_outlined, "Sauvegarde Cloud", "Dernière sauvegarde : Aujourd'hui à 04:00", "Sauvegarder maintenant", Colors.blue),
              ),
              SizedBox(
                width: isSmall ? double.infinity : (constraints.maxWidth - 24) / 2,
                child: _buildDataActionCard(Icons.download_outlined, "Export Complet", "Exportez tous les membres et événements.", "Générer l'archive (JSON)", Colors.orange),
              ),
            ],
          );
        }),
      ],
    );
  }

  Widget _buildSectionTitle(IconData icon, String title, String subtitle) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(color: const Color(0xFF3B82F6).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
          child: Icon(icon, color: const Color(0xFF3B82F6), size: 24),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
              Text(subtitle, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInputField(String label, String value, Function(String) onChanged, {IconData? icon}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        const SizedBox(height: 12),
        TextFormField(
          initialValue: value,
          onChanged: onChanged,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            prefixIcon: icon != null ? Icon(icon, color: const Color(0xFF64748B), size: 20) : null,
            filled: true,
            fillColor: Colors.black.withValues(alpha: 0.3),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF1E293B))),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF10B981))),
          ),
        ),
      ],
    );
  }

  Widget _buildDropdownField(String label, String value, List<String> items, Function(String) onChanged, {IconData? icon}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF1E293B)),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              isExpanded: true,
              value: value,
              dropdownColor: const Color(0xFF0F172A),
              icon: const Icon(Icons.keyboard_arrow_down, color: Color(0xFF64748B)),
              items: items.map((String item) => DropdownMenuItem(value: item, child: Row(children: [if (icon != null) ...[Icon(icon, color: const Color(0xFF64748B), size: 20), const SizedBox(width: 12)], Text(item, style: const TextStyle(color: Colors.white))]))).toList(),
              onChanged: (v) => onChanged(v!),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildToggleItem(String title, String desc, bool value, Function(bool) onChanged) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 4),
                Text(desc, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: const Color(0xFF10B981),
            activeTrackColor: const Color(0xFF10B981).withValues(alpha: 0.2),
            inactiveTrackColor: const Color(0xFF1E293B),
          ),
        ],
      ),
    );
  }

  Widget _buildThemeButton(String label, bool isSelected, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isSelected ? const Color(0xFF10B981) : const Color(0xFF1E293B), width: 2),
        ),
        child: Center(child: Text(label, style: TextStyle(color: isSelected ? Colors.white : const Color(0xFF64748B), fontWeight: FontWeight.bold))),
      ),
    );
  }

  Widget _buildDataActionCard(IconData icon, String title, String desc, String btnLabel, Color color) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(16)),
            child: Icon(icon, color: color, size: 28),
          ),
          const SizedBox(height: 24),
          Text(title, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Text(desc, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1E293B),
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 50),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: Text(btnLabel, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          ),
        ],
      ),
    );
  }
}
