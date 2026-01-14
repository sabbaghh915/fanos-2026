import 'package:fanous/core/theme/app_typography.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class AppbarSection extends StatelessWidget {
  const AppbarSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(Icons.arrow_back_ios_new, size: 16.sp),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
          ),
          Text(
            'viehicles',
            style: AppTypography.titleMedium(isDark: isDark),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

