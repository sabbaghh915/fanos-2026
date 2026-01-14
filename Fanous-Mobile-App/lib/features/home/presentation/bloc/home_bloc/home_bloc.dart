import 'package:fanous/features/home/domain/usecases/get_categories_usecase.dart';
import 'package:fanous/features/home/domain/usecases/get_product_sections_usecase.dart';
import 'package:fanous/features/home/domain/usecases/get_slider_images_usecase.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'home_event.dart';
import 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final GetCategoriesUseCase getCategoriesUseCase;
  final GetProductSectionsUseCase getProductSectionsUseCase;
  final GetSliderImagesUseCase getSliderImagesUseCase;

  HomeBloc({
    required this.getCategoriesUseCase,
    required this.getProductSectionsUseCase,
    required this.getSliderImagesUseCase,
  }) : super(const HomeInitial(selectedTab: TabType.property)) {
    on<HomeTabChanged>(_onTabChanged);
    on<LoadHomeData>(_onLoadHomeData);
    on<RefreshHomeData>(_onRefreshHomeData);
  }

  void _onTabChanged(HomeTabChanged event, Emitter<HomeState> emit) {
    emit(HomeInitial(selectedTab: event.tabType));
    // Load data when tab changes
    add(LoadHomeData(event.tabType));
  }

  Future<void> _onLoadHomeData(
    LoadHomeData event,
    Emitter<HomeState> emit,
  ) async {
    emit(HomeLoading(event.tabType));

    try {
      final tabTypeString = _tabTypeToString(event.tabType);
      
      final categories = await getCategoriesUseCase(tabTypeString);
      final sections = await getProductSectionsUseCase(tabTypeString);
      final sliderImages = await getSliderImagesUseCase(tabTypeString);

      emit(HomeLoaded(
        selectedTab: event.tabType,
        categories: categories,
        sections: sections,
        sliderImages: sliderImages,
      ));
    } catch (e) {
      emit(HomeError(
        selectedTab: event.tabType,
        message: e.toString(),
      ));
    }
  }

  Future<void> _onRefreshHomeData(
    RefreshHomeData event,
    Emitter<HomeState> emit,
  ) async {
    // Keep current state while refreshing
    if (state is HomeLoaded) {
      final currentState = state as HomeLoaded;
      emit(HomeLoaded(
        selectedTab: currentState.selectedTab,
        categories: currentState.categories,
        sections: currentState.sections,
        sliderImages: currentState.sliderImages,
      ));
    }

    try {
      final tabTypeString = _tabTypeToString(event.tabType);
      
      final categories = await getCategoriesUseCase(tabTypeString);
      final sections = await getProductSectionsUseCase(tabTypeString);
      final sliderImages = await getSliderImagesUseCase(tabTypeString);

      emit(HomeLoaded(
        selectedTab: event.tabType,
        categories: categories,
        sections: sections,
        sliderImages: sliderImages,
      ));
    } catch (e) {
      emit(HomeError(
        selectedTab: event.tabType,
        message: e.toString(),
      ));
    }
  }

  String _tabTypeToString(TabType tabType) {
    switch (tabType) {
      case TabType.property:
        return 'property';
      case TabType.motors:
        return 'motors';
      case TabType.electronics:
        return 'electronics';
    }
  }
}
