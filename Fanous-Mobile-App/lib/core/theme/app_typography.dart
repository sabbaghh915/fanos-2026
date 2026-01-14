import 'package:flutter/material.dart';
import 'app_colors.dart';

// نظام الطباعة الموحد
class AppTypography {
  AppTypography._();

  static TextStyle _createStyle({
    required double fontSize,
    required FontWeight fontWeight,
    required Color color,
    double? letterSpacing,
    double? height,
  }) {
    return TextStyle(
      fontSize: fontSize,
      fontWeight: fontWeight,
      letterSpacing: letterSpacing,
      height: height,
      color: color,
      fontFamily: 'Cairo',
    );
  }

  static TextStyle displayLarge({required bool isDark}) => _createStyle(
    fontSize: 57,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.25,
    height: 1.12,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle displayMedium({required bool isDark}) => _createStyle(
    fontSize: 45,
    fontWeight: FontWeight.w700,
    letterSpacing: 0,
    height: 1.16,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle displaySmall({required bool isDark}) => _createStyle(
    fontSize: 36,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.22,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );

  static TextStyle headlineLarge({required bool isDark}) => _createStyle(
    fontSize: 32,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.25,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle headlineMedium({required bool isDark}) => _createStyle(
    fontSize: 28,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.29,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle headlineSmall({required bool isDark}) => _createStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.33,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );

  static TextStyle titleLarge({required bool isDark}) => _createStyle(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.27,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle titleMedium({required bool isDark}) => _createStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.15,
    height: 1.5,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle titleSmall({required bool isDark}) => _createStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
    color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
  );

  static TextStyle bodyLarge({required bool isDark}) => _createStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.5,
    height: 1.5,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle bodyMedium({required bool isDark}) => _createStyle(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.25,
    height: 1.43,
    color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
  );
  
  static TextStyle bodySmall({required bool isDark}) => _createStyle(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.4,
    height: 1.33,
    color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
  );

  static TextStyle labelLarge({required bool isDark}) => _createStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
  );
  
  static TextStyle labelMedium({required bool isDark}) => _createStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.33,
    color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
  );
  
  static TextStyle labelSmall({required bool isDark}) => _createStyle(
    fontSize: 11,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.45,
    color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
  );

  static TextTheme get lightTextTheme {
    return TextTheme(
      displayLarge: displayLarge(isDark: false),
      displayMedium: displayMedium(isDark: false),
      displaySmall: displaySmall(isDark: false),
      headlineLarge: headlineLarge(isDark: false),
      headlineMedium: headlineMedium(isDark: false),
      headlineSmall: headlineSmall(isDark: false),
      titleLarge: titleLarge(isDark: false),
      titleMedium: titleMedium(isDark: false),
      titleSmall: titleSmall(isDark: false),
      bodyLarge: bodyLarge(isDark: false),
      bodyMedium: bodyMedium(isDark: false),
      bodySmall: bodySmall(isDark: false),
      labelLarge: labelLarge(isDark: false),
      labelMedium: labelMedium(isDark: false),
      labelSmall: labelSmall(isDark: false),
    );
  }

  static TextTheme get darkTextTheme {
    return TextTheme(
      displayLarge: displayLarge(isDark: true),
      displayMedium: displayMedium(isDark: true),
      displaySmall: displaySmall(isDark: true),
      headlineLarge: headlineLarge(isDark: true),
      headlineMedium: headlineMedium(isDark: true),
      headlineSmall: headlineSmall(isDark: true),
      titleLarge: titleLarge(isDark: true),
      titleMedium: titleMedium(isDark: true),
      titleSmall: titleSmall(isDark: true),
      bodyLarge: bodyLarge(isDark: true),
      bodyMedium: bodyMedium(isDark: true),
      bodySmall: bodySmall(isDark: true),
      labelLarge: labelLarge(isDark: true),
      labelMedium: labelMedium(isDark: true),
      labelSmall: labelSmall(isDark: true),
    );
  }
}
