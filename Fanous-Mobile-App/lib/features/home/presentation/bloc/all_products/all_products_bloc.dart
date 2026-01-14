import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/usecases/get_all_products_usecase.dart';
import '../../../domain/entities/filter_entity.dart';
import '../../../domain/entities/filter_type.dart';
import '../../../domain/entities/date_filter_period.dart';
import '../../../domain/entities/product_entity.dart';
import 'all_products_event.dart';
import 'all_products_state.dart';

class AllProductsBloc extends Bloc<AllProductsEvent, AllProductsState> {
  final GetAllProductsUseCase getAllProductsUseCase;

  AllProductsBloc({
    required this.getAllProductsUseCase,
  }) : super(const AllProductsInitial()) {
    on<LoadAllProductsEvent>(_onLoadAllProducts);
    on<ApplyDateFilterEvent>(_onApplyDateFilter);
    on<ApplyCategoryFilterEvent>(_onApplyCategoryFilter);
    on<ApplyPriceFilterEvent>(_onApplyPriceFilter);
    on<ClearFilterEvent>(_onClearFilter);
    on<ClearAllFiltersEvent>(_onClearAllFilters);
  }

  Future<void> _onLoadAllProducts(
    LoadAllProductsEvent event,
    Emitter<AllProductsState> emit,
  ) async {
    emit(const AllProductsLoading());

    try {
      final products = await getAllProductsUseCase(event.categoryId);
      final filterEntity = const FilterEntity();
      final filteredProducts = _applyFilters(products, filterEntity);

      emit(AllProductsLoaded(
        allProducts: products,
        filteredProducts: filteredProducts,
        filterEntity: filterEntity,
        categoryId: event.categoryId,
      ));
    } catch (e) {
      emit(AllProductsError(e.toString()));
    }
  }

  void _onApplyDateFilter(
    ApplyDateFilterEvent event,
    Emitter<AllProductsState> emit,
  ) {
    if (state is! AllProductsLoaded) return;

    final currentState = state as AllProductsLoaded;
    final updatedFilter = currentState.filterEntity.copyWith(
      dateFilter: event.period,
      clearDateFilter: event.period == null,
    );

    final filteredProducts = _applyFilters(
      currentState.allProducts,
      updatedFilter,
    );

    emit(currentState.copyWith(
      filterEntity: updatedFilter,
      filteredProducts: filteredProducts,
    ));
  }

  void _onApplyCategoryFilter(
    ApplyCategoryFilterEvent event,
    Emitter<AllProductsState> emit,
  ) {
    if (state is! AllProductsLoaded) return;

    final currentState = state as AllProductsLoaded;
    final shouldClear = event.category == null;

    final updatedFilter = currentState.filterEntity.copyWith(
      categoryFilter: event.category,
      clearCategoryFilter: shouldClear,
    );

    final filteredProducts = _applyFilters(
      currentState.allProducts,
      updatedFilter,
    );

    emit(currentState.copyWith(
      filterEntity: updatedFilter,
      filteredProducts: filteredProducts,
    ));
  }

  void _onApplyPriceFilter(
    ApplyPriceFilterEvent event,
    Emitter<AllProductsState> emit,
  ) {
    if (state is! AllProductsLoaded) return;

    final currentState = state as AllProductsLoaded;
    final shouldClear = event.minPrice == null && event.maxPrice == null;

    final updatedFilter = currentState.filterEntity.copyWith(
      minPrice: event.minPrice,
      maxPrice: event.maxPrice,
      clearPriceFilter: shouldClear,
    );

    final filteredProducts = _applyFilters(
      currentState.allProducts,
      updatedFilter,
    );

    emit(currentState.copyWith(
      filterEntity: updatedFilter,
      filteredProducts: filteredProducts,
    ));
  }

