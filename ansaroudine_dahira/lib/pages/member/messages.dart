import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../types.dart';
import '../../context/data_context.dart';
import '../../context/auth_context.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../layouts/member_layout.dart';

class MessagesPage extends StatefulWidget {
  const MessagesPage({super.key});

  @override
  State<MessagesPage> createState() => _MessagesPageState();
}

class _MessagesPageState extends State<MessagesPage> {
  Message? _selectedMessage;
  final _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final data = Provider.of<DataContext>(context);
    final auth = Provider.of<AuthContext>(context);
    final user = auth.user;

    final userMessages = data.messages.where((m) => m.recipient == user?.id || m.recipient == null).toList();
    final filteredMessages = userMessages.where((m) =>
        m.subject.toLowerCase().contains(_searchController.text.toLowerCase()) ||
        m.content.toLowerCase().contains(_searchController.text.toLowerCase())).toList();

    return MemberLayout(
      title: "Messagerie",
      child: Row(
        children: [
          // Message List
          Expanded(
            flex: 1,
            child: Container(
              decoration: BoxDecoration(border: Border(right: BorderSide(color: Colors.grey[100]!))),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 60),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("Messages", style: GoogleFonts.blackHanSans(fontSize: 28)),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                          child: Text("${userMessages.where((m) => !m.isRead).length} Nouveaux",
                              style: const TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: TextField(
                      controller: _searchController,
                      onChanged: (_) => setState(() {}),
                      decoration: InputDecoration(
                        hintText: "Rechercher...",
                        prefixIcon: const Icon(Icons.search),
                        filled: true,
                        fillColor: Colors.grey[50],
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Expanded(
                    child: ListView.builder(
                      itemCount: filteredMessages.length,
                      itemBuilder: (context, index) {
                        final msg = filteredMessages[index];
                        final isSelected = _selectedMessage?.id == msg.id;
                        final isRead = msg.isRead;

                        return GestureDetector(
                          onTap: () => setState(() => _selectedMessage = msg),
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF10B981) : Colors.white,
                              borderRadius: BorderRadius.circular(24),
                              border: Border.all(color: isSelected ? const Color(0xFF10B981) : Colors.grey[100]!),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(color: isSelected ? Colors.white24 : const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                                      child: Icon(Icons.mail, color: isSelected ? Colors.white : const Color(0xFF10B981), size: 16),
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(msg.sender, style: TextStyle(color: isSelected ? Colors.white : const Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 10)),
                                          Text(DateFormat('dd/MM HH:mm').format(msg.createdAt), style: TextStyle(color: isSelected ? Colors.white70 : Colors.grey, fontSize: 10)),
                                        ],
                                      ),
                                    ),
                                    if (!isRead && !isSelected) Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle)),
                                  ],
                                ),
                                const SizedBox(height: 12),
                                Text(msg.subject, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: isSelected ? Colors.white : Colors.black)),
                                Text(msg.content, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(color: isSelected ? Colors.white70 : Colors.grey, fontSize: 13)),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Content Area (For Tablet/Desktop - simplified for mobile)
          if (MediaQuery.of(context).size.width > 700)
            Expanded(
              flex: 2,
              child: _selectedMessage == null
                  ? Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(Icons.mail_outline, size: 80, color: Colors.grey[200]), const Text("Sélectionnez un message.", style: TextStyle(color: Colors.grey))]))
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 60),
                        Padding(
                          padding: const EdgeInsets.all(40),
                          child: Row(
                            children: [
                              Container(
                                width: 64,
                                height: 64,
                                decoration: BoxDecoration(color: const Color(0xFF10B981), borderRadius: BorderRadius.circular(20)),
                                child: const Icon(Icons.person, color: Colors.white, size: 32),
                              ),
                              const SizedBox(width: 24),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(_selectedMessage!.subject, style: GoogleFonts.blackHanSans(fontSize: 24)),
                                    Text("De: ${_selectedMessage!.sender} • ${DateFormat('dd MMMM yyyy HH:mm').format(_selectedMessage!.createdAt)}", style: const TextStyle(color: Colors.grey)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Divider(),
                        Expanded(
                          child: SingleChildScrollView(
                            padding: const EdgeInsets.all(40),
                            child: Text(
                              _selectedMessage!.content,
                              style: const TextStyle(fontSize: 18, height: 1.6, color: Colors.black87),
                            ),
                          ),
                        ),
                      ],
                    ),
            ),
        ],
      ),
    );
  }
}
