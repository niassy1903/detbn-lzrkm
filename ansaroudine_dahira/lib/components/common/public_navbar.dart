import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../context/auth_context.dart';

class PublicNavbar extends StatelessWidget {
  final bool isHome;
  final ScrollController? scrollController;

  const PublicNavbar({
    super.key,
    this.isHome = false,
    this.scrollController,
  });

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthContext>(context);
    final String currentRoute = ModalRoute.of(context)?.settings.name ?? '/home';

    // Top items for the bottom bar
    final List<Map<String, dynamic>> navItems = [
      {'name': 'Accueil', 'path': '/home', 'icon': Icons.home_rounded},
      {'name': 'À propos', 'path': '/about', 'icon': Icons.info_rounded},
      {'name': 'News', 'path': '/news', 'icon': Icons.newspaper_rounded},
      {'name': 'Galerie', 'path': '/gallery', 'icon': Icons.image_rounded},
    ];

    // If authenticated, we could optionally swap "À propos" or just rely on the Menu
    // for the sake of your request, we keep it simple and clean.

    const Color emerald = Color(0xFF10B981);
    const Color slate = Color(0xFF64748B);

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      height: 70,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.95),
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 25,
            offset: const Offset(0, 8),
          ),
          BoxShadow(
            color: emerald.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
        border: Border.all(color: Colors.white, width: 2),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(25),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ...navItems.map((item) {
                final bool isSelected = item['path'] == currentRoute ||
                    (item['path'] == '/home' && currentRoute == '/') ||
                    (item['name'] == 'Espace' && (currentRoute.startsWith('/admin') || currentRoute.startsWith('/member')));

                return Expanded(
                  child: InkWell(
                    onTap: () {
                      if (!isSelected) {
                        Navigator.pushNamed(context, item['path']);
                      }
                    },
                    splashColor: Colors.transparent,
                    highlightColor: Colors.transparent,
                    child: _buildNavItem(item['name'], item['icon'], isSelected, emerald, slate),
                  ),
                );
              }).toList(),
              
              // The "Menu" button
              Expanded(
                child: InkWell(
                  onTap: () => Scaffold.of(context).openDrawer(),
                  splashColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  child: _buildNavItem('Menu', Icons.menu_rounded, false, emerald, slate),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(String name, IconData icon, bool isSelected, Color emerald, Color slate) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
          padding: EdgeInsets.all(isSelected ? 10 : 0),
          decoration: BoxDecoration(
            color: isSelected ? emerald.withOpacity(0.15) : Colors.transparent,
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: isSelected ? emerald : slate.withOpacity(0.6),
            size: isSelected ? 24 : 22,
          ),
        ),
        if (!isSelected) const SizedBox(height: 4),
        if (!isSelected)
          Text(
            name,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w500,
              color: slate.withOpacity(0.6),
            ),
          ),
      ],
    );
  }
}
