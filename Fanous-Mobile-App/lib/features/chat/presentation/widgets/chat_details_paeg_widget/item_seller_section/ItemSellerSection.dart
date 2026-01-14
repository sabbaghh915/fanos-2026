import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ItemSellerSection extends StatelessWidget {
  final String productName;
  final String productPrice;
  final String? productImageUrl;

  const ItemSellerSection({
    super.key,
    required this.productName,
    required this.productPrice,
    this.productImageUrl,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    final containerColor = isDark
        ? AppColors.backgroundDark
        : AppColors.surfaceLight;
    
    final textColor = isDark
        ? AppColors.textPrimaryDark
        : AppColors.textPrimaryLight;
    
    final placeholderColor = isDark ? Colors.grey[800] : Colors.grey[300];
    
    final placeholderIconColor = isDark ? Colors.grey[600] : Colors.grey[500];
    
    final arrowColor = isDark ? Colors.grey[400] : Colors.grey[600];

    return Container(
      decoration: BoxDecoration(
        color: containerColor,
        borderRadius: BorderRadius.circular(16.r),
      ),
      margin: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      child: Row(
        children: [
          // Product Image
          Container(
            width: 40.w,
            height: 40.h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.r),
              image: productImageUrl != null
                  ? DecorationImage(
                      image: NetworkImage(productImageUrl!),
                      fit: BoxFit.cover,
                    )
                  : null,
              color: productImageUrl == null ? placeholderColor : null,
            ),
            child: productImageUrl == null
                ? Icon(
                    Icons.image_outlined,
                    color: placeholderIconColor,
                    size: 24.sp,
                  )
                : null,
          ),
          
          SizedBox(width: 12.w),
          
          // Product Info (Expanded to take available space)
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  productName,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 2.h),
                Text(
                  productPrice,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 12.sp,
                  ),
                ),
              ],
            ),
          ),
          
          SizedBox(width: 8.w),
          
          // iOS Navigation Arrow Icon
          Icon(
            Icons.arrow_forward_ios_rounded,
            color: arrowColor,
            size: 16.sp,
          ),
        ],
      ),
    );
  }
}

