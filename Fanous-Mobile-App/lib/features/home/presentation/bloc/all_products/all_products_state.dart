import 'package:equatable/equatable.dart';
import '../../../domain/entities/product_entity.dart';
import '../../../domain/entities/filter_entity.dart';

abstract class AllProductsState extends Equatable {
  const AllProductsState();

  @override
  List<Object?> get props => [];
}

class AllProductsInitial extends AllProductsState {
  const AllProductsInitial();
}

class AllProductsLoading extends AllProductsState {
  const AllProductsLoading();
}

class AllProductsLoaded extends AllProductsState {
  final List<ProductEntity> allProducts;
  final List<ProductEntity> filteredProducts;
  final FilterEntity filterEntity;
  final String categoryId;

  const AllProductsLoaded({
    required this.allProducts,
    required this.filteredProducts,
    required this.filterEntity,
    required this.categoryId,
  });

  AllProductsLoaded copyWith({
    List<ProductEntity>? allProducts,
    List<ProductEntity>? filteredProducts,
    FilterEntity? filterEntity,
    String? categoryId,
  }) {
    return AllProductsLoaded(
      allProducts: allProducts ?? this.allProducts,
      filteredProducts: filteredProducts ?? this.filteredProducts,
      filterEntity: filterEntity ?? this.filterEntity,
      categoryId: categoryId ?? this.categoryId,
    );
  }

  @override
  List<Object?> get props => [allProducts, filteredProducts, filterEntity, categoryId];
}

class AllProductsError extends AllProductsState {
  final String message;

  const AllProductsError(this.message);

  @override
  List<Object?> get props => [message];
}

