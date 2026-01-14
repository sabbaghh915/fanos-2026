import 'package:equatable/equatable.dart';
import '../../../domain/entities/filter_type.dart';
import '../../../domain/entities/date_filter_period.dart';

abstract class AllProductsEvent extends Equatable {
  const AllProductsEvent();

  @override
  List<Object?> get props => [];
}

class LoadAllProductsEvent extends AllProductsEvent {
  final String categoryId;

  const LoadAllProductsEvent(this.categoryId);

  @override
  List<Object?> get props => [categoryId];
}

class ApplyDateFilterEvent extends AllProductsEvent {
  final DateFilterPeriod? period;

  const ApplyDateFilterEvent(this.period);

  @override
  List<Object?> get props => [period];
}

class ApplyCategoryFilterEvent extends AllProductsEvent {
  final String? category;

  const ApplyCategoryFilterEvent({this.category});

  @override
  List<Object?> get props => [category];
}

class ApplyPriceFilterEvent extends AllProductsEvent {
  final double? minPrice;
  final double? maxPrice;

  const ApplyPriceFilterEvent({this.minPrice, this.maxPrice});

  @override
  List<Object?> get props => [minPrice, maxPrice];
}

class ClearFilterEvent extends AllProductsEvent {
  final FilterType filterType;

  const ClearFilterEvent(this.filterType);

  @override
  List<Object?> get props => [filterType];
}

class ClearAllFiltersEvent extends AllProductsEvent {
  const ClearAllFiltersEvent();
}

