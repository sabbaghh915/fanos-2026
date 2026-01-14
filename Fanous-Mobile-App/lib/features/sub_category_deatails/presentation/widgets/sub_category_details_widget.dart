import 'package:fanous/features/sub_category_deatails/presentation/widgets/product_grid_section/products_grid_section.dart';
import 'package:fanous/features/sub_category_deatails/presentation/widgets/sub_category_search_section/sub_category_search_section.dart';
import 'package:flutter/material.dart';
import 'package:fanous/core/widgets/filter_card.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SubCategoryDetailsWidget extends StatelessWidget {
  final List<String> filters;
  final List<Map<String, dynamic>> products;
  final Function(String)? onSearchChanged;
  final Function(String)? onFilterTap;
  final Function(Map<String, dynamic>)? onProductTap;

  const SubCategoryDetailsWidget({
    super.key,
    this.filters = const [],
    this.products = const [],
    this.onSearchChanged,
    this.onFilterTap,
    this.onProductTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 30.0.sp),
        // Search Section
        SubCategorySearchSection(),
        // Filters Section
        if (filters.isNotEmpty)
          Container(
            padding: const EdgeInsets.symmetric(vertical: 12.0),
            height: 60.0.sp,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              itemCount: filters.length,
              itemBuilder: (context, index) {
                return FilterCard(
                  label: filters[index],
                  isSelected: false,
                  onTap: () => onFilterTap?.call(filters[index]),
                );
              },
            ),
          ),
        // Products Grid Section
        Expanded(
          child: ProductsGridSection(
            products: products,
            onProductTap: onProductTap,
          ),
        ),
      ],
    );
  }
}
