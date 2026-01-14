import 'package:flutter/material.dart';

// ألوان التطبيق الأساسية
class AppColors {
  AppColors._();

  // الألوان الأساسية
  static const Color primary = Color(0xFFA128C3);
  static const Color primaryDark = Color(0xFF7D1F98);
  static const Color primaryLight = Color(0xFFB84DD1);
  static const Color primaryContainer = Color(0xFFF3D5F9);
  
  static const Color secondary = Color(0xFFFF9E07);
  static const Color secondaryDark = Color(0xFFCC7E06);
  static const Color secondaryLight = Color(0xFFFFB533);
  static const Color secondaryContainer = Color(0xFFFFF4E0);
  
  static const Color tertiary = Color(0xFF57D6FF);
  static const Color tertiaryDark = Color(0xFF2BB8E6);
  static const Color tertiaryLight = Color(0xFF7EE0FF);
  static const Color tertiaryContainer = Color(0xFFE0F7FF);

  // ألوان الخلفيات
  static const Color backgroundDark = Color(0xFF000000);
  static const Color surfaceDark = Color(0xFF1E293B);
  static const Color surfaceVariantDark = Color(0xFF334155);
  static const Color cardDark = Color(0xFF181B22);

  static const Color backgroundLight = Color(0xFFF9F9F9);
  static const Color surfaceLight = Colors.white;
  static const Color surfaceVariantLight = Color(0xFFF5F5F5);
  static const Color cardLight = Colors.white;

  // ألوان النصوص
  static const Color textPrimaryDark = Color(0xFFF1F5F9);
  static const Color textSecondaryDark = Color(0xFFCBD5E1);
  static const Color textTertiaryDark = Color(0xFF94A3B8);
  static const Color textDisabledDark = Color(0xFF64748B);

  static const Color textPrimaryLight = Color(0xFF0F172A);
  static const Color textSecondaryLight = Color(0xFF475569);
  static const Color textTertiaryLight = Color(0xFF64748B);
  static const Color textDisabledLight = Color(0xFF94A3B8);

  // ألوان الحالة
  static const Color success = Color(0xFF10B981);
  static const Color successLight = Color(0xFF34D399);
  static const Color successDark = Color(0xFF059669);
  static const Color successContainer = Color(0xFFD1FAE5);

  static const Color warning = Color(0xFFF59E0B);
  static const Color warningLight = Color(0xFFFBBF24);
  static const Color warningDark = Color(0xFFD97706);
  static const Color warningContainer = Color(0xFFFEF3C7);

  static const Color error = Color(0xFFEF4444);
  static const Color errorLight = Color(0xFFF87171);
  static const Color errorDark = Color(0xFFDC2626);
  static const Color errorContainer = Color(0xFFFEE2E2);

  static const Color info = Color(0xFF3B82F6);
  static const Color infoLight = Color(0xFF60A5FA);
  static const Color infoDark = Color(0xFF2563EB);
  static const Color infoContainer = Color(0xFFDBEAFE);

  // التدرجات
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient primaryTertiaryGradient = LinearGradient(
    colors: [primary, tertiary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient secondaryTertiaryGradient = LinearGradient(
    colors: [secondary, tertiary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient backgroundGradientDark = LinearGradient(
    colors: [Color(0xFF0F172A), Color(0xFF1A0F23)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient glassGradient = LinearGradient(
    colors: [Color(0x40FFFFFF), Color(0x10FFFFFF)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient secondaryGradient = LinearGradient(
    colors: [secondaryLight, secondaryDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient tertiaryGradient = LinearGradient(
    colors: [tertiaryLight, tertiaryDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient successGradient = LinearGradient(
    colors: [successLight, successDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient warningGradient = LinearGradient(
    colors: [warningLight, warningDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient errorGradient = LinearGradient(
    colors: [errorLight, errorDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
