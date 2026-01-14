import 'product_entity.dart';

class ProductSectionData {
  final String title;
  final List<ProductEntity> products;
  final bool showSeeAll;

  const ProductSectionData({
    required this.title,
    required this.products,
    this.showSeeAll = true,
  });
}



