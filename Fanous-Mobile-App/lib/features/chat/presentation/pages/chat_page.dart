import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_page_widget/filter_section/filter_section.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_page_widget/message_section/message_section.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/di/dependency_injection.dart';
import '../bloc/chat_bloc/chat_bloc.dart';
import '../bloc/chat_bloc/chat_event.dart';
import '../bloc/chat_bloc/chat_state.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({super.key});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return BlocProvider(
      create: (context) => getIt<ChatBloc>()..add(const LoadChats()),
      child: Scaffold(
        backgroundColor: isDark
            ? AppColors.backgroundDark
            : AppColors.backgroundLight,
        appBar: AppBar(
          title: Align(
            alignment: Alignment.centerRight,
            child: Text(
              "Chats",
              style: TextStyle(
                color: isDark ? Colors.white : AppColors.primary,
                fontSize: 15.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          backgroundColor: isDark
              ? AppColors.backgroundDark
              : AppColors.backgroundLight,
          iconTheme: IconThemeData(
            color: isDark ? Colors.white : AppColors.primary,
          ),
          elevation: 0,
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(1.0),
            child: Container(
              height: 1.0,
              color: isDark
                  ? Colors.grey[800]
                  : AppColors.primary.withAlpha((0.15 * 255).toInt()),
            ),
          ),
        ),
        body: Container(
          color: isDark ? AppColors.surfaceDark : AppColors.backgroundLight,
          child: BlocBuilder<ChatBloc, ChatState>(
            builder: (context, state) {
              if (state is ChatLoading) {
                return const Center(child: CircularProgressIndicator());
              }

              if (state is ChatError) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Error: ${state.message}',
                        style: TextStyle(
                          color: isDark ? Colors.white : Colors.black,
                          fontSize: 15.sp,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {
                          context.read<ChatBloc>().add(const LoadChats());
                        },
                        child: Text(
                          'Retry',
                          style: TextStyle(
                            color: isDark ? Colors.white : Colors.black,
                            fontSize: 15.sp,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }

              if (state is ChatLoaded) {
                return Column(
                  children: [
                    SizedBox(height: 10.h),
                    const FilterSection(),
                    SizedBox(height: 12.h),
                    MessageSection(chats: state.chats),
                  ],
                );
              }

              return const SizedBox.shrink();
            },
          ),
        ),
      ),
    );
  }
}
