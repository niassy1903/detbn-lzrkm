import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../context/data_context.dart';
import '../../services/api_service.dart';
import '../../layouts/public_layout.dart';

class GalleryPage extends StatefulWidget {
  const GalleryPage({super.key});

  @override
  State<GalleryPage> createState() => _GalleryPageState();
}

class _GalleryPageState extends State<GalleryPage> {
  String _currentFilter = 'Tous';

  String _formatImageUrl(String url) {
    if (url.startsWith('http') || url.startsWith('data:image')) return url;
    final rootUrl = ApiService.baseUrl.replaceAll('/api', '');
    return '$rootUrl$url';
  }

  Widget _buildImageWidget(String url, {BoxFit fit = BoxFit.cover}) {
    if (url.startsWith('data:image')) {
      try {
        return Image.memory(
          base64Decode(url.split(',').last),
          fit: fit,
        );
      } catch (e) {
        return Container(color: const Color(0xFFF1F5F9), child: const Icon(Icons.broken_image));
      }
    }
    return CachedNetworkImage(
      imageUrl: _formatImageUrl(url),
      fit: fit,
      placeholder: (context, url) => Container(color: const Color(0xFFF1F5F9)),
      errorWidget: (context, url, error) => Container(
        color: const Color(0xFFF1F5F9),
        child: const Icon(Icons.broken_image, color: Color(0xFFCBD5E1)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dataProvider = Provider.of<DataContext>(context);
    final gallery = dataProvider.gallery;
    
    final categories = ['Tous', ...gallery.map((e) => e.category ?? 'Général').toSet()];
    
    final filteredGallery = _currentFilter == 'Tous' 
        ? gallery 
        : gallery.where((item) => (item.category ?? 'Général') == _currentFilter).toList();

    return PublicLayout(
      child: Container(
        color: Colors.white,
        child: SingleChildScrollView(
          child: Column(
            children: [
              // Header
              Container(
                width: double.infinity,
                padding: const EdgeInsets.only(top: 140, bottom: 80, left: 24, right: 24),
                decoration: const BoxDecoration(
                  color: Color(0xFFF8FAFC),
                  image: DecorationImage(
                    image: NetworkImage('https://www.transparenttextures.com/patterns/arabesque.png'),
                    opacity: 0.05,
                    repeat: ImageRepeat.repeat,
                  ),
                ),
                child: Column(
                  children: [
                    const Text(
                      "Archives Visuelles", 
                      style: TextStyle(
                        color: Color(0xFF10B981), 
                        fontWeight: FontWeight.w900, 
                        letterSpacing: 2, 
                        fontSize: 12
                      )
                    ),
                    const SizedBox(height: 16),
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        style: GoogleFonts.blackHanSans(fontSize: 48, color: const Color(0xFF0F172A), height: 1),
                        children: [
                          const TextSpan(text: "Galerie "),
                          TextSpan(
                            text: "Dahira.", 
                            style: GoogleFonts.libreBaskerville(color: const Color(0xFF10B981), fontStyle: FontStyle.italic)
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    Container(
                      constraints: const BoxConstraints(maxWidth: 600),
                      child: const Text(
                        "Une immersion visuelle au cœur de nos activités, de nos rencontres et de notre engagement spirituel quotidien.",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Color(0xFF64748B), fontSize: 18, height: 1.6, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
              ),

              // Filters
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 60),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: categories.map((cat) {
                      final isSelected = _currentFilter == cat;
                      return Padding(
                        padding: const EdgeInsets.only(right: 12),
                        child: InkWell(
                          onTap: () => setState(() => _currentFilter = cat),
                          borderRadius: BorderRadius.circular(16),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF10B981) : const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(16),
                              boxShadow: isSelected 
                                ? [BoxShadow(color: const Color(0xFF10B981).withOpacity(0.2), blurRadius: 20, offset: const Offset(0, 10))] 
                                : [],
                            ),
                            child: Text(
                              cat.toUpperCase(),
                              style: TextStyle(
                                color: isSelected ? Colors.white : const Color(0xFF64748B),
                                fontWeight: FontWeight.w900,
                                fontSize: 10,
                                letterSpacing: 1.5,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ),

              // Masonry-like Grid
              if (filteredGallery.isEmpty)
                _buildEmptyState()
              else
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 24,
                      mainAxisSpacing: 24,
                      childAspectRatio: 0.8,
                    ),
                    itemCount: filteredGallery.length,
                    itemBuilder: (context, index) {
                      final item = filteredGallery[index];
                      return _buildGalleryItem(item);
                    },
                  ),
                ),

              const SizedBox(height: 100),

              // Quote Section
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 100, horizontal: 24),
                decoration: const BoxDecoration(
                  color: Color(0xFFF8FAFC),
                  image: DecorationImage(
                    image: NetworkImage('https://www.transparenttextures.com/patterns/arabesque.png'),
                    opacity: 0.05,
                    repeat: ImageRepeat.repeat,
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildQuoteIcon(Icons.favorite),
                        const SizedBox(width: 16),
                        _buildQuoteIcon(Icons.star),
                        const SizedBox(width: 16),
                        _buildQuoteIcon(Icons.auto_awesome),
                      ],
                    ),
                    const SizedBox(height: 48),
                    Container(
                      constraints: const BoxConstraints(maxWidth: 800),
                      child: Text(
                        "\"L'image est un reflet de l'instant, mais la lumière qu'elle capture est éternelle.\"",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.libreBaskerville(
                          fontSize: 28, 
                          fontStyle: FontStyle.italic,
                          color: const Color(0xFF0F172A),
                          height: 1.6
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    Container(width: 80, height: 4, color: const Color(0xFF10B981)),
                    const SizedBox(height: 24),
                    const Text(
                      "ESPRIT DE LA DAHIRA",
                      style: TextStyle(
                        color: Color(0xFF10B981), 
                        fontWeight: FontWeight.w900,
                        letterSpacing: 4,
                        fontSize: 12
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuoteIcon(IconData icon) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
      ),
      child: Icon(icon, color: const Color(0xFF10B981), size: 24),
    );
  }

  Widget _buildEmptyState() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 100, horizontal: 24),
      margin: const EdgeInsets.symmetric(horizontal: 24),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(40),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2, style: BorderStyle.none),
      ),
      child: Column(
        children: [
          Container(
            width: 96,
            height: 96,
            decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
            child: const Icon(Icons.image_outlined, color: Color(0xFFCBD5E1), size: 40),
          ),
          const SizedBox(height: 32),
          const Text(
            "Aucune photo trouvée", 
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Color(0xFF0F172A))
          ),
          const SizedBox(height: 12),
          const Text(
            "Désolé, nous n'avons trouvé aucun résultat pour cette catégorie.",
            textAlign: TextAlign.center,
            style: TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  Widget _buildGalleryItem(dynamic item) {
    return GestureDetector(
      onTap: () => _showLightbox(context, item.url),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(40),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF10B981).withOpacity(0.1),
              blurRadius: 30,
              offset: const Offset(0, 10),
            )
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(40),
          child: Stack(
            fit: StackFit.expand,
            children: [
              _buildImageWidget(item.url),
              // Overlay
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    stops: const [0.0, 0.4, 1.0],
                    colors: [
                      const Color(0xFF064E3B).withOpacity(0.9),
                      const Color(0xFF064E3B).withOpacity(0.2),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
              // Content
              Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
                      ),
                      child: Text(
                        (item.category ?? 'Général').toUpperCase(),
                        style: const TextStyle(
                          color: Color(0xFF34D399), 
                          fontSize: 9, 
                          fontWeight: FontWeight.w900,
                          letterSpacing: 1.5
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      item.title,
                      style: const TextStyle(
                        color: Colors.white, 
                        fontWeight: FontWeight.bold, 
                        fontSize: 16,
                        height: 1.2
                      ),
                    ),
                    const SizedBox(height: 16),
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.fullscreen, color: Colors.white, size: 20),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showLightbox(BuildContext context, String url) {
    showGeneralDialog(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: const Color(0xFF064E3B).withOpacity(0.95),
      transitionDuration: const Duration(milliseconds: 400),
      pageBuilder: (context, animation, secondaryAnimation) {
        return Scaffold(
          backgroundColor: Colors.transparent,
          body: Stack(
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Center(
                  child: Hero(
                    tag: url,
                    child: Container(
                      constraints: BoxConstraints(
                        maxWidth: MediaQuery.of(context).size.width * 0.9,
                        maxHeight: MediaQuery.of(context).size.height * 0.8,
                      ),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(40),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.5),
                            blurRadius: 50,
                          )
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(40),
                        child: _buildImageWidget(url, fit: BoxFit.contain),
                      ),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 60,
                right: 30,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 40),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
              const Positioned(
                bottom: 60,
                left: 0,
                right: 0,
                child: Center(
                  child: Text(
                    "ANSAROUDINE DAHIRA ARCHIVES",
                    style: TextStyle(
                      color: Color(0xFF10B981),
                      fontWeight: FontWeight.w900,
                      letterSpacing: 5,
                      fontSize: 10,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
