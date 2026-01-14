import 'package:fanous/features/home/domain/repositories/home_repository.dart';

import '../entities/product_entity.dart';

class GetAllProductsUseCase {
  final HomeRepository repository;

  GetAllProductsUseCase(this.repository);

  Future<List<ProductEntity>> call(String categoryId) {
    return repository.getAllProducts(categoryId);
  }
}

