import '../repositories/home_repository.dart';
import '../entities/slider_image_entity.dart';

class GetSliderImagesUseCase {
  final HomeRepository repository;

  GetSliderImagesUseCase(this.repository);

  Future<List<SliderImageEntity>> call(String tabType) {
    return repository.getSliderImages(tabType);
  }
}

