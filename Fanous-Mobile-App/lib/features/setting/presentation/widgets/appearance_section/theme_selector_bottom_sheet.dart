import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/features/setting/presentation/widgets/appearance_section/theme_option.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ThemeSelectorBottomSheet {
  ThemeSelectorBottomSheet._();

  static Future<ThemeMode?> show(
    BuildContext context, {
    required ThemeMode currentThemeMode,
  }) async {
    final selectedTheme = await showModalBottomSheet<ThemeMode>(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            ThemeMode selectedMode = currentThemeMode;

            return Container(
              decoration: BoxDecoration(
                color: Theme.of(context).scaffoldBackgroundColor,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(AppSpacing.borderRadiusLarge),
                  topRight: Radius.circular(AppSpacing.borderRadiusLarge),
                ),
              ),
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    margin: EdgeInsets.only(top: AppSpacing.md),
                    width: 40.0.w,
                    height: 4.0.h,
                    decoration: BoxDecoration(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? AppColors.surfaceVariantDark
                          : AppColors.surfaceVariantLight,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  SizedBox(height: AppSpacing.lg),
                  Text(
                    'Select theme',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: AppSpacing.lg),
                  ThemeOption(
                    title: 'light',
                    icon: Icons.light_mode,
                    themeMode: ThemeMode.light,
                    isSelected: selectedMode == ThemeMode.light,
                    onTap: () {
                      setState(() {
                        selectedMode = ThemeMode.light;
                        Navigator.pop(context);
                      });
                    },
                  ),
                  ThemeOption(
                    title: 'dark',
                    icon: Icons.dark_mode,
                    themeMode: ThemeMode.dark,
                    isSelected: selectedMode == ThemeMode.dark,
                    onTap: () {
                      setState(() {
                        selectedMode = ThemeMode.dark;
                        Navigator.pop(context);
                      });
                    },
                  ),
                  ThemeOption(
                    title: 'system',
                    icon: Icons.brightness_auto,
                    themeMode: ThemeMode.system,
                    isSelected: selectedMode == ThemeMode.system,
                    onTap: () {
                      setState(() {
                        selectedMode = ThemeMode.system;
                        Navigator.pop(context);
                      });
                    },
                  ),
                  SizedBox(height: AppSpacing.lg),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: AppSpacing.md),
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop(selectedMode);
                        },
                        child: const Text('apply'),
                      ),
                    ),
                  ),
                  SizedBox(height: AppSpacing.lg),
                ],
              ),
            );
          },
        );
      },
    );

    return selectedTheme;
  }
}
