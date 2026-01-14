import 'package:flutter/material.dart';

// نظام المسافات الموحد (مضاعفات 4px)
class AppSpacing {
  AppSpacing._();
  
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
  static const double xxxl = 64.0;
  
  static const double screenPadding = 24.0;
  static const double screenPaddingSmall = 16.0;
  static const double screenPaddingLarge = 32.0;
  
  static const double cardPadding = 20.0;
  static const double cardPaddingSmall = 16.0;
  static const double cardPaddingLarge = 24.0;
  
  static const double buttonPadding = 14.0;
  static const double inputPadding = 16.0;
  
  static const double iconSize = 24.0;
  static const double iconSizeSmall = 20.0;
  static const double iconSizeLarge = 32.0;
  static const double iconSizeXLarge = 48.0;
  
  static const double borderRadiusSmall = 8.0;
  static const double borderRadiusMedium = 12.0;
  static const double borderRadiusLarge = 16.0;
  static const double borderRadiusXLarge = 24.0;
  
  static EdgeInsets get screenPaddingAll => const EdgeInsets.all(screenPadding);
  static EdgeInsets get screenPaddingHorizontal => const EdgeInsets.symmetric(horizontal: screenPadding);
  static EdgeInsets get screenPaddingVertical => const EdgeInsets.symmetric(vertical: screenPadding);
  
  static EdgeInsets get cardPaddingAll => const EdgeInsets.all(cardPadding);
  static EdgeInsets get cardPaddingSmallAll => const EdgeInsets.all(cardPaddingSmall);
  static EdgeInsets get cardPaddingLargeAll => const EdgeInsets.all(cardPaddingLarge);
  
  static SizedBox spacing({double? width, double? height}) {
    return SizedBox(width: width, height: height);
  }
  
  static SizedBox get spacingXS => const SizedBox(width: xs, height: xs);
  static SizedBox get spacingSM => const SizedBox(width: sm, height: sm);
  static SizedBox get spacingMD => const SizedBox(width: md, height: md);
  static SizedBox get spacingLG => const SizedBox(width: lg, height: lg);
  static SizedBox get spacingXL => const SizedBox(width: xl, height: xl);
}
