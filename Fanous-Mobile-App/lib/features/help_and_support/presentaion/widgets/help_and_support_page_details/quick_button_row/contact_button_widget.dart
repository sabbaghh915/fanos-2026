import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';

class ContactButton extends StatelessWidget {
  final VoidCallback onTap;
  final IconData? icon;
  final String? imagePath;
  final String title;
  final String subtitle;
  final Color backgroundColor;

  const ContactButton({
    super.key,
    required this.onTap,
    this.icon,
    this.imagePath,
    required this.title,
    required this.subtitle,
    required this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              colors: [
                title == 'WhatsApp'
                    ? backgroundColor.withValues(alpha: 0.22)
                    : backgroundColor.withValues(alpha: 0.15),
                title == 'WhatsApp'
                    ? backgroundColor.withValues(alpha: 0.12)
                    : backgroundColor.withValues(alpha: 0.08),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            border: Border.all(
              color: backgroundColor.withValues(alpha: 0.365),
              width: 1.5,
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                height: 56,
                width: 56,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: title == 'WhatsApp'
                      ? backgroundColor.withValues(alpha: 0.2)
                      : backgroundColor,
                  boxShadow: [
                    BoxShadow(
                      color: backgroundColor.withValues(alpha: 0.5),
                      blurRadius: 12,
                      offset: const Offset(0, 6),
                      spreadRadius: 0,
                    ),
                  ],
                ),
                child: imagePath != null
                    ? Padding(
                        padding: const EdgeInsets.all(12),
                        child: Image.asset(
                          imagePath!,
                          fit: BoxFit.contain,
                          errorBuilder: (context, error, stackTrace) {
                            return Icon(
                              icon ?? Icons.chat_rounded,
                              size: 28,
                              color: Colors.white,
                            );
                          },
                        ),
                      )
                    : Icon(
                        icon ?? Icons.chat_rounded,
                        size: 28,
                        color: Colors.white,
                      ),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: theme.textTheme.bodySmall?.copyWith(
                  fontSize: 13,
                  color: theme.textTheme.bodySmall?.color?.withValues(
                    alpha: 0.75,
                  ),
                  fontWeight: FontWeight.w500,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
