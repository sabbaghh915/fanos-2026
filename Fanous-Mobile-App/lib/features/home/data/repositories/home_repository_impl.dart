import 'package:fanous/features/home/domain/entities/product_entity.dart';

import '../../domain/entities/category_entity.dart';
import '../../domain/entities/product_section_data.dart';
import '../../domain/entities/slider_image_entity.dart';
import '../../domain/repositories/home_repository.dart';
import '../datasources/home_remote_data_source.dart';


class HomeRepositoryImpl implements HomeRepository {
  final HomeRemoteDataSource remoteDataSource;

  const HomeRepositoryImpl({
    required this.remoteDataSource,
  });

  @override
  Future<List<CategoryEntity>> getCategories(String tabType) async {
    // Data Source handles try/catch and returns Models
    final categoryModels = await remoteDataSource.getCategories(tabType);
    
    // Convert Models to Entities
    return categoryModels.map((model) => CategoryEntity(
      icon: model.icon,
      title: model.title,
    )).toList();
  }

  @override
  Future<List<ProductSectionData>> getProductSections(String tabType) async {
    // Data Source handles try/catch and returns Models
    final sectionModels = await remoteDataSource.getProductSections(tabType);
    
    // Convert Models to Entities
    return sectionModels.map((model) => ProductSectionData(
      title: model.title,
      products: model.products.map((product) => ProductEntity(
        imageUrls: product.imageUrls,
        price: product.price,
        priceValue: product.priceValue,
        title: product.title,
        category: product.category,
        details: product.details,
        location: product.location,
        timeAgo: product.timeAgo,
        createdAt: product.createdAt,
        isFeatured: product.isFeatured,
        isForSale: product.isForSale,
      )).toList(),
      showSeeAll: model.showSeeAll,
    )).toList();
  }

  @override
  Future<List<SliderImageEntity>> getSliderImages(String tabType) async {
    // Data Source handles try/catch and returns Models
    final sliderImageModels = await remoteDataSource.getSliderImages(tabType);
    
    // Convert Models to Entities
    return sliderImageModels.map((model) => model.toEntity()).toList();
  }

  @override
  Future<List<ProductEntity>> getAllProducts(String categoryId) async {
    // Data Source handles try/catch and returns Models
    final productModels = await remoteDataSource.getAllProducts(categoryId);
    
    // Convert Models to Entities
    return productModels.map((model) => ProductEntity(
      imageUrls: model.imageUrls,
      price: model.price,
      priceValue: model.priceValue,
      title: model.title,
      category: model.category,
      details: model.details,
      location: model.location,
      timeAgo: model.timeAgo,
      createdAt: model.createdAt,
      isFeatured: model.isFeatured,
      isForSale: model.isForSale,
    )).toList();
  }
}
