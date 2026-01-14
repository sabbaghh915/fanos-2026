import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'filter_item_widget.dart';

class FilterSection extends StatefulWidget {
  const FilterSection({super.key});

  @override
  State<FilterSection> createState() => _FilterSectionState();
}

class _FilterSectionState extends State<FilterSection> {
  int selectedIndex = 0;
  final List<String> filters = ["Unread Chats", "All Chats", "Archived"];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      color: isDark ? AppColors.surfaceDark : AppColors.backgroundLight,
      height: 35.h,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: filters.length,
        padding: EdgeInsetsDirectional.only(start: 20.w),
        itemBuilder: (context, index) => FilterItemWidget(
          title: filters[index],
          isSelected: selectedIndex == index,
          onTap: () {
            setState(() {
              selectedIndex = index;
            });
          },
        ),
        separatorBuilder: (context, index) => SizedBox(width: 10.w),
      ),
    );
  }
}
