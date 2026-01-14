import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import '../../../../core/theme/app_colors.dart';

class ProductPriceSection extends StatelessWidget {
  final double price;
  final String title;
  final String location;
  final String timeAgo;

  final VoidCallback? onFavoriteTap;
  final VoidCallback? onShareTap;

  const ProductPriceSection({
    super.key,
    required this.price,
    required this.title,
    required this.location,
    required this.timeAgo,
    this.onFavoriteTap,
    this.onShareTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(8.w, 12.h, 8.w, 16.h),
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: AppColors.secondaryContainer.withAlpha(140),


      ),
      child: Column(

        spacing: 4.h,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          /// السعر + أزرار
          Row(
            children: [
              Text(
                '\$${price.toStringAsFixed(2)}',
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(color: AppColors.primary),
              ),

              const Spacer(),
              InkWell(
                onTap: onFavoriteTap,
                child: Icon(Icons.favorite_border, color: AppColors.primary),
              ),
              SizedBox(width: 8.w),
              InkWell(
                onTap: onShareTap,
                child: Icon(Icons.share, color: AppColors.primary),
              ),
            ],
          ),



          /// العنوان
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium,
          ),



          /// الموقع + الوقت
          Row(
            children: [
              Icon(
                Icons.location_on,
                size: AppSpacing.iconSizeSmall,
                color: AppColors.primary,
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Text(
                  location,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
              Text(
                timeAgo,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),
        ],
      ),
    );
  }

}
