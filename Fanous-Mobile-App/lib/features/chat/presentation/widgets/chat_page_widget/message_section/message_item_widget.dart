import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MessageItemWidget extends StatelessWidget {
  const MessageItemWidget({
    super.key,
    required this.isRead,
    this.userName,
    this.itemName,
    this.lastMessage,
    this.isPhoneViewed,
    this.time,
    this.avatarUrl,
    this.thumbnailUrl,
    this.unreadCount,
    this.onTap,
  });

  final bool isRead;
  final String? userName;
  final String? itemName;
  final String? lastMessage;
  final bool? isPhoneViewed;
  final String? time;
  final String? avatarUrl;
  final String? thumbnailUrl;
  final int? unreadCount;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Left side - Thumbnail and Avatar in Stack
            Stack(
              clipBehavior: Clip.none,
              children: [
                // Thumbnail Image
                Container(
                  width: 60.w,
                  height: 60.h,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.r),
                    color: isDark
                        ? AppColors.surfaceDark
                        : AppColors.surfaceLight,
                    border: Border.all(
                      color: isDark
                          ? AppColors.surfaceVariantDark
                          : AppColors.primary.withAlpha((0.50 * 255).toInt()),
                      width: 1.5,
                    ),
                  ),
                  child: thumbnailUrl != null
                      ? ClipRRect(
                          borderRadius: BorderRadius.circular(8.r),
                          child: Image.network(
                            thumbnailUrl!,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) =>
                                _buildPlaceholderThumbnail(isDark: isDark),
                          ),
                        )
                      : _buildPlaceholderThumbnail(isDark: isDark),
                ),
                // User Avatar positioned at bottom right corner
                Positioned(
                  bottom: -12.h, // Half outside
                  right: -12.w, // Half outside
                  child: Container(
                    width: 24.w,
                    height: 24.h,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isDark
                          ? AppColors.secondaryDark
                          : AppColors.primary,
                      border: Border.all(
                        color: isDark
                            ? AppColors.surfaceVariantDark
                            : Colors.white,
                        width: 2.5,
                      ),
                    ),
                    child: avatarUrl != null
                        ? ClipOval(
                            child: Image.network(
                              avatarUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) =>
                                  _buildPlaceholderAvatar(isDark: isDark),
                            ),
                          )
                        : _buildPlaceholderAvatar(isDark: isDark),
                  ),
                ),
              ],
            ),
            SizedBox(width: 12.w),
            // Middle side - Content (Expanded for maximum space)
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // User Name
                  if (userName != null)
                    Text(
                      userName!,
                      style: TextStyle(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.primary,
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  SizedBox(height: 4.h),
                  // Item Name
                  if (itemName != null)
                    Text(
                      itemName!,
                      style: TextStyle(
                        color: isDark
                            ? AppColors.textSecondaryDark
                            : AppColors.textSecondaryLight,
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w500,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  SizedBox(height: 6.h),
                  // Last Message or Status
                  if (isPhoneViewed == true) ...[
                    Row(
                      children: [
                        Icon(
                          Icons.phone,
                          size: 14.sp,
                          color: isDark
                              ? AppColors.textTertiaryDark
                              : AppColors.textTertiaryLight,
                        ),
                        SizedBox(width: 4.w),
                        Expanded(
                          child: Text(
                            lastMessage ?? 'Phone number viewed',
                            style: TextStyle(
                              color: isDark
                                  ? AppColors.textTertiaryDark
                                  : AppColors.textTertiaryLight,
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w400,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        SizedBox(width: 4.w),
                        Icon(
                          Icons.check,
                          size: 14.sp,
                          color: isDark
                              ? AppColors.successDark
                              : AppColors.successLight,
                        ),
                      ],
                    ),
                  ] else if (lastMessage != null) ...[
                    Text(
                      lastMessage!,
                      style: TextStyle(
                        color: isDark
                            ? AppColors.textTertiaryDark
                            : (!isRead && unreadCount != null && unreadCount! > 0)
                                ? AppColors.primary
                                : AppColors.textTertiaryLight,
                        fontSize: 12.sp,
                        fontWeight: (!isRead && unreadCount != null && unreadCount! > 0)
                            ? FontWeight.w600
                            : FontWeight.w400,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),
            SizedBox(width: 12.w),
            // Right side - Time and Unread Badge
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                if (time != null)
                  Text(
                    time!,
                    style: TextStyle(
                      color: isDark
                          ? AppColors.textTertiaryDark
                          : AppColors.textTertiaryLight,
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                if (unreadCount != null && unreadCount! > 0) ...[
                  SizedBox(height: 4.h),
                  Container(
                    padding: EdgeInsets.symmetric(
                      horizontal: unreadCount! > 99 ? 6.w : 7.w,
                      vertical: 2.h,
                    ),
                    decoration: BoxDecoration(
                      color: isDark
                          ? AppColors.secondaryDark
                          : AppColors.primary,
                      borderRadius: BorderRadius.circular(12.r),
                    ),
                    child: Text(
                      unreadCount! > 99 ? '99+' : unreadCount.toString(),
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 10.sp,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlaceholderThumbnail({required bool isDark}) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.r),
        color: isDark
            ? AppColors.surfaceVariantDark
            : AppColors.surfaceVariantLight,
      ),
      child: Icon(
        Icons.image,
        size: 24.sp,
        color: isDark
            ? AppColors.textTertiaryDark
            : AppColors.textTertiaryLight,
      ),
    );
  }

  Widget _buildPlaceholderAvatar({required bool isDark}) {
    return Icon(
      Icons.person,
      size: 14.sp,
      color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryDark,
    );
  }
}
