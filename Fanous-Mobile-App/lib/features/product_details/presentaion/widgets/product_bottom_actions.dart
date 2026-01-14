import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import '../../../../core/theme/app_colors.dart';

class ProductBottomActions extends StatelessWidget {
  final VoidCallback onTapChat;
  final VoidCallback onTapBuyNow;
  const ProductBottomActions({super.key, required this.onTapChat, required this.onTapBuyNow});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(8.w, 8.h, 8.w, 18.h),
      decoration: BoxDecoration(
        color: AppColors.secondary.withAlpha(20),
      ),
      child: Row(
        children: [
          Expanded(
            child: _button(context, Icons.chat, 'Chat', AppColors.primaryGradient , onTapChat),
          ),
          SizedBox(width: 12.w),
          Expanded(
            child:
            _button(context, Icons.call, 'Buy Now', AppColors.secondaryGradient , onTapBuyNow) ,
          ),
        ],
      ),
    );
  }

  Widget _button(BuildContext context, IconData icon, String label, Gradient g ,VoidCallback onTap ) {
    return InkWell(
      onTap:onTap ,
      borderRadius: BorderRadius.circular(10.r),
      child: Container(
        height: 44.h,
        decoration: BoxDecoration(
          gradient: g,
          borderRadius: BorderRadius.circular(10.r),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: AppSpacing.iconSizeSmall, color: Colors.white),
            SizedBox(width: 6.w),
            Text(label,
                style: Theme.of(context)
                    .textTheme
                    .labelLarge
                    ?.copyWith(color: Colors.white)),
          ],
        ),
      ),
    );
  }
}
