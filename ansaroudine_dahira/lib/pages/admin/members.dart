import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../context/data_context.dart';
import '../../layouts/admin_layout.dart';
import '../../components/image_upload.dart';
import '../../models/user.dart';
import '../../core/constant.dart';

class AdminMembers extends StatefulWidget {
  const AdminMembers({super.key});

  @override
  State<AdminMembers> createState() => _AdminMembersState();
}

class _AdminMembersState extends State<AdminMembers> {
  String _searchTerm = '';
  String _roleFilter = 'ALL';

  @override
  void initState() {
    super.initState();
    // Rafraîchir les données au montage pour s'assurer d'avoir la liste des membres
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final data = Provider.of<DataContext>(context, listen: false);
      data.refreshData('ADMIN');
    });
  }

  void _showMemberDialog([User? member]) {
    showDialog(
      context: context,
      builder: (context) => MemberFormDialog(member: member),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final members = data.members;

    final filteredMembers = members.where((m) {
      final matchesSearch = m.name.toLowerCase().contains(_searchTerm.toLowerCase()) || 
                            m.email.toLowerCase().contains(_searchTerm.toLowerCase());
      final matchesRole = _roleFilter == 'ALL' || m.role.name == _roleFilter;
      return matchesSearch && matchesRole;
    }).toList();

    return AdminLayout(
      title: "Gestion Membres",
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Gestion Membres", style: GoogleFonts.blackHanSans(fontSize: 32, color: Colors.white)),
                      const Text("Gérez les accès et les informations des membres.", style: TextStyle(color: Color(0xFF64748B))),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () => _showMemberDialog(),
                  icon: const Icon(Icons.person_add, size: 18),
                  label: const Text("Ajouter"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 40),

            // Search & Filter
            Row(
              children: [
                Expanded(
                  child: TextField(
                    onChanged: (val) => setState(() => _searchTerm = val),
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: "Rechercher par nom, email...",
                      hintStyle: const TextStyle(color: Color(0xFF64748B)),
                      prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                      filled: true,
                      fillColor: const Color(0xFF1E293B),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: BorderSide.none),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(20)),
                  child: DropdownButton<String>(
                    dropdownColor: const Color(0xFF1E293B),
                    value: _roleFilter,
                    underline: const SizedBox(),
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    items: const [
                      DropdownMenuItem(value: 'ALL', child: Text("Tous les rôles")),
                      DropdownMenuItem(value: 'ADMIN', child: Text("Admin")),
                      DropdownMenuItem(value: 'MEMBER', child: Text("Membre")),
                    ],
                    onChanged: (val) => setState(() => _roleFilter = val!),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 40),

            // Table or Loading/Empty State
            if (data.loading)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(80.0),
                  child: CircularProgressIndicator(color: Color(0xFF10B981)),
                ),
              )
            else if (filteredMembers.isEmpty)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(80.0),
                  child: Column(
                    children: [
                      Icon(Icons.group_off_outlined, size: 80, color: Colors.grey.withOpacity(0.2)),
                      const SizedBox(height: 20),
                      const Text("Aucun membre trouvé", style: TextStyle(color: Colors.grey, fontSize: 18)),
                    ],
                  ),
                ),
              )
            else
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(32),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(32),
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      columnSpacing: 40,
                      headingRowColor: MaterialStateProperty.all(Colors.black.withOpacity(0.2)),
                      columns: const [
                        DataColumn(label: Text("MEMBRE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold))),
                        DataColumn(label: Text("RÔLE", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold))),
                        DataColumn(label: Text("STATUT", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold))),
                        DataColumn(label: Text("ACTIONS", style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold))),
                      ],
                      rows: filteredMembers.map((m) {
                        return DataRow(cells: [
                          DataCell(Row(
                            children: [
                              _buildAvatar(m),
                              const SizedBox(width: 12),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(m.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                                  Text(m.email, style: const TextStyle(color: Color(0xFF64748B), fontSize: 10)),
                                ],
                              ),
                            ],
                          )),
                          DataCell(Text(m.role.name, style: const TextStyle(color: Colors.white70, fontSize: 12))),
                          DataCell(Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: m.status == UserStatus.ACTIVE ? const Color(0xFF10B981).withOpacity(0.1) : Colors.amber.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              m.status == UserStatus.ACTIVE ? 'Actif' : 'Inactif',
                              style: TextStyle(
                                color: m.status == UserStatus.ACTIVE ? const Color(0xFF10B981) : Colors.amber,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          )),
                          DataCell(Row(
                            children: [
                              IconButton(
                                onPressed: () => _showMemberDialog(m),
                                icon: const Icon(Icons.edit_outlined, color: Color(0xFF64748B), size: 20),
                              ),
                              IconButton(
                                onPressed: () async {
                                  final confirm = await showDialog<bool>(
                                    context: context,
                                    builder: (c) => AlertDialog(
                                      title: const Text("Supprimer ?"),
                                      content: Text("Voulez-vous supprimer ${m.name} ?"),
                                      actions: [
                                        TextButton(onPressed: () => Navigator.pop(c, false), child: const Text("Annuler")),
                                        TextButton(onPressed: () => Navigator.pop(c, true), child: const Text("Supprimer", style: TextStyle(color: Colors.red))),
                                      ],
                                    ),
                                  );
                                  if (confirm == true) await data.deleteMember(m.id);
                                },
                                icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 20),
                              ),
                            ],
                          )),
                        ]);
                      }).toList(),
                    ),
                  ),
                ),
              ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildAvatar(User m) {
    if (m.avatar != null && m.avatar!.isNotEmpty) {
      if (m.avatar!.startsWith('data:image')) {
        // Handle Base64
        try {
          final base64Data = m.avatar!.split(',')[1];
          return CircleAvatar(
            radius: 18,
            backgroundImage: MemoryImage(base64Decode(base64Data)),
          );
        } catch (e) {
          return _buildDefaultAvatar(m);
        }
      } else if (m.avatar!.startsWith('http')) {
        // Handle URL
        return CircleAvatar(
          radius: 18,
          backgroundImage: NetworkImage(m.avatar!),
        );
      }
    }
    return _buildDefaultAvatar(m);
  }

  Widget _buildDefaultAvatar(User m) {
    return CircleAvatar(
      radius: 18,
      backgroundColor: const Color(0xFF10B981).withOpacity(0.1),
      backgroundImage: NetworkImage('https://ui-avatars.com/api/?name=${Uri.encodeComponent(m.name)}&background=10B981&color=fff'),
    );
  }
}

