import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/features/setting/presentation/widgets/account_section/account_section.dart';
import 'package:fanous/features/setting/presentation/widgets/appearance_section/appearance_section.dart';
import 'package:fanous/features/setting/presentation/widgets/danger_zone_section/danger_zone_section.dart';
import 'package:fanous/features/setting/presentation/widgets/notification_section/notifications_section.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/settings_app_bar.dart';
import 'package:flutter/material.dart';

class SettingPage extends StatelessWidget {
  const SettingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final backgroundColor = isDark
        ? AppColors.backgroundDark
        : AppColors.backgroundLight;

    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            const SettingsAppBar(),
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(
                  horizontal: AppSpacing.screenPaddingSmall,
                  vertical: AppSpacing.md,
                ),
                child: const Column(
                  children: [
                    SizedBox(height: AppSpacing.sm),
                    NotificationsSection(),
                    AccountSection(),
                    AppearanceSection(),
                    DangerZoneSection(),
                    SizedBox(height: AppSpacing.xl),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
