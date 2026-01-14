import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_spacing.dart';

// أنماط الأزرار الموحدة
class AppButtonStyles {
  AppButtonStyles._();
  
  static ButtonStyle primary({
    required bool isDark,
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
    );
  }
  
  static ButtonStyle secondary({
    required bool isDark,
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return OutlinedButton.styleFrom(
      foregroundColor: isDark ? AppColors.primaryLight : AppColors.primary,
      side: BorderSide(
        color: isDark ? AppColors.primaryLight : AppColors.primary,
        width: 1.5,
      ),
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
    );
  }
  
  static ButtonStyle text({
    required bool isDark,
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return TextButton.styleFrom(
      foregroundColor: isDark ? AppColors.primaryLight : AppColors.primary,
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusSmall),
      ),
    );
  }
  
  static ButtonStyle icon({
    required bool isDark,
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return IconButton.styleFrom(
      foregroundColor: isDark 
        ? AppColors.textSecondaryDark 
        : AppColors.textSecondaryLight,
      backgroundColor: Colors.transparent,
      padding: padding ?? const EdgeInsets.all(AppSpacing.sm),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusSmall),
      ),
    );
  }
  
  static ButtonStyle success({
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.success,
      foregroundColor: Colors.white,
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
    );
  }
  
  static ButtonStyle warning({
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.warning,
      foregroundColor: Colors.white,
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
    );
  }
  
  static ButtonStyle error({
    double? borderRadius,
    EdgeInsets? padding,
  }) {
    return ElevatedButton.styleFrom(
      backgroundColor: AppColors.error,
      foregroundColor: Colors.white,
      padding: padding ?? const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
    );
  }
  
  static ButtonStyle disabled({
    required bool isDark,
    double? borderRadius,
  }) {
    return ElevatedButton.styleFrom(
      backgroundColor: isDark 
        ? AppColors.surfaceVariantDark 
        : AppColors.surfaceVariantLight,
      foregroundColor: isDark 
        ? AppColors.textDisabledDark 
        : AppColors.textDisabledLight,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.buttonPadding,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius ?? AppSpacing.borderRadiusMedium),
      ),
      elevation: 0,
      shadowColor: Colors.transparent,
    );
  }
}
