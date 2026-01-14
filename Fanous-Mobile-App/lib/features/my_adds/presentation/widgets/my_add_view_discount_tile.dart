import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
class MyAddViewDiscountTile extends StatelessWidget {
  final VoidCallback onTapDiscount;
  const MyAddViewDiscountTile({super.key, required this.onTapDiscount});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap:onTapDiscount,
      borderRadius: BorderRadius.circular(12.r),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.secondaryContainer,
        ),
        child: Padding(
          padding:  EdgeInsets.symmetric(horizontal:  2.w ,vertical: 2.h),
          child: Row(
            spacing: 10.w,
            children: [
              CircleAvatar(
                  radius: 13.r,
                  backgroundColor: AppColors.primary.withAlpha(80) ,
                  child: Icon(
                    Icons.discount,
                    size: 14.sp,
                    color: AppColors.primary,
                  )
              ),
              Text(
                'Buy Discounted Package',
                style:Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.primary),
              ),
              Spacer(),
              Icon(Icons.arrow_forward_ios, size: 14.w,color: AppColors.primary,),
            ],
          ),
        ),
      ),
    );
  }
}
