import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/domain/entities/chat_entity.dart';
import 'package:fanous/features/chat/presentation/pages/chat_details_page.dart';
import 'package:flutter/material.dart';
import 'message_item_widget.dart';

class MessageSection extends StatelessWidget {
  final List<ChatEntity> chats;

  const MessageSection({super.key, required this.chats});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Expanded(
      child: ListView.separated(
        itemCount: chats.length + 1,
        separatorBuilder: (context, index) {
          // add a simple grey divider between items, but NOT after last item
          if (index < chats.length - 1) {
            return Divider(
              color: isDark 
                  ? Colors.grey[800] 
                  : AppColors.primary.withAlpha((0.10 * 255).toInt()),
              thickness: 0.5,
              height: 0,
            );
          }
          return const SizedBox.shrink();
        },
        itemBuilder: (context, index) {
          if (index < chats.length) {
            final chat = chats[index];
            return MessageItemWidget(
              isRead: chat.isRead,
              userName: chat.userName,
              itemName: chat.itemName,
              lastMessage: chat.lastMessage,
              isPhoneViewed: chat.isPhoneViewed,
              time: chat.time,
              avatarUrl: chat.avatarUrl,
              thumbnailUrl: chat.thumbnailUrl,
              unreadCount: chat.unreadCount,
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ChatDetailsPage(chatId: chat.id),
                  ),
                );
              },
            );
          } else {
            // مسافة مشان اخفي اللي بعدها تحت ال bottomsheet
            return const SizedBox(height: 80.0);
          }
        },
      ),
    );
  }
}
