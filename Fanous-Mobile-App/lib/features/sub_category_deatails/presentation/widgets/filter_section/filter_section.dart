import 'package:fanous/core/widgets/filter_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FilterSection extends StatelessWidget {
  const FilterSection({
    super.key,
    required this.filters,
    required this.onFilterTap,
  });

  final Function(String) onFilterTap;
  final List<String> filters;

  @override
  Widget build(BuildContext context) {
    return Container(
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
            onTap: () => onFilterTap(filters[index]),
          );
        },
      ),
    );
  }
}
