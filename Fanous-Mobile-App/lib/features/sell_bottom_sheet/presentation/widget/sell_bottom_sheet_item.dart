import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../core/theme/app_colors.dart';

class SellBottomSheetItem extends StatelessWidget {
  final String title;

  /// image (asset / network)
  final ImageProvider? image;

  final VoidCallback onTap;

  const SellBottomSheetItem({
    super.key,
    required this.title,
    required this.onTap,
    this.image,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
        child: Row(
          spacing: 12.w,
          children: [
            // ===== Image / Fallback Icon =====
            Container(
              width: 44.w,
              height: 44.w,
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [BoxShadow(
                  color: AppColors.primaryContainer,
                  spreadRadius: 1,
                  blurRadius: 4,
                  offset: Offset(0, 4)
                )]
              ),
              alignment: Alignment.center,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: image != null
                    ? Image(
                  image: image!,
                  width: 44.w,
                  height: 44.w,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) {
                    return _fallbackIcon();
                  },
                )
                    : _fallbackIcon(),
              ),
            ),
            // ===== Title =====
            Expanded(
              child: Text(
                title,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),

            // ===== Arrow =====
            Icon(
              Icons.chevron_right,
              color: AppColors.primaryDark,
              size: AppSpacing.iconSizeLarge,
            ),
          ],
        ),
      ),
    );
  }

  Widget _fallbackIcon() {
    return Icon(
      Icons.image_not_supported_outlined,
      color: AppColors.primaryDark,
      size: AppSpacing.iconSize,
    );
  }
}
