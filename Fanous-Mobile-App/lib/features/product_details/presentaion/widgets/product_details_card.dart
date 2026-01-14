import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

class ProductDetailsCard extends StatelessWidget {
  final List<ProductDetailItem> details;

  const ProductDetailsCard({
    super.key,
    required this.details,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 8.w),
      padding: EdgeInsets.all(12.w),
      decoration: _cardDecoration,
      child: Column(
        children: details
            .map(
              (item) => _RowItem(
            title: item.title,
            value: item.value,
          ),
        )
            .toList(),
      ),
    );
  }

  BoxDecoration get _cardDecoration => BoxDecoration(
    color: AppColors.secondaryContainer.withAlpha(140),
    borderRadius: BorderRadius.circular(12.r),
  );
}

/// ===================== MODEL =====================

class ProductDetailItem {
  final String title;
  final String value;

  const ProductDetailItem({
    required this.title,
    required this.value,
  });
}

/// ===================== ROW ITEM =====================

class _RowItem extends StatelessWidget {
  final String title;
  final String value;

  const _RowItem({
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 6.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: Theme.of(context)
                .textTheme
                .labelLarge
                ?.copyWith(
              color: AppColors.textPrimaryLight.withAlpha(140),
            ),
          ),
          Text(
            value,
            style: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(color: AppColors.primary),
          ),
        ],
      ),
    );
  }
}
