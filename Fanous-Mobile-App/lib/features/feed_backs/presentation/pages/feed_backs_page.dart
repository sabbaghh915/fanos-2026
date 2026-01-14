import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/feed_backs/presentation/widgets/message_field.dart';
import 'package:fanous/features/feed_backs/presentation/widgets/section_title.dart';
import 'package:fanous/features/feed_backs/presentation/widgets/send_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class FeedBacksPage extends StatefulWidget {
  const FeedBacksPage({super.key});

  @override
  State<FeedBacksPage> createState() => _FeedBacksPageState();
}

class _FeedBacksPageState extends State<FeedBacksPage> {
  final TextEditingController _messageController = TextEditingController();

  void _sendMessage() {
    final message = _messageController.text.trim();
    if (message.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please write your message first.')),
      );
      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('OK, your message has been sent.')),
    );
    _messageController.clear();
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
      appBar: AppBar(
        backgroundColor: isDark
            ? AppColors.backgroundDark
            : AppColors.backgroundLight,
        elevation: 0,
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: const Icon(Icons.arrow_back_ios_new),
          color: isDark ? AppColors.primaryDark : AppColors.primaryLight,
          iconSize: 16.0.sp,
        ),
        title: Text('Feedbacks', style: theme.textTheme.titleMedium),
        centerTitle: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 20.0.w, vertical: 16.0.h),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SectionTitle('Send a direct message'),
                SizedBox(height: 16.0.h),
                MessageField(controller: _messageController),
                SizedBox(height: 20.0.h),
                SendButton(onPressed: _sendMessage),
                SizedBox(height: 20.0.h),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
