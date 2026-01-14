import 'package:flutter/material.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/settings_section.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/setting_tile.dart';

class NotificationsSection extends StatefulWidget {
  const NotificationsSection({super.key});

  @override
  State<NotificationsSection> createState() => _NotificationsSectionState();
}

class _NotificationsSectionState extends State<NotificationsSection> {
  bool _notificationsEnabled = true;

  void _handleToggle(bool value) {
    setState(() {
      _notificationsEnabled = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SettingsSection(
      title: 'Notifications',
      child: SettingTile(
        title: 'Enable Notifications',
        subtitle: 'Receive notifications about updates and offers',
        icon: Icons.notifications_outlined,
        switchValue: _notificationsEnabled,
        onSwitchChanged: _handleToggle,
      ),
    );
  }
}
