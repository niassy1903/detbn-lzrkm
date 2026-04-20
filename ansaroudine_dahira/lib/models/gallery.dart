class GalleryItem {
  final String id;
  final String title;
  final String url;
  final String? category;
  final DateTime createdAt;

  GalleryItem({
    required this.id,
    required this.title,
    required this.url,
    this.category,
    required this.createdAt,
  });

  factory GalleryItem.fromJson(Map<String, dynamic> json) {
    return GalleryItem(
      id: json['_id'] ?? '',
      title: json['title'] ?? '',
      url: json['url'] is Map ? json['url']['url'] : (json['url'] ?? ''),
      category: json['category'],
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt']) 
          : DateTime.now(),
    );
  }
}
