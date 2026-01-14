import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_elevation.dart';
import 'app_spacing.dart';

// أنماط البطاقات الموحدة
class AppCardStyles {
  AppCardStyles._();
  
  static BoxDecoration standard({
    required bool isDark,
    double? borderRadius,
    List<BoxShadow>? shadows,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      color: isDark ? AppColors.cardDark : AppColors.cardLight,
      borderRadius: BorderRadius.circular(radius),
      boxShadow: shadows ?? AppElevation.level2,
    );
  }
  
  static BoxDecoration glass({
    required bool isDark,
    double? borderRadius,
    double opacity = 0.7,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      color: isDark 
        ? AppColors.surfaceDark.withValues(alpha: opacity)
        : Colors.white.withValues(alpha: opacity),
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(
        color: isDark
          ? Colors.white.withValues(alpha: 0.1)
          : Colors.black.withValues(alpha: 0.1),
        width: 1,
      ),
      boxShadow: AppElevation.level3,
    );
  }
  
  static BoxDecoration gradient({
    required LinearGradient gradient,
    double? borderRadius,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      gradient: gradient,
      borderRadius: BorderRadius.circular(radius),
      boxShadow: AppElevation.level4,
    );
  }
  
  static BoxDecoration outlined({
    required bool isDark,
    double? borderRadius,
    double borderWidth = 1.0,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(
        color: isDark
          ? AppColors.surfaceVariantDark
          : AppColors.surfaceVariantLight,
        width: borderWidth,
      ),
    );
  }
  
  static BoxDecoration elevated({
    required bool isDark,
    double? borderRadius,
    int elevationLevel = 3,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      color: isDark ? AppColors.cardDark : AppColors.cardLight,
      borderRadius: BorderRadius.circular(radius),
      boxShadow: AppElevation.getShadow(elevationLevel),
    );
  }
  
  static BoxDecoration colored({
    required Color color,
    double? borderRadius,
  }) {
    final radius = borderRadius ?? AppSpacing.borderRadiusLarge;
    return BoxDecoration(
      color: color,
      borderRadius: BorderRadius.circular(radius),
      boxShadow: AppElevation.level2,
    );
  }
  
  static BoxDecoration primaryGradient({
    double? borderRadius,
  }) {
    return gradient(
      gradient: AppColors.primaryGradient,
      borderRadius: borderRadius,
    );
  }
  
  static BoxDecoration success({
    required bool isDark,
    double? borderRadius,
  }) {
    return colored(
      color: isDark 
        ? AppColors.successContainer.withValues(alpha: 0.2)
        : AppColors.successContainer,
      borderRadius: borderRadius,
    );
  }
  
  static BoxDecoration warning({
    required bool isDark,
    double? borderRadius,
  }) {
    return colored(
      color: isDark 
        ? AppColors.warningContainer.withValues(alpha: 0.2)
        : AppColors.warningContainer,
      borderRadius: borderRadius,
    );
  }
  
  static BoxDecoration error({
    required bool isDark,
    double? borderRadius,
  }) {
    return colored(
      color: isDark 
        ? AppColors.errorContainer.withValues(alpha: 0.2)
        : AppColors.errorContainer,
      borderRadius: borderRadius,
    );
  }
}
