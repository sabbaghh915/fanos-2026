import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MessageBubble extends StatelessWidget {
  final bool isSent;
  final String message;
  final String time;

  const MessageBubble({
    super.key,
    required this.isSent,
    required this.message,
    required this.time,
  });
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final bubbleColor = isSent
        ? AppColors.secondary
        : (isDark ? AppColors.surfaceDark : AppColors.surfaceLight);

    final textColor = isSent
        ? Colors.white
        : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight);

    final timeColor = isSent
        ? Colors.white.withAlpha((0.7 * 255).toInt())
        : (isDark
              ? AppColors.textSecondaryDark.withAlpha((0.7 * 255).toInt())
              : AppColors.textSecondaryLight.withAlpha((0.7 * 255).toInt()));

    return Align(
      alignment: isSent ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        decoration: BoxDecoration(
          color: bubbleColor,
          borderRadius: BorderRadius.circular(12.r),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              message,
              style: TextStyle(color: textColor, fontSize: 14.sp),
            ),
            SizedBox(height: 4.h),
            Align(
              alignment: Alignment.bottomRight,
              child: Text(
                time,
                style: TextStyle(color: timeColor, fontSize: 10.sp),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
