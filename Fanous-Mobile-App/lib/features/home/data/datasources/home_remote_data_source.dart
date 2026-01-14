import 'mock/home_mock_data.dart';
import 'mock/all_products_mock_data.dart';
import 'package:fanous/features/home/data/models/category_model.dart';
import 'package:fanous/features/home/data/models/product_section_data_model.dart';
import 'package:fanous/features/home/data/models/product_model.dart';
import 'package:fanous/features/home/data/models/slider_image_model.dart';

abstract class HomeRemoteDataSource {
  Future<List<CategoryModel>> getCategories(String tabType);
  Future<List<ProductSectionDataModel>> getProductSections(String tabType);
  Future<List<SliderImageModel>> getSliderImages(String tabType);
  Future<List<ProductModel>> getAllProducts(String categoryId);
}

class HomeRemoteDataSourceImpl implements HomeRemoteDataSource {
  @override
  Future<List<CategoryModel>> getCategories(String tabType) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final json = HomeMockData.getCategoriesJson(tabType);
      return (json['categories'] as List)
          .map((item) => CategoryModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }

  @override
  Future<List<ProductSectionDataModel>> getProductSections(String tabType) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final json = HomeMockData.getProductSectionsJson(tabType);
      return (json['sections'] as List)
          .map((item) => ProductSectionDataModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }

  @override
  Future<List<SliderImageModel>> getSliderImages(String tabType) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final json = HomeMockData.getSliderImagesJson(tabType);
      return SliderImageModel.fromJsonList(json['images'] as List);
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }

  @override
  Future<List<ProductModel>> getAllProducts(String categoryId) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final json = AllProductsMockData.getAllProductsJson(categoryId);
      return (json['products'] as List)
          .map((item) => ProductModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }
}
