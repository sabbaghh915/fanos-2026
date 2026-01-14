import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';

class MessageField extends StatelessWidget {
  final TextEditingController controller;

  const MessageField({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: TextField(
        controller: controller,
        minLines: 6,
        maxLines: 12,
        textDirection: TextDirection.rtl,
        textAlignVertical: TextAlignVertical.top,
        style: TextStyle(
          fontSize: 15,
          color: isDark
              ? AppColors.textPrimaryDark
              : AppColors.textPrimaryLight,
          height: 1.5,
        ),
        decoration: InputDecoration(
          hintText: 'Write your message here...',
          hintStyle: TextStyle(
            color: isDark
                ? AppColors.textTertiaryDark
                : AppColors.textTertiaryLight,
            fontSize: 15,
          ),
          alignLabelWithHint: true,
          filled: true,
          fillColor: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(
              color: isDark
                  ? AppColors.surfaceVariantDark
                  : AppColors.surfaceVariantLight,
              width: 1,
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(
              color: isDark
                  ? AppColors.surfaceVariantDark
                  : AppColors.surfaceVariantLight,
              width: 1,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: AppColors.primary, width: 2),
          ),
          contentPadding: const EdgeInsets.all(18),
        ),
      ),
    );
  }
}
