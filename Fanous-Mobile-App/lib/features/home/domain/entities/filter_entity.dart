import 'package:equatable/equatable.dart';
import 'date_filter_period.dart';

class FilterEntity extends Equatable {
  final DateFilterPeriod? dateFilter;
  final String? categoryFilter;
  final double? minPrice;
  final double? maxPrice;

  const FilterEntity({
    this.dateFilter,
    this.categoryFilter,
    this.minPrice,
    this.maxPrice,
  });

  bool get hasActiveFilters {
    return dateFilter != null && dateFilter != DateFilterPeriod.all ||
        categoryFilter != null ||
        minPrice != null ||
        maxPrice != null;
  }

  FilterEntity copyWith({
    DateFilterPeriod? dateFilter,
    String? categoryFilter,
    double? minPrice,
    double? maxPrice,
    bool? clearDateFilter,
    bool? clearCategoryFilter,
    bool? clearPriceFilter,
  }) {
    return FilterEntity(
      // إذا clearDateFilter == true: ضع null (إلغاء الفلتر)
      // إذا clearDateFilter != true: استخدم dateFilter الجديد إذا موجود، وإلا احتفظ بالقيمة القديمة
      dateFilter: clearDateFilter == true ? null : (dateFilter ?? this.dateFilter),
      // إذا clearCategoryFilter == true: ضع null (إلغاء الفلتر)
      // إذا clearCategoryFilter != true: استخدم categoryFilter الجديد إذا موجود، وإلا احتفظ بالقيمة القديمة
      categoryFilter: clearCategoryFilter == true ? null : (categoryFilter ?? this.categoryFilter),
      minPrice: clearPriceFilter == true ? null : (minPrice ?? this.minPrice),
      maxPrice: clearPriceFilter == true ? null : (maxPrice ?? this.maxPrice),
    );
  }

  @override
  List<Object?> get props => [dateFilter, categoryFilter, minPrice, maxPrice];
}

