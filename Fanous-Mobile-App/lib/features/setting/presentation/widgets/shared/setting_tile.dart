import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SettingTile extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData? icon;
  final VoidCallback? onTap;
  final bool? switchValue;
  final ValueChanged<bool>? onSwitchChanged;
  final Color? titleColor;
  final Widget? trailing;
  final bool showDivider;

  const SettingTile({
    super.key,
    required this.title,
    this.subtitle,
    this.icon,
    this.onTap,
    this.switchValue,
    this.onSwitchChanged,
    this.titleColor,
    this.trailing,
    this.showDivider = true,
  }) : assert(
          (switchValue != null && onSwitchChanged != null) ||
              (switchValue == null && onSwitchChanged == null),
          'switchValue and onSwitchChanged must be both provided or both null',
        );

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final defaultTitleColor =
        isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight;

    final defaultSubtitleColor =
        isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight;

    final iconColor = titleColor ?? defaultTitleColor;
    final isError = titleColor == AppColors.error;
    final iconBackgroundColor = isError
        ? (isDark
            ? AppColors.error.withOpacity(0.2)
            : AppColors.error.withOpacity(0.1))
        : (isDark
            ? (titleColor ?? AppColors.primaryDark).withOpacity(0.2)
            : (titleColor ?? AppColors.primaryLight).withOpacity(0.1));

    return Column(
      children: [
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(AppSpacing.borderRadiusLarge),
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: AppSpacing.md,
                vertical: AppSpacing.md + 2,
              ),
              child: Row(
                children: [
                  if (icon != null) ...[
                    Container(
                      width: 48.0.w,
                      height: 48.0.w,
                      decoration: BoxDecoration(
                        color: iconBackgroundColor,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        icon,
                        color: iconColor,
                        size: 24.0.sp,
                      ),
                    ),
                    SizedBox(width: AppSpacing.md),
                  ],
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          title,
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: titleColor ?? defaultTitleColor,
                            fontWeight: FontWeight.w600,
                            fontSize: 16.0.sp,
                          ),
                        ),
                        if (subtitle != null && subtitle!.isNotEmpty) ...[
                          SizedBox(height: 4.0.h),
                          Text(
                            subtitle!,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: defaultSubtitleColor,
                              fontSize: 13.0.sp,
                              height: 1.4,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  if (switchValue != null) ...[
                    SizedBox(width: AppSpacing.sm),
                    Switch(
                      value: switchValue!,
                      onChanged: onSwitchChanged,
                      activeColor: AppColors.primary,
                    ),
                  ] else if (trailing != null)
                    trailing!
                  else if (onTap != null) ...[
                    SizedBox(width: AppSpacing.sm),
                    Icon(
                      Icons.arrow_forward_ios,
                      color: defaultSubtitleColor.withOpacity(0.6),
                      size: 16.0.sp,
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
        if (showDivider)
          Divider(
            height: 1,
            thickness: 0.5,
            color: isDark
                ? AppColors.surfaceVariantDark.withOpacity(0.3)
                : AppColors.surfaceVariantLight,
            indent: icon != null ? 72.0.w : AppSpacing.md,
            endIndent: AppSpacing.md,
          ),
      ],
    );
  }
}


