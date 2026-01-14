import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/presentation/widgets/chat_details_paeg_widget/header_section/menu_icon.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class HeaderSection extends StatelessWidget {
  final String userName;
  final String userStatus;
  final String? userAvatarUrl;

  const HeaderSection({
    super.key,
    required this.userName,
    required this.userStatus,
    this.userAvatarUrl,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    final borderColor = isDark
        ? Colors.grey.withAlpha((255 * 0.3).toInt())
        : Colors.grey.withAlpha((255 * 0.2).toInt());
    
    final iconColor = isDark
        ? AppColors.textPrimaryDark
        : AppColors.textPrimaryLight;
    
    final textColor = isDark
        ? AppColors.textPrimaryDark
        : AppColors.textPrimaryLight;
    
    final avatarBgColor = isDark ? Colors.yellow : Colors.blue.shade200;
    
    final avatarIconColor = isDark ? Colors.black : Colors.white;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: borderColor,
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        children: [
          // Back Button
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: const Icon(Icons.arrow_back_ios_new_rounded),
            color: iconColor,
            iconSize: 18.sp,
            padding: EdgeInsets.zero,
            constraints: BoxConstraints(),
          ),

          SizedBox(width: 6.w),

          // Menu Icon
          MenuIcon(),

          SizedBox(width: 10.w),

          // User Info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  userName,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 1.h),
                Text(
                  userStatus,
                  style: TextStyle(
                    color: AppColors.success,
                    fontSize: 10.sp,
                  ),
                ),
              ],
            ),
          ),

          // Profile Picture
          CircleAvatar(
            radius: 17.r,
            backgroundColor: avatarBgColor,
            backgroundImage: userAvatarUrl != null
                ? NetworkImage(userAvatarUrl!)
                : null,
            child: userAvatarUrl == null
                ? Icon(
                    Icons.person,
                    color: avatarIconColor,
                    size: 20.sp,
                  )
                : null,
          ),
        ],
      ),
    );
  }
}

