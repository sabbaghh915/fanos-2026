import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

class ProductDescriptionCard extends StatelessWidget {
  final String description;
  const ProductDescriptionCard({super.key, required this.description});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 8.w),
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: AppColors.secondaryContainer.withAlpha(140),
        borderRadius: BorderRadius.circular(12.r),
      ),
      child: Text(
        description,
        style: Theme.of(context)
            .textTheme
            .titleSmall
            ?.copyWith(color: AppColors.primary),
      ),
    );
  }
}
