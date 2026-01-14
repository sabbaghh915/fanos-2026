import 'package:flutter/material.dart';
import 'package:fanous/features/setting/presentation/widgets/account_section/change_password_dialog.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/settings_section.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/setting_tile.dart';

class AccountSection extends StatelessWidget {
  const AccountSection({super.key});

  void _handleChangePassword(BuildContext context) {
    ChangePasswordDialog.show(context);
  }

  @override
  Widget build(BuildContext context) {
    return SettingsSection(
      title: 'Account',
      child: SettingTile(
        title: 'Change Password',
        subtitle: 'Update your password for your account',
        icon: Icons.lock_outline,
        onTap: () => _handleChangePassword(context),
      ),
    );
  }
}
