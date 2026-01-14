import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../../domain/entities/filter_type.dart';
import '../../../../../domain/entities/date_filter_period.dart';
import '../../../../bloc/all_products/all_products_bloc.dart';
import '../../../../bloc/all_products/all_products_event.dart';
import '../../../../bloc/all_products/all_products_state.dart';
import 'filter_buttons_row.dart';
import 'services/filter_bottom_sheet_service.dart';

class FilterSection extends StatefulWidget {
  final AllProductsLoaded state;

  const FilterSection({
    super.key,
    required this.state,
  });

  @override
  State<FilterSection> createState() => _FilterSectionState();
}

class _FilterSectionState extends State<FilterSection> {
  int? _selectedFilterIndex;

  void _showFilterBottomSheet(
    BuildContext context,
    FilterType filterType,
  ) {
    FilterBottomSheetService.showFilterBottomSheet(
      context,
      filterType,
      // هذه هي الدالة التي ستنفذ عند تطبيق الفلتر على حسب نوعه
      onDateFilterApply: (DateFilterPeriod? period) {
        context.read<AllProductsBloc>().add(
              ApplyDateFilterEvent(period),
            );
            // هنا في حال الضغط والفلتر شغال يقوم بالتعطيل
        if (period == null) {
          setState(() {
            _selectedFilterIndex = null;
          });
        }
      },
      onCategoryFilterApply: (String? category) {
        context.read<AllProductsBloc>().add(
              ApplyCategoryFilterEvent(category: category),
            );
        if (category == null) {
          setState(() {
            _selectedFilterIndex = null;
          });
        }
      },
      onPriceFilterApply: (double? minPrice, double? maxPrice) {
        context.read<AllProductsBloc>().add(
              ApplyPriceFilterEvent(minPrice: minPrice, maxPrice: maxPrice),
            );
        if (minPrice == null && maxPrice == null) {
          setState(() {
            _selectedFilterIndex = null;
          });
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: FilterButtonsRow(
        key: ValueKey(_selectedFilterIndex),
        filters: const [
          FilterType.datePosted,
          FilterType.category,
          FilterType.price,
        ],
        initialSelectedIndex: _selectedFilterIndex,
        onFilterChanged: (index) {
          setState(() {
            _selectedFilterIndex = index == -1 ? null : index;
          });
        },
        onFilterTap: (filterType) {
          _showFilterBottomSheet(context, filterType);
        },
        onFilterClear: (filterType) {
          context.read<AllProductsBloc>().add(
                ClearFilterEvent(filterType),
              );
          setState(() {
            _selectedFilterIndex = null;
          });
        },
      ),
    );
  }
}

