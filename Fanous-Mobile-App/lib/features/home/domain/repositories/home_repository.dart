import 'package:fanous/features/home/domain/entities/product_entity.dart';

import '../entities/category_entity.dart';
import '../entities/product_section_data.dart';
import '../entities/slider_image_entity.dart';

abstract class HomeRepository {
  Future<List<CategoryEntity>> getCategories(String tabType);
  Future<List<ProductSectionData>> getProductSections(String tabType);
  Future<List<SliderImageEntity>> getSliderImages(String tabType);
  Future<List<ProductEntity>> getAllProducts(String categoryId);
}

