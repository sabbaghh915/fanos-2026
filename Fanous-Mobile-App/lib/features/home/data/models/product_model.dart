import '../../domain/entities/product_entity.dart';

class ProductModel {
  final List<String> imageUrls;
  final String price;
  final double? priceValue;
  final String title;
  final String? category;
  final String details;
  final String location;
  final String timeAgo;
  final DateTime? createdAt;
  final bool isFeatured;
  final bool isForSale;

  const ProductModel({
    required this.imageUrls,
    required this.price,
    this.priceValue,
    required this.title,
    this.category,
    required this.details,
    required this.location,
    required this.timeAgo,
    this.createdAt,
    this.isFeatured = false,
    this.isForSale = false,
  });
  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      imageUrls: List<String>.from(json['imageUrls'] ?? []),
      price: json['price'] ?? '',
      priceValue: (json['priceValue'] is num) ? (json['priceValue'] as num).toDouble() : null,
      title: json['title'] ?? '',
      category: json['category'],
      details: json['details'] ?? '',
      location: json['location'] ?? '',
      timeAgo: json['timeAgo'] ?? '',
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      isFeatured: json['isFeatured'] ?? false,
      isForSale: json['isForSale'] ?? false,
    );
  }

  /// Convert to Entity
  ProductEntity toEntity() {
    return ProductEntity(
      imageUrls: imageUrls,
      price: price,
      priceValue: priceValue,
      title: title,
      category: category,
      details: details,
      location: location,
      timeAgo: timeAgo,
      createdAt: createdAt,
      isFeatured: isFeatured,
      isForSale: isForSale,
    );
  }

  /// Convert list of JSON to list of ProductModel
  static List<ProductModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => ProductModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}

