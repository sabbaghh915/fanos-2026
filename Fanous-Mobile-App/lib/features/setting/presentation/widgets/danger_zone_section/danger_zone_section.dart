import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:fanous/features/setting/presentation/widgets/danger_zone_section/delete_account_confirmation_dialog.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/setting_tile.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/settings_section.dart';

class DangerZoneSection extends StatelessWidget {
  const DangerZoneSection({super.key});

  void _handleDeleteAccount(BuildContext context) {
    DeleteAccountConfirmationDialog.show(context);
  }

  @override
  Widget build(BuildContext context) {
    return SettingsSection(
      title: 'Danger Zone',
      isDangerZone: true,
      child: SettingTile(
        title: 'Delete Account',
        subtitle:
            'Permanently delete your account. This action cannot be undone',
        icon: Icons.delete_outline,
        titleColor: AppColors.error,
        showDivider: false,
        onTap: () => _handleDeleteAccount(context),
      ),
    );
  }
}
