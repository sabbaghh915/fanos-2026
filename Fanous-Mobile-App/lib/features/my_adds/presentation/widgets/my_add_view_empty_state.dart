import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
class MyAddViewEmptyState extends StatelessWidget {
  const MyAddViewEmptyState({super.key});
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        spacing: 12.h,
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.search_off,
            size: 90.sp,
        color: AppColors.secondary.withAlpha(120),
          ),
          Text(
            'You currently have no ads',
            style:Theme.of(context).textTheme.titleLarge?.copyWith(color: AppColors.secondary.withAlpha(120)),
          ),
        ],
      ),
    );
  }
}
