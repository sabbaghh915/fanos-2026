import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entity/notification_entity.dart';

class NotificationItemCard extends StatelessWidget {
  const NotificationItemCard({
    super.key,
    required this.notification,
  });
  final NotificationEntity notification;
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final bool isUnread = !notification.isRead;
    return Container(
      decoration: BoxDecoration(
        color: isUnread ? AppColors.primary.withAlpha(15) : Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(
          color: isUnread
              ? AppColors.primary.withAlpha(50)
              : AppColors.secondary.withAlpha(40),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(5),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
        leading: _NotificationIcon(isUnread: isUnread),
        title: Text(
          notification.title,
          style: textTheme.titleMedium?.copyWith(
            fontWeight: isUnread ? FontWeight.bold : FontWeight.normal,
            color: AppColors.primaryDark,
          ),
        ),
        subtitle: Column(
          spacing:6.h,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              notification.description,
              style: textTheme.bodySmall?.copyWith(color:AppColors.textPrimaryLight.withAlpha(160) ,fontWeight:isUnread ? FontWeight.bold : FontWeight.normal,),
            ),
            Text(
              notification.time,
              style: textTheme.labelSmall?.copyWith(
                color: AppColors.secondary.withAlpha(180),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
class _NotificationIcon extends StatelessWidget {
  const _NotificationIcon({required this.isUnread});
  final bool isUnread;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10.r),
      decoration: BoxDecoration(
        color: isUnread
            ? AppColors.primary
            : AppColors.secondary.withAlpha(30),
        shape: BoxShape.circle,
      ),
      child: Icon(
        Icons.notifications_outlined,
        color: isUnread ? Colors.white : AppColors.secondary,
        size: 24.sp,
      ),
    );
  }
}
