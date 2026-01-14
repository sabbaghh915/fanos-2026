import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FilterItemWidget extends StatelessWidget {
  const FilterItemWidget({
    super.key,
    required this.title,
    required this.isSelected,
    required this.onTap,
  });

  final String title;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 13.w, vertical: 8.h),
        decoration: BoxDecoration(
          color: isSelected
              ? isDark
                    ? AppColors.secondaryDark.withAlpha((0.94 * 255).toInt())
                    : AppColors.primary.withAlpha((0.95 * 255).toInt())
              : isDark
              ? AppColors.secondaryDark.withAlpha((0.70 * 255).toInt())
              : AppColors.primaryContainer,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(
            color: isSelected
                ? isDark
                      ? AppColors.secondaryDark
                      : AppColors.primary
                : isDark
                    ? Colors.white.withAlpha((0.65 * 255).toInt())
                    : AppColors.primary.withAlpha((0.40 * 255).toInt()),
            width: isSelected ? 2.8 : 1.5,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: isDark
                        ? AppColors.secondaryDark.withAlpha(
                            (0.23 * 255).toInt(),
                          )
                        : AppColors.primary.withAlpha(
                            (0.30 * 255).toInt(),
                          ),
                    spreadRadius: 1,
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [
                  BoxShadow(
                    color: Colors.black.withAlpha((0.07 * 255).toInt()),
                    spreadRadius: 1,
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
        ),
        child: Center(
          child: Text(
            title,
            style: TextStyle(
              color: isSelected
                  ? Colors.white
                  : isDark
                      ? Colors.white.withAlpha((0.85 * 255).toInt())
                      : AppColors.primary,
              fontSize: 11.sp,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
              letterSpacing: 0.1,
              shadows: isSelected
                  ? [
                      Shadow(
                        color: isDark
                            ? AppColors.secondaryDark.withAlpha(
                                (0.18 * 255).toInt(),
                              )
                            : AppColors.primary.withAlpha(
                                (0.25 * 255).toInt(),
                              ),
                        blurRadius: 8,
                        offset: const Offset(0, 1),
                      ),
                    ]
                  : [],
            ),
          ),
        ),
      ),
    );
  }
}
