import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

class ClearNotificationsDialog extends StatelessWidget {
  const ClearNotificationsDialog({
    super.key,
    required this.onConfirm,
  });

  final VoidCallback onConfirm;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return AlertDialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.r),
      ),
      title: Row(
        spacing: 8.w,
        children: [
          Icon(
            Icons.notifications_off_outlined,
            color: AppColors.secondary,
            size: 26.sp,
          ),
          Text(
            'Clear Notifications',
            style: textTheme.titleMedium?.copyWith(
              color: AppColors.primaryDark,
            ),
          ),
        ],
      ),
      content: Text(
        'Are you sure you want to clear all notifications? This action cannot be undone.',
        style: textTheme.bodySmall?.copyWith(
          color: AppColors.textPrimaryLight,
        ),
      ),
      actionsPadding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(
            'Cancel',
            style: textTheme.labelLarge?.copyWith(
              color: Colors.grey,
            ),
          ),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
            onConfirm();
          },
          child: Text(
            'Clear',
            style: textTheme.labelLarge?.copyWith(color: Colors.white),
          ),
        ),
      ],
    );
  }
}
