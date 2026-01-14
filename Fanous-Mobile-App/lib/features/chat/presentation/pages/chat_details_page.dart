import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/message_input_section/attachment_bottom_sheet.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/chat_body.dart';
import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/di/dependency_injection.dart';
import '../bloc/messages_bloc/messages_bloc.dart';
import '../bloc/messages_bloc/messages_event.dart';
import '../bloc/messages_bloc/messages_state.dart';

class ChatDetailsPage extends StatefulWidget {
  final String chatId;

  const ChatDetailsPage({super.key, required this.chatId});

  @override
  State<ChatDetailsPage> createState() => _ChatDetailsPageState();
}

class _ChatDetailsPageState extends State<ChatDetailsPage> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _handleSendMessage(BuildContext context) {
    final message = _messageController.text.trim();
    if (message.isEmpty) return;

    context.read<MessagesBloc>().add(
      SendMessage(chatId: widget.chatId, message: message),
    );

    _messageController.clear();
  }

  void _handleSuggestedMessageTap(BuildContext context, String message) {
    context.read<MessagesBloc>().add(
      SendMessage(chatId: widget.chatId, message: message),
    );
  }

  void _sendAttachment(
    BuildContext context, {
    required String filePath,
    required String fileName,
    required String attachmentType,
  }) {
    context.read<MessagesBloc>().add(
      SendAttachment(
        chatId: widget.chatId,
        filePath: filePath,
        fileName: fileName,
        attachmentType: attachmentType,
      ),
    );

    // Show success message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          attachmentType == 'image'
              ? 'Image sent successfully'
              : 'File sent successfully',
        ),
        backgroundColor: AppColors.success,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleAttachmentTap(BuildContext context) {
    AttachmentBottomSheet.show(
      context,
      onAttachmentSelected: (filePath, fileName, attachmentType) {
        _sendAttachment(
          context,
          filePath: filePath,
          fileName: fileName,
          attachmentType: attachmentType,
        );
      },
    );
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
              Theme.of(context).brightness == Brightness.dark
                  ? 'assets/images/chat_screen_dark.png'
                  : 'assets/images/chat_screen_light.png',
            ),
            repeat: ImageRepeat.repeat,
          ),
        ),
        child: BlocProvider(
          create: (context) =>
              getIt<MessagesBloc>()..add(LoadMessages(widget.chatId)),
          child: BlocListener<MessagesBloc, MessagesState>(
            listener: (context, state) {
              if (state is MessagesLoaded) {
                _scrollToBottom();
              }
              if (state is MessagesError) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Error: ${state.message}'),
                    backgroundColor: AppColors.error,
                    duration: const Duration(seconds: 2),
                  ),
                );
              }
            },
            child: Builder(
              builder: (builderContext) {
                return ChatBody(
                  chatId: widget.chatId,
                  messageController: _messageController,
                  scrollController: _scrollController,
                  onSuggestedMessageTap: (message) =>
                      _handleSuggestedMessageTap(builderContext, message),
                  onSendMessage: () => _handleSendMessage(builderContext),
                  onAttachmentTap: () => _handleAttachmentTap(builderContext),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
