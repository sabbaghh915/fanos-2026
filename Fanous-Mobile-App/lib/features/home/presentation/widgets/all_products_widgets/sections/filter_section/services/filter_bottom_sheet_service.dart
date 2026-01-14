import 'package:flutter/material.dart';
import '../../../../../../domain/entities/filter_type.dart';
import '../../../../../../domain/entities/date_filter_period.dart';
import '../filter_bottom_sheets/date_filter_sheet.dart';
import '../filter_bottom_sheets/category_filter_sheet.dart';
import '../filter_bottom_sheets/price_filter_sheet.dart';

class FilterBottomSheetService {
  FilterBottomSheetService._();

  static void showFilterBottomSheet(
    BuildContext context,
    FilterType filterType, {
    Function(DateFilterPeriod?)? onDateFilterApply,
    Function(String?)? onCategoryFilterApply,
    Function(double?, double?)? onPriceFilterApply,
  }) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) {
        if (filterType == FilterType.datePosted) {
          return DateFilterSheet(onApply: onDateFilterApply);
        } else if (filterType == FilterType.category) {
          return CategoryFilterSheet(onApply: onCategoryFilterApply);
        } else {
          return PriceFilterSheet(onApply: onPriceFilterApply);
        }
      },
    );
  }
}


