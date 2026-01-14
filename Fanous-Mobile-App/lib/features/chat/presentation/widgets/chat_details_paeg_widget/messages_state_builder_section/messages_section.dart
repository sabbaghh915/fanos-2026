import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/domain/entities/message_entity.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/messages_state_builder_section/message_bubble.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

class MessagesSection extends StatelessWidget {
  final ScrollController scrollController;
  final List<MessageEntity> messages;

  const MessagesSection({
    super.key,
    required this.scrollController,
    required this.messages,
  });
  // هون لاجل عرض الوقت بطريقة جميلة فقط ساعة ودقيقة
  String _formatTime(DateTime dateTime) {
    return DateFormat('HH:mm').format(dateTime);
  }

  // هنا لمعرفة التاريخ بطريقة جميلة فقط اليوم والأمس والأخرى
  String _formatDate(DateTime dateTime) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final messageDate = DateTime(dateTime.year, dateTime.month, dateTime.day);

    if (messageDate == today) {
      return 'Today';
    } else if (messageDate == today.subtract(const Duration(days: 1))) {
      return 'Yesterday';
    } else {
      return DateFormat('MMM d, yyyy').format(dateTime);
    }
  }

  // هنا لمعرفة ما إذا كان يجب عرض الفاصلة التاريخية أم لا
  bool _shouldShowDateSeparator(int index) {
    if (index == 0) return true;
    final currentMessage = messages[index];
    final previousMessage = messages[index - 1];
    final currentDate = DateTime(
      currentMessage.time.year,
      currentMessage.time.month,
      currentMessage.time.day,
    );
    final previousDate = DateTime(
      previousMessage.time.year,
      previousMessage.time.month,
      previousMessage.time.day,
    );
    return currentDate != previousDate;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (messages.isEmpty) {
      return Center(
        child: Text(
          'No messages yet',
          style: TextStyle(
            color: isDark
                ? AppColors.textSecondaryDark.withAlpha((0.6 * 255).toInt())
                : AppColors.textSecondaryLight.withAlpha((0.6 * 255).toInt()),
            fontSize: 14.sp,
          ),
        ),
      );
    }

    final dateSeparatorBgColor = isDark
        ? Colors.white.withAlpha((0.1 * 255).toInt())
        : Colors.black.withAlpha((0.05 * 255).toInt());

    final dateSeparatorTextColor = isDark
        ? AppColors.textSecondaryDark.withAlpha((0.7 * 255).toInt())
        : const Color.fromARGB(255, 41, 50, 64).withAlpha((0.7 * 255).toInt());

    return ListView.builder(
      controller: scrollController,
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
      itemCount: messages.length,
      itemBuilder: (context, index) {
        final message = messages[index];
        final showDateSeparator = _shouldShowDateSeparator(index);

        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (showDateSeparator) ...[
              Center(
                child: Container(
                  margin: EdgeInsets.symmetric(vertical: 16.h),
                  padding: EdgeInsets.symmetric(
                    horizontal: 12.w,
                    vertical: 6.h,
                  ),
                  decoration: BoxDecoration(
                    color: dateSeparatorBgColor,
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: Text(
                    _formatDate(message.time),
                    style: TextStyle(
                      color: dateSeparatorTextColor,
                      fontSize: 12.sp,
                    ),
                  ),
                ),
              ),
            ],
            MessageBubble(
              isSent: message.isSent,
              message: message.message,
              time: _formatTime(message.time),
            ),
          ],
        );
      },
    );
  }
}
