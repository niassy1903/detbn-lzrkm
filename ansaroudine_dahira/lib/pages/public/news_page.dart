import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../context/data_context.dart';
import '../../layouts/public_layout.dart';
import '../../models/news.dart';

class NewsPage extends StatefulWidget {
  const NewsPage({super.key});

  @override
  State<NewsPage> createState() => _NewsPageState();
}

class _NewsPageState extends State<NewsPage> {
  String _currentFilter = 'Tous';
  final _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final dataProvider = Provider.of<DataContext>(context);
    final news = dataProvider.news;
    
    final categories = ['Tous', ...news.map((n) => n.category).toSet()];
    
    final filteredNews = news.where((article) {
      final matchesFilter = _currentFilter == 'Tous' || article.category == _currentFilter;
      final matchesSearch = article.title.toLowerCase().contains(_searchController.text.toLowerCase()) ||
                           article.excerpt.toLowerCase().contains(_searchController.text.toLowerCase());
      return matchesFilter && matchesSearch;
    }).toList();

    final featuredArticle = news.isNotEmpty ? news[0] : null;

    return PublicLayout(
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Header
            Container(
              color: Colors.grey[50],
              width: double.infinity,
              padding: const EdgeInsets.only(top: 120, bottom: 60, left: 24, right: 24),
              child: Column(
                children: [
                  const Text("Le Fil de la Fayda", style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text(
                    "Actualités & Sagesse.",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.blackHanSans(fontSize: 48, height: 1.1),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Restez connectés à la vie de notre Dahira et nourrissez votre esprit avec nos derniers articles et annonces.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, fontSize: 18, height: 1.6),
                  ),
                ],
              ),
            ),

            if (featuredArticle != null)
              _buildFeaturedArticle(featuredArticle),

            // Filters & Search
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              child: Column(
                children: [
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: categories.map((cat) {
                        final isSelected = _currentFilter == cat;
                        return Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: GestureDetector(
                            onTap: () => setState(() => _currentFilter = cat),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 300),
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                              decoration: BoxDecoration(
                                color: isSelected ? const Color(0xFF10B981) : Colors.grey[100],
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                cat.toUpperCase(),
                                style: TextStyle(
                                  color: isSelected ? Colors.white : Colors.grey,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 10,
                                  letterSpacing: 2,
                                ),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                  const SizedBox(height: 24),
                  TextField(
                    controller: _searchController,
                    onChanged: (_) => setState(() {}),
                    decoration: InputDecoration(
                      hintText: "Rechercher un article...",
                      prefixIcon: const Icon(Icons.search, color: Colors.grey),
                      filled: true,
                      fillColor: Colors.grey[50],
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.all(20),
                    ),
                  ),
                ],
              ),
            ),

            // Grid
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: filteredNews.length,
                separatorBuilder: (context, index) => const SizedBox(height: 40),
                itemBuilder: (context, index) {
                  final article = filteredNews[index];
                  return _buildArticleCard(article);
                },
              ),
            ),

            // Newsletter
            Container(
              margin: const EdgeInsets.all(24),
              padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 32),
              decoration: BoxDecoration(color: Colors.teal[900], borderRadius: BorderRadius.circular(50)),
              child: Column(
                children: [
                  const Icon(Icons.auto_awesome, color: Color(0xFF10B981), size: 60),
                  const SizedBox(height: 32),
                  Text("Restez éclairés par la Lumière.", textAlign: TextAlign.center, style: GoogleFonts.blackHanSans(color: Colors.white, fontSize: 32)),
                  const SizedBox(height: 16),
                  const Text("Inscrivez-vous à notre newsletter pour recevoir les dernières sagesses et actualités.", textAlign: TextAlign.center, style: TextStyle(color: Colors.white70, fontSize: 16)),
                  const SizedBox(height: 40),
                  TextField(
                    decoration: InputDecoration(
                      hintText: "Votre adresse email",
                      hintStyle: const TextStyle(color: Colors.white24),
                      filled: true,
                      fillColor: Colors.white.withOpacity(0.05),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: BorderSide.none),
                      contentPadding: const EdgeInsets.all(20),
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981), minimumSize: const Size(double.infinity, 60), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20))),
                    child: const Text("S'abonner", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildFeaturedArticle(NewsItem article) {
    return Container(
      margin: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(50),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 40)],
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          Image.network(article.image ?? 'https://via.placeholder.com/300', height: 300, width: double.infinity, fit: BoxFit.cover),
          Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6), decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(10)), child: const Text("À LA UNE", style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold))),
                    const SizedBox(width: 12),
                    Text(article.category.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 16),
                Text(article.title, style: GoogleFonts.blackHanSans(fontSize: 28)),
                const SizedBox(height: 12),
                Text(article.excerpt, style: const TextStyle(color: Colors.grey, fontSize: 16, height: 1.5)),
                const SizedBox(height: 24),
                Row(
                  children: [
                    const Icon(Icons.calendar_today, size: 16, color: Color(0xFF10B981)),
                    const SizedBox(width: 8),
                    Text(DateFormat('dd/MM/yyyy').format(article.date), style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    const SizedBox(width: 24),
                    const Icon(Icons.person, size: 16, color: Color(0xFF10B981)),
                    const SizedBox(width: 8),
                    Text(article.author, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildArticleCard(NewsItem article) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(40),
        border: Border.all(color: Colors.grey[100]!),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          Image.network(article.image ?? 'https://via.placeholder.com/200', height: 200, width: double.infinity, fit: BoxFit.cover),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(article.category.toUpperCase(), style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 10)),
                const SizedBox(height: 12),
                Text(article.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text(article.excerpt, maxLines: 2, style: const TextStyle(color: Colors.grey, height: 1.4)),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(DateFormat('dd/MM/yyyy').format(article.date), style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    const Icon(Icons.arrow_forward, color: Color(0xFF10B981)),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
