import '../services/api_service.dart';
import '../types.dart';

class GalleryController {
  Future<List<GalleryItem>> getGallery() async {
    final data = await ApiService.getGallery();
    return (data as List).map((item) => GalleryItem.fromJson(item)).toList();
  }

  Future<GalleryItem> createGalleryItem(Map<String, dynamic> itemData) async {
    final data = await ApiService.createGalleryItem(itemData);
    return GalleryItem.fromJson(data);
  }

  Future<void> deleteGalleryItem(String id) async {
    await ApiService.deleteGalleryItem(id);
  }
}
