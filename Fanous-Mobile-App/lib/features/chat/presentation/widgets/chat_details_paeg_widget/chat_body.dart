import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/header_section/header_section.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/item_seller_section/ItemSellerSection.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/message_input_section/message_input_section.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/messages_state_builder_section/messages_state_builder_section.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/suggested_messages_section/suggested_messages_section.dart';
import 'package:flutter/material.dart';

class ChatBody extends StatelessWidget {
  final String chatId;
  final TextEditingController messageController;
  final ScrollController scrollController;
  final Function(String) onSuggestedMessageTap;
  final VoidCallback onSendMessage;
  final VoidCallback onAttachmentTap;

  const ChatBody({
    super.key,
    required this.chatId,
    required this.messageController,
    required this.scrollController,
    required this.onSuggestedMessageTap,
    required this.onSendMessage,
    required this.onAttachmentTap,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          HeaderSection(userName: 'Malik Faheem Awan', userStatus: 'Online'),
          ItemSellerSection(
            productName: 'Product Name',
            productPrice: '1000 EGP',
            productImageUrl:
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
          ),
          Expanded(
            child: MessagesStateBuilderSection(
              scrollController: scrollController,
              chatId: chatId,
            ),
          ),
          SuggestedMessagesSection(
            suggestedMessages: const [
              '?Is the price firm',
              '?Interested! Still for sale',
              '?More details please',
            ],
            onMessageTap: onSuggestedMessageTap,
          ),
          MessageInputSection(
            messageController: messageController,
            onSendMessage: onSendMessage,
            onAttachmentTap: onAttachmentTap,
          ),
        ],
      ),
    );
  }
}
