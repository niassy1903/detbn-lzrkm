import '../services/api_service.dart';
import '../types.dart';

class NewsController {
  Future<List<NewsItem>> getNews() async {
    final data = await ApiService.getNews();
    return (data as List).map((n) => NewsItem.fromJson(n)).toList();
  }

  Future<NewsItem> createNews(Map<String, dynamic> newsData) async {
    final data = await ApiService.createNews(newsData);
    return NewsItem.fromJson(data);
  }

  Future<NewsItem> updateNews(String id, Map<String, dynamic> newsData) async {
    final data = await ApiService.updateNews(id, newsData);
    return NewsItem.fromJson(data);
  }

  Future<void> deleteNews(String id) async {
    await ApiService.deleteNews(id);
  }
}
