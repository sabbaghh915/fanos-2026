import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';

class ThemeOption extends StatelessWidget {
  final String title;
  final IconData icon;
  final ThemeMode themeMode;
  final bool isSelected;
  final VoidCallback onTap;

  const ThemeOption({
    super.key,
    required this.title,
    required this.icon,
    required this.themeMode,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final backgroundColor = isSelected
        ? (isDark ? AppColors.primaryDark : AppColors.primary).withAlpha(10)
        : Colors.transparent;

    final textColor = isSelected
        ? (isDark ? AppColors.primaryDark : AppColors.primary)
        : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight);

    final iconColor = isSelected
        ? (isDark ? AppColors.primaryDark : AppColors.primary)
        : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight);

    return Material(
      color: backgroundColor,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.md,
          ),
          child: Row(
            children: [
              Icon(icon, color: iconColor, size: AppSpacing.iconSize),
              SizedBox(width: AppSpacing.md),
              Expanded(
                child: Text(
                  title,
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: textColor,
                    fontWeight: isSelected
                        ? FontWeight.w600
                        : FontWeight.normal,
                  ),
                ),
              ),
              if (isSelected)
                Icon(
                  Icons.check_circle,
                  color: isDark ? AppColors.primaryDark : AppColors.primary,
                  size: AppSpacing.iconSize,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
