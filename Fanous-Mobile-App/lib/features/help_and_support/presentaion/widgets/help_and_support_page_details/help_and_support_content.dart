import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page/app_bar_section/custom_appbar_profiler_section.dart';
import 'package:flutter/material.dart';
import 'description_text.dart';
import 'section_title.dart';
import 'quick_button_row/quick_contact_row.dart';

class HelpAndSupportContent extends StatelessWidget {
  final TextEditingController messageController;
  final VoidCallback onOpenTelegram;
  final VoidCallback onOpenWhatsApp;
  final VoidCallback onOpenInstagram;
  final VoidCallback onOpenFacebook;
  final VoidCallback onSendMessage;

  const HelpAndSupportContent({
    super.key,
    required this.messageController,
    required this.onOpenTelegram,
    required this.onOpenWhatsApp,
    required this.onOpenInstagram,
    required this.onOpenFacebook,
    required this.onSendMessage,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenHeight = MediaQuery.of(context).size.height;
        final availableHeight =
            screenHeight -
            MediaQuery.of(context).padding.top -
            MediaQuery.of(context).padding.bottom -
            32; // padding from parent

        return SingleChildScrollView(
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: availableHeight),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CustomAppBarHelpWidget(),
                const SizedBox(height: 28),
                const DescriptionText(),
                const SizedBox(height: 32),
                const SectionTitle('Quick contact methods'),
                const SizedBox(height: 16),
                QuickContactRow(
                  onOpenTelegram: onOpenTelegram,
                  onOpenWhatsApp: onOpenWhatsApp,
                  onOpenInstagram: onOpenInstagram,
                  onOpenFacebook: onOpenFacebook,
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        );
      },
    );
  }
}
