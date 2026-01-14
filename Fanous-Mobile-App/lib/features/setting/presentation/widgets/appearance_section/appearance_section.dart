import 'package:flutter/material.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/setting_tile.dart';
import 'package:fanous/features/setting/presentation/widgets/shared/settings_section.dart';
import 'package:fanous/features/setting/presentation/widgets/appearance_section/theme_selector_bottom_sheet.dart';

class AppearanceSection extends StatefulWidget {
  const AppearanceSection({super.key});

  @override
  State<AppearanceSection> createState() => _AppearanceSectionState();
}

class _AppearanceSectionState extends State<AppearanceSection> {
  ThemeMode _currentThemeMode = ThemeMode.system;

  String _getThemeModeText(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return 'Light';
      case ThemeMode.dark:
        return 'Dark';
      case ThemeMode.system:
        return 'System';
    }
  }

  IconData _getThemeIcon(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return Icons.light_mode;
      case ThemeMode.dark:
        return Icons.dark_mode;
      case ThemeMode.system:
        return Icons.brightness_auto;
    }
  }

  Future<void> _handleThemeChange() async {
    final selectedTheme = await ThemeSelectorBottomSheet.show(
      context,
      currentThemeMode: _currentThemeMode,
    );

    if (selectedTheme != null && mounted) {
      setState(() {
        _currentThemeMode = selectedTheme;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return SettingsSection(
      title: 'Appearance',
      child: SettingTile(
        title: 'Theme',
        subtitle: _getThemeModeText(_currentThemeMode),
        icon: _getThemeIcon(_currentThemeMode),
        onTap: _handleThemeChange,
      ),
    );
  }
}
