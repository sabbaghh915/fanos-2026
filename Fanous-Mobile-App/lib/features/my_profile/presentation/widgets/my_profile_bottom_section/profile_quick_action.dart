import 'package:flutter/material.dart ';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../../core/theme/app_colors.dart';
import 'profile_action_button.dart';
class ProfileQuickActions extends StatelessWidget {
  final VoidCallback onEdit;
  final VoidCallback onShare;

  const ProfileQuickActions({
    super.key,
    required this.onEdit,
    required this.onShare,
  });
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w),
      child: Row(
        spacing: 12.w,
        children: [
          Expanded(
            child: ProfileActionButton(
              label: 'Create Post',
              icon: Icons.create_rounded  ,
              color: AppColors.primary,
              onPressed: onEdit,
            ),
          ),
          Expanded(
            child: ProfileActionButton(
              label: 'Share',
              icon: Icons.share_rounded,
              color: AppColors.secondary,
              onPressed: onShare,
            ),
          ),
        ],
      ),
    );
  }
}
