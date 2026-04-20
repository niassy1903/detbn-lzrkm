import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImageUpload extends StatefulWidget {
  final String label;
  final String? initialImage;
  final Function(String) onImageSelect;

  const ImageUpload({
    super.key,
    required this.label,
    this.initialImage,
    required this.onImageSelect,
  });

  @override
  State<ImageUpload> createState() => _ImageUploadState();
}

class _ImageUploadState extends State<ImageUpload> {
  String? _preview;
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _preview = widget.initialImage;
  }

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1024,
        maxHeight: 1024,
        imageQuality: 85,
      );

      if (image != null) {
        final bytes = await image.readAsBytes();
        final base64String = 'data:image/jpeg;base64,${base64Encode(bytes)}';
        setState(() {
          _preview = base64String;
        });
        widget.onImageSelect(base64String);
      }
    } catch (e) {
      debugPrint("Error picking image: $e");
    }
  }

  void _clearImage() {
    setState(() {
      _preview = null;
    });
    widget.onImageSelect('');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8, bottom: 8),
          child: Text(
            widget.label.toUpperCase(),
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: Color(0xFF64748B), // Slate-500
              letterSpacing: 1.5,
            ),
          ),
        ),
        GestureDetector(
          onTap: _pickImage,
          child: AspectRatio(
            aspectRatio: 16 / 9,
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFFF8FAFC), // Gray-50
                borderRadius: BorderRadius.circular(32),
                border: Border.all(
                  color: _preview != null 
                      ? const Color(0xFF10B981).withOpacity(0.5) 
                      : const Color(0xFFE2E8F0), // Gray-200
                  width: 2,
                  style: BorderStyle.solid, 
                ),
              ),
              clipBehavior: Clip.antiAlias,
              child: _preview != null
                  ? Stack(
                      children: [
                        Positioned.fill(
                          child: _preview!.startsWith('data:')
                              ? Image.memory(
                                  base64Decode(_preview!.split(',')[1]),
                                  fit: BoxFit.cover,
                                )
                              : Image.network(
                                  _preview!,
                                  fit: BoxFit.cover,
                                ),
                        ),
                        Positioned(
                          top: 16,
                          right: 16,
                          child: GestureDetector(
                            onTap: _clearImage,
                            child: Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.5),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.close,
                                color: Colors.white,
                                size: 20,
                              ),
                            ),
                          ),
                        ),
                      ],
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF10B981).withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.upload_rounded,
                            color: Color(0xFF10B981),
                            size: 32,
                          ),
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          "Cliquez pour uploader",
                          style: TextStyle(
                            color: Color(0xFF64748B),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
            ),
          ),
        ),
      ],
    );
  }
}
