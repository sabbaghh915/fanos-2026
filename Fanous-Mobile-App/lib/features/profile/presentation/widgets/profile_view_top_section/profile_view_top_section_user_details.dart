import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart ';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProfileViewTopSectionUserDetails extends StatelessWidget {
  final String userName;
  final String userNumber;
  final String userImage;
  final VoidCallback onTabNotification;
  const ProfileViewTopSectionUserDetails({
    super.key,
    required this.userName,
    required this.userNumber,
    required this.userImage,
    required this.onTabNotification,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      spacing: 8.w,
      children: [
        CircleAvatar(
          radius: 26.r,
          backgroundColor: AppColors.primaryContainer.withAlpha(160),
          child: (userImage.isEmpty)
              ? Icon(
            Icons.person,
            size: 28.sp,
            color: AppColors.primary,
          )
              : ClipOval(
            child: Image.network(
              userImage,
              width: 52.r,
              height: 52.r,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Icon(
                  Icons.person,
                  size: 28.sp,
                  color: AppColors.primary,
                );
              },
            ),
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
             userName,
              style: TextStyle(
                color: Colors.white,
                fontSize: 14.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              userNumber,
              style: TextStyle(color: Colors.white70, fontSize: 12.sp),
            ),
          ],
        ),
        const Spacer(),
        CircleAvatar(
          radius: 20.r,
          backgroundColor: AppColors.primaryContainer.withAlpha(120),
          child: IconButton(
            onPressed: onTabNotification,
            icon: Icon(Icons.notifications, color: AppColors.primary, size: 22.sp),
          ),
        ),
      ],
    );
  }
}