  void _onClearFilter(
    ClearFilterEvent event,
    Emitter<AllProductsState> emit,
  ) {
    if (state is! AllProductsLoaded) return;

    final currentState = state as AllProductsLoaded;
    FilterEntity updatedFilter;

    switch (event.filterType) {
      case FilterType.datePosted:
        updatedFilter = currentState.filterEntity.copyWith(clearDateFilter: true);
        break;
      case FilterType.category:
        updatedFilter = currentState.filterEntity.copyWith(clearCategoryFilter: true);
        break;
      case FilterType.price:
        updatedFilter = currentState.filterEntity.copyWith(clearPriceFilter: true);
        break;
    }

    final filteredProducts = _applyFilters(
      currentState.allProducts,
      updatedFilter,
    );

    emit(currentState.copyWith(
      filterEntity: updatedFilter,
      filteredProducts: filteredProducts,
    ));
  }

  void _onClearAllFilters(
    ClearAllFiltersEvent event,
    Emitter<AllProductsState> emit,
  ) {
    if (state is! AllProductsLoaded) return;

    final currentState = state as AllProductsLoaded;
    final clearedFilter = const FilterEntity();
    final filteredProducts = _applyFilters(
      currentState.allProducts,
      clearedFilter,
    );

    emit(currentState.copyWith(
      filterEntity: clearedFilter,
      filteredProducts: filteredProducts,
    ));
  }

  // منطق الفلترة هنا
  List<ProductEntity> _applyFilters(
    List<ProductEntity> products,
    FilterEntity filterEntity,
  ) {
    // إذا لم يكن هناك فلاتر نشطة، أعد جميع المنتجات
    if (!filterEntity.hasActiveFilters) {
      return products;
    }

    return products.where((product) {
      // فلتر التاريخ - إذا كان null أو all، نتجاهله
      if (filterEntity.dateFilter != null && filterEntity.dateFilter != DateFilterPeriod.all) {
        if (!_matchesDateFilter(product, filterEntity.dateFilter)) {
          return false;
        }
      }

      // فلتر الفئة - إذا كان null، نتجاهله
      if (filterEntity.categoryFilter != null) {
        if (product.category == null || product.category!.toLowerCase() != filterEntity.categoryFilter!.toLowerCase()) {
          return false;
        }
      }

      // فلتر السعر - إذا كان null، نتجاهله
      if (filterEntity.minPrice != null || filterEntity.maxPrice != null) {
        final productPrice = product.priceValue;
        if (productPrice == null) {
          return false;
        }
        // التحقق من الحد الأدنى
        if (filterEntity.minPrice != null && productPrice < filterEntity.minPrice!) {
          return false;
        }
        // التحقق من الحد الأقصى
        if (filterEntity.maxPrice != null && productPrice > filterEntity.maxPrice!) {
          return false;
        }
      }

      return true;
    }).toList();
  }


  /// التحقق من تطابق المنتج مع فلتر التاريخ
  bool _matchesDateFilter(ProductEntity product, DateFilterPeriod? period) {
    if (period == null || period == DateFilterPeriod.all) {
      return true;
    }

    if (product.createdAt == null) {
      return false;
    }

    final productDate = product.createdAt!;
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);

    switch (period) {
      case DateFilterPeriod.today:
        return productDate.isAfter(today.subtract(const Duration(days: 1)));
      case DateFilterPeriod.thisWeek:
        return productDate.isAfter(now.subtract(const Duration(days: 7)));
      case DateFilterPeriod.thisMonth:
        return productDate.isAfter(DateTime(now.year, now.month - 1, now.day));
      case DateFilterPeriod.last3Months:
        return productDate.isAfter(DateTime(now.year, now.month - 3, now.day));
      case DateFilterPeriod.last6Months:
        return productDate.isAfter(DateTime(now.year, now.month - 6, now.day));
      case DateFilterPeriod.lastYear:
        return productDate.isAfter(DateTime(now.year - 1, now.month, now.day));
      case DateFilterPeriod.all:
        return true;
    }
  }
}

