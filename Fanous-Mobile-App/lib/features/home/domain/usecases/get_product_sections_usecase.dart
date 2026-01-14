import '../entities/product_section_data.dart';
import '../repositories/home_repository.dart';

class GetProductSectionsUseCase {
  final HomeRepository repository;

  GetProductSectionsUseCase(this.repository);

  Future<List<ProductSectionData>> call(String tabType) {
    return repository.getProductSections(tabType);
  }
}

