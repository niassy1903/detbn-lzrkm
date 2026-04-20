class NewsItem {
  final String id;
  final String title;
  final String category;
  final DateTime date;
  final String author;
  final String? image;
  final String excerpt;
  final String? content;
  final DateTime createdAt;

  NewsItem({
    required this.id,
    required this.title,
    required this.category,
    required this.date,
    required this.author,
    this.image,
    required this.excerpt,
    this.content,
    required this.createdAt,
  });

  factory NewsItem.fromJson(Map<String, dynamic> json) {
    return NewsItem(
      id: json['_id'] ?? '',
      title: json['title'] ?? '',
      category: json['category'] ?? '',
      date: json['date'] != null ? DateTime.parse(json['date']) : DateTime.now(),
      author: json['author'] ?? '',
      image: json['image'] is Map ? json['image']['url'] : json['image'],
      excerpt: json['excerpt'] ?? '',
      content: json['content'],
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : DateTime.now(),
    );
  }
}
