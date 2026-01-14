import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/widgets/app_snack_bar.dart';
import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page/app_bar_section/custom_appbar_profiler_section.dart';
import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page_details/description_text.dart';
import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page_details/section_title.dart';
import 'package:fanous/features/help_and_support/presentaion/widgets/help_and_support_page_details/quick_button_row/quick_contact_row.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

class HelpAndSupportPage extends StatefulWidget {
  const HelpAndSupportPage({super.key});

  @override
  State<HelpAndSupportPage> createState() => _HelpAndSupportPageState();
}

class _HelpAndSupportPageState extends State<HelpAndSupportPage> {
  static const String _supportPhoneNumber = '+963941538381';
  static const String _faceBookAppUrl =
      'https://www.facebook.com/profile.php?id=100063543767186';
  static const String _instagarmAppUrl =
      'https://www.instagram.com/zlatan_ibrahim9/';
  final TextEditingController _messageController = TextEditingController();

  Uri get _telegramUri => Uri.parse('tg://resolve?phone=$_supportPhoneNumber');

  Uri get _whatsAppUri => Uri.parse('https://wa.me/$_supportPhoneNumber');

  Uri get _faceBookAppUri => Uri.parse(_faceBookAppUrl);

  Uri get _instagarmAppUri => Uri.parse(_instagarmAppUrl);

  Future<void> _openTelegram() async {
    try {
      await url_launcher.launchUrl(
        _telegramUri,
        mode: url_launcher.LaunchMode.externalApplication,
      );
    } catch (e) {
      if (!mounted) return;
      AppSnackBar.showPrimarySnackBar(
        context,
        'Unable to open Telegram on this device, please make sure the application is installed and the support number is correct.',
      );
    }
  }

  Future<void> _openInstagram() async {
    try {
      await url_launcher.launchUrl(
        _instagarmAppUri,
        mode: url_launcher.LaunchMode.externalApplication,
      );
    } catch (e) {
      if (!mounted) return;
      AppSnackBar.showPrimarySnackBar(
        context,
        'Unable to open Instagram on this device, please make sure the application is installed and the support link is correct.',
      );
    }
  }

  Future<void> _openFacebook() async {
    try {
      await url_launcher.launchUrl(
        _faceBookAppUri,
        mode: url_launcher.LaunchMode.externalApplication,
      );
    } catch (e) {
      if (!mounted) return;
      AppSnackBar.showPrimarySnackBar(
        context,
        'Unable to open Facebook on this device, please make sure the application is installed and the support link is correct.',
      );
    }
  }

  Future<void> _openWhatsApp() async {
    try {
      await url_launcher.launchUrl(
        _whatsAppUri,
        mode: url_launcher.LaunchMode.externalApplication,
      );
    } catch (e) {
      if (!mounted) return;
      AppSnackBar.showPrimarySnackBar(
        context,
        'Unable to open WhatsApp on this device, please make sure the application is installed and the support number is correct.',
      );
    }
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return Scaffold(
      backgroundColor: isDark
          ? AppColors.backgroundDark
          : AppColors.backgroundLight,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 16.0.h),
                CustomAppBarHelpWidget(),
                SizedBox(height: 32.0.h),
                const DescriptionText(),
                SizedBox(height: 32.0.h),
                const SectionTitle('Quick contact methods'),
                SizedBox(height: 16.0.h),
                QuickContactRow(
                  onOpenTelegram: _openTelegram,
                  onOpenWhatsApp: _openWhatsApp,
                  onOpenInstagram: _openInstagram,
                  onOpenFacebook: _openFacebook,
                ),
                SizedBox(height: 32.0.h),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
