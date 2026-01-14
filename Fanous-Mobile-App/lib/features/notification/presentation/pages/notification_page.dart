import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/theme/app_colors.dart';
import '../bloc/notification_bloc.dart';
import '../bloc/notification_event.dart';
import '../bloc/notification_state.dart';
import '../widgets/clear_notifications_dialog.dart';
import '../widgets/notification_list_view.dart';
class NotificationPage extends StatelessWidget {
  const NotificationPage({super.key});

  @override
  Widget build(BuildContext context) {

    final textTheme = Theme.of(context).textTheme;

    return BlocBuilder<NotificationBloc, NotificationState>(
      builder: (context, state) {

        if (state is NotificationLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (state is NotificationError) {
          return const Center(child: Text("Error loading notifications"));
        }

        if (state is NotificationLoaded) {
          final notifications = state.notifications;
          final unreadNotifications =
          notifications.where((n) => !n.isRead).toList();

          return DefaultTabController(
            length: 2,
            child: Scaffold(
              backgroundColor: AppColors.backgroundLight,
              appBar: AppBar(
                centerTitle: true,
                backgroundColor: AppColors.backgroundLight,
                elevation: 0,
                surfaceTintColor: Colors.transparent,
                title: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('Notifi',
                        style: textTheme.headlineMedium
                            ?.copyWith(color: AppColors.primary)),
                    Text('cation',
                        style: textTheme.headlineMedium
                            ?.copyWith(color: AppColors.secondary)),
                  ],
                ),
                bottom: TabBar(
                  indicatorColor: AppColors.primary,
                  indicatorWeight: 3,
                  labelColor: AppColors.primary,
                  unselectedLabelColor: Colors.grey,
                  labelStyle: textTheme.titleSmall
                      ?.copyWith(fontWeight: FontWeight.bold),
                  tabs: const [
                    Tab(text: 'Unread'),
                    Tab(text: 'All'),
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (_) => ClearNotificationsDialog(
                          onConfirm: () {
                            context
                                .read<NotificationBloc>()
                                .add(ClearNotificationsEvent());
                          },
                        ),
                      );
                    },
                    child: Text(
                      'Clear all',
                      style: textTheme.labelLarge
                          ?.copyWith(color: AppColors.secondary),
                    ),
                  ),
                ],
              ),
              body: TabBarView(
                children: [
                  NotificationListView(notifications: unreadNotifications),
                  NotificationListView(notifications: notifications),
                ],
              ),
            ),
          );
        }

        return const SizedBox();
      },
    );
  }
}