class MemberFormDialog extends StatefulWidget {
  final User? member;
  const MemberFormDialog({super.key, this.member});

  @override
  State<MemberFormDialog> createState() => _MemberFormDialogState();
}

class _MemberFormDialogState extends State<MemberFormDialog> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  UserRole _role = UserRole.MEMBER;
  String? _avatar;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    if (widget.member != null) {
      _nameController.text = widget.member!.name;
      _emailController.text = widget.member!.email;
      _role = widget.member!.role;
      _avatar = widget.member!.avatar;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.member != null;

    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32)),
      child: Container(
        padding: const EdgeInsets.all(32),
        width: 500,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(isEditing ? "Modifier Membre" : "Nouveau Membre", style: GoogleFonts.blackHanSans(fontSize: 24, color: Colors.white)),
              const SizedBox(height: 24),
              ImageUpload(
                onImageSelect: (base64) => setState(() => _avatar = base64),
                label: "Photo de profil",
                initialImage: _avatar,
              ),
              const SizedBox(height: 24),
              _buildField("Nom Complet", _nameController, Icons.person_outline),
              const SizedBox(height: 16),
              _buildField("Email", _emailController, Icons.mail_outline, keyboardType: TextInputType.emailAddress),
              const SizedBox(height: 16),
              if (!isEditing) _buildField("Mot de passe", _passwordController, Icons.lock_outline, isPassword: true),
              const SizedBox(height: 16),
              const Text("Rôle", style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 12)),
              const SizedBox(height: 8),
              DropdownButtonFormField<UserRole>(
                value: _role,
                dropdownColor: const Color(0xFF1E293B),
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.05),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                  prefixIcon: const Icon(Icons.shield_outlined, color: Colors.grey),
                ),
                items: UserRole.values.map((r) => DropdownMenuItem(value: r, child: Text(r.name))).toList(),
                onChanged: (val) => setState(() => _role = val!),
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: _loading ? null : () async {
                  setState(() => _loading = true);
                  try {
                    final data = Provider.of<DataContext>(context, listen: false);
                    final payload = {
                      'name': _nameController.text,
                      'email': _emailController.text,
                      'role': _role.name,
                      'avatar': _avatar,
                    };
                    if (!isEditing) payload['password'] = _passwordController.text;

                    if (isEditing) {
                      await data.updateMember(widget.member!.id, payload);
                    } else {
                      await data.addMember(payload);
                    }
                    Navigator.pop(context);
                  } catch (e) {
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: $e")));
                  } finally {
                    setState(() => _loading = false);
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 54),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: _loading 
                  ? const CircularProgressIndicator(color: Colors.white) 
                  : Text(isEditing ? "Mettre à jour" : "Créer le membre"),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, IconData icon, {bool isPassword = false, TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 12)),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          obscureText: isPassword,
          keyboardType: keyboardType,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: Colors.grey, size: 20),
            filled: true,
            fillColor: Colors.white.withOpacity(0.05),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
