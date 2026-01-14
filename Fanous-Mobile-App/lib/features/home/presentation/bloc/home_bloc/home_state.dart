import 'package:equatable/equatable.dart';
import 'package:fanous/features/home/domain/entities/category_entity.dart';
import 'package:fanous/features/home/domain/entities/product_section_data.dart';
import 'package:fanous/features/home/domain/entities/slider_image_entity.dart';
import 'home_event.dart';

abstract class HomeState extends Equatable {
  const HomeState();

  @override
  List<Object?> get props => [];
}

class HomeInitial extends HomeState {
  final TabType selectedTab;

  const HomeInitial({this.selectedTab = TabType.property});

  @override
  List<Object> get props => [selectedTab];
}

class HomeLoading extends HomeState {
  final TabType selectedTab;

  const HomeLoading(this.selectedTab);

  @override
  List<Object> get props => [selectedTab];
}

class HomeLoaded extends HomeState {
  final TabType selectedTab;
  final List<CategoryEntity> categories;
  final List<ProductSectionData> sections;
  final List<SliderImageEntity> sliderImages;

  const HomeLoaded({
    required this.selectedTab,
    required this.categories,
    required this.sections,
    required this.sliderImages,
  });

  @override
  List<Object> get props => [selectedTab, categories, sections, sliderImages];
}

class HomeError extends HomeState {
  final TabType selectedTab;
  final String message;

  const HomeError({
    required this.selectedTab,
    required this.message,
  });

  @override
  List<Object> get props => [selectedTab, message];
}
