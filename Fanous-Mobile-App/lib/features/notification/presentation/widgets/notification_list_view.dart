import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../domain/entity/notification_entity.dart';
import 'notification_item_card.dart';

class NotificationListView extends StatelessWidget {
  const NotificationListView({
    super.key,
    required this.notifications,
  });
  final List<NotificationEntity> notifications;
  @override
  Widget build(BuildContext context) {
    if (notifications.isEmpty) {
      return const _EmptyNotificationsState();
    }
    return ListView.separated(
      padding: EdgeInsets.all(16.w),
      itemCount: notifications.length,
      separatorBuilder: (_, __) => SizedBox(height: 12.h),
      itemBuilder: (context, index) {
        return NotificationItemCard(
          notification: notifications[index],
        );
      },
    );
  }
}
class _EmptyNotificationsState extends StatelessWidget {
  const _EmptyNotificationsState();
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        spacing:  18.h,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.notifications_off_outlined,
            size: 80.w,
            color: AppColors.primaryContainer,
          ),
          Text(
            'No notifications here',
            style: Theme.of(context)
                .textTheme
                .titleMedium
                ?.copyWith(  color: AppColors.primaryContainer,),
          ),
        ],
      ),
    );
  }
}
