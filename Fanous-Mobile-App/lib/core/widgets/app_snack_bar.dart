import 'package:flutter/material.dart';

class AppSnackBar {
  static DateTime? _lastSnackBarTime;

  // اجعل مدة التبريد تساوي مدة ظهور السنك بار
  static const Duration _snackBarDuration = Duration(seconds: 2);
  static const Duration _snackBarCooldown = _snackBarDuration;

  static bool _canShowSnackBar() {
    final now = DateTime.now();
    if (_lastSnackBarTime == null ||
        now.difference(_lastSnackBarTime!) > _snackBarCooldown) {
      _lastSnackBarTime = now;
      return true;
    }
    return false;
  }

  static void showPrimarySnackBar(BuildContext context, String message) {
    if (!_canShowSnackBar()) return;

    final theme = Theme.of(context);
    final backgroundColor = theme.colorScheme.primary;
    final textColor = theme.colorScheme.onPrimary;

    final snackBar = SnackBar(
      content: Row(
        children: [
          Icon(Icons.info, color: textColor, size: 22),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                color: textColor,
                fontSize: 14,
                fontFamily: 'Cairo',
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
      backgroundColor: backgroundColor,
      duration: _snackBarDuration,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      behavior: SnackBarBehavior.floating,
      elevation: 4,
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  static void showSecondarySnackBar(BuildContext context, String message) {
    if (!_canShowSnackBar()) return;

    final theme = Theme.of(context);
    final backgroundColor = theme.colorScheme.secondary;
    final textColor = theme.colorScheme.onSecondary;

    final snackBar = SnackBar(
      content: Row(
        children: [
          Icon(Icons.info_outline, color: textColor, size: 22),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                color: textColor,
                fontSize: 14,
                fontFamily: 'Cairo',
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
      backgroundColor: backgroundColor,
      duration: _snackBarDuration,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      behavior: SnackBarBehavior.floating,
      elevation: 4,
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
