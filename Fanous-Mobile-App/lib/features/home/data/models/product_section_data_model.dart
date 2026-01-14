import '../../domain/entities/product_section_data.dart';
import 'product_model.dart';

class ProductSectionDataModel {
  final String title;
  final List<ProductModel> products;
  final bool showSeeAll;

  const ProductSectionDataModel({
    required this.title,
    required this.products,
    this.showSeeAll = true,
  });

  /// Convert from JSON response
  /// Expected JSON format:
  /// {
  ///   "title": "Section Title",
  ///   "products": [
  ///     { "imageUrl": "...", "price": "...", ... },
  ///     ...
  ///   ],
  ///   "showSeeAll": true
  /// }
  factory ProductSectionDataModel.fromJson(Map<String, dynamic> json) {
    final productsJson = json['products'] as List<dynamic>?;
    final products = productsJson != null
        ? productsJson
            .map((productJson) => ProductModel.fromJson(productJson as Map<String, dynamic>))
            .toList()
        : <ProductModel>[];

    return ProductSectionDataModel(
      title: json['title'] as String? ?? '',
      products: products,
      showSeeAll: json['showSeeAll'] as bool? ?? json['show_see_all'] as bool? ?? true,
    );
  }

  /// Convert to Entity
  ProductSectionData toEntity() {
    return ProductSectionData(
      title: title,
      products: products.map((product) => product.toEntity()).toList(),
      showSeeAll: showSeeAll,
    );
  }
}

