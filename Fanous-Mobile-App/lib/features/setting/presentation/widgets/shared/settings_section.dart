import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';

class SettingsSection extends StatelessWidget {
  final String title;
  final Widget child;
  final bool isDangerZone;

  const SettingsSection({
    super.key,
    required this.title,
    required this.child,
    this.isDangerZone = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final sectionTitleColor = isDangerZone
        ? AppColors.error
        : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight);

    final cardColor = isDangerZone
        ? (isDark
              ? AppColors.errorContainer.withAlpha((0.1 * 255).toInt())
              : AppColors.errorContainer.withAlpha((0.05 * 255).toInt()))
        : (isDark ? AppColors.cardDark : AppColors.cardLight);

    final borderColor = isDangerZone
        ? AppColors.error.withAlpha((0.3 * 255).toInt())
        : Colors.transparent;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(
            left: AppSpacing.sm,
            bottom: AppSpacing.sm,
            top: AppSpacing.md,
          ),
          child: Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              color: sectionTitleColor,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.5,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: cardColor,
            borderRadius: BorderRadius.circular(AppSpacing.borderRadiusLarge),
            border: isDangerZone
                ? Border.all(color: borderColor, width: 1)
                : null,
            boxShadow: [
              if (!isDark)
                BoxShadow(
                  color: Colors.black.withAlpha((0.05 * 255).toInt()),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                )
              else
                BoxShadow(
                  color: Colors.black.withAlpha((0.3 * 255).toInt()),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
            ],
          ),
          child: child,
        ),
      ],
    );
  }
}
