import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/messages_state_builder_section/messages_section.dart';
import 'package:fanous/features/chat/presentation/bloc/messages_bloc/messages_bloc.dart';
import 'package:fanous/features/chat/presentation/bloc/messages_bloc/messages_event.dart';
import 'package:fanous/features/chat/presentation/bloc/messages_bloc/messages_state.dart';
import 'package:fanous/features/chat/domain/entities/message_entity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MessagesStateBuilderSection extends StatelessWidget {
  final ScrollController scrollController;
  final String chatId;

  const MessagesStateBuilderSection({
    super.key,
    required this.scrollController,
    required this.chatId,
  });

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MessagesBloc, MessagesState>(
      builder: (context, state) {
        if (state is MessagesLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (state is MessagesError) {
          final isDark = Theme.of(context).brightness == Brightness.dark;
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Error: ${state.message}',
                  style: TextStyle(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    context.read<MessagesBloc>().add(LoadMessages(chatId));
                  },
                  child: const Text('Retry'),
                ),
              ],
            ),
          );
        }

        if (state is MessagesLoaded || state is MessageSending) {
          final List<MessageEntity> messages = state is MessagesLoaded
              ? state.messages
              : (state as MessageSending).messages;

          return MessagesSection(
            scrollController: scrollController,
            messages: messages,
          );
        }

        return const SizedBox.shrink();
      },
    );
  }
}
