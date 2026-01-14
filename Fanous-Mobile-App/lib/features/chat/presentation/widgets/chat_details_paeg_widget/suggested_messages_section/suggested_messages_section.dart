import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SuggestedMessagesSection extends StatelessWidget {
  final List<String> suggestedMessages;
  final Function(String) onMessageTap;

  const SuggestedMessagesSection({
    super.key,
    required this.suggestedMessages,
    required this.onMessageTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 8.h),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: suggestedMessages
              .map(
                (message) => Padding(
                  padding: EdgeInsets.only(right: 8.w),
                  child: _SuggestedMessageButton(
                    message: message,
                    onTap: () => onMessageTap(message),
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}

class _SuggestedMessageButton extends StatelessWidget {
  final String message;
  final VoidCallback onTap;

  const _SuggestedMessageButton({required this.message, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : AppColors.surfaceVariantLight,
          borderRadius: BorderRadius.circular(20.r),
        ),
        child: Text(
          message,
          style: TextStyle(
            color: isDark
                ? AppColors.textPrimaryDark
                : AppColors.textPrimaryLight,
            fontSize: 12.sp,
          ),
        ),
      ),
    );
  }
}
