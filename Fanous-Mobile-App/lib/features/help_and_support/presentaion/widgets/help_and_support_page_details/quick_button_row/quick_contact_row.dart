import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page_details/quick_button_row/contact_button_widget.dart';
import 'package:flutter/material.dart';

class QuickContactRow extends StatelessWidget {
  final VoidCallback onOpenTelegram;
  final VoidCallback onOpenWhatsApp;
  final VoidCallback onOpenInstagram;
  final VoidCallback onOpenFacebook;

  const QuickContactRow({
    super.key,
    required this.onOpenTelegram,
    required this.onOpenWhatsApp,
    required this.onOpenInstagram,
    required this.onOpenFacebook,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? Theme.of(context).colorScheme.surface : Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.black.withValues(alpha: 0.3)
                : Colors.black.withValues(alpha: 0.06),
            blurRadius: 20,
            offset: const Offset(0, 6),
            spreadRadius: 0,
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: ContactButton(
                  onTap: onOpenTelegram,
                  imagePath: 'assets/images/telegram_logo.png',
                  title: 'Telegram',
                  subtitle: 'Quick response',
                  backgroundColor: const Color(0xFF229ED9),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ContactButton(
                  onTap: onOpenWhatsApp,
                  imagePath: 'assets/images/logo_whats_app.png',
                  title: 'WhatsApp',
                  subtitle: 'Direct contact',
                  backgroundColor: const Color(0xFF25D366),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: ContactButton(
                  onTap: onOpenInstagram,
                  icon: Icons.camera_alt_rounded,
                  title: 'Instagram',
                  subtitle: 'Follow us',
                  backgroundColor: const Color.fromARGB(255, 189, 11, 124),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ContactButton(
                  onTap: onOpenFacebook,
                  icon: Icons.facebook,
                  title: 'Facebook',
                  subtitle: 'Connect with us',
                  backgroundColor: const Color(0xFF1877F2),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
