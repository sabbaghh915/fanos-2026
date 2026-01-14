import '../../domain/entities/slider_image_entity.dart';

class SliderImageModel {
  final String imageUrl;

  const SliderImageModel({
    required this.imageUrl,
  });

  factory SliderImageModel.fromJson(Map<String, dynamic> json) {
    return SliderImageModel(
      imageUrl: json['imageUrl'] as String? ?? '',
    );
  }

  /// Convert to Entity
  SliderImageEntity toEntity() {
    return SliderImageEntity(
      imageUrl: imageUrl,
    );
  }

  /// Convert list of JSON to list of SliderImageModel
  static List<SliderImageModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => SliderImageModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}

