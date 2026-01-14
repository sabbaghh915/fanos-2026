import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
class ProfileAppBar  extends StatelessWidget {
  final VoidCallback onSettingsPressed;

  const ProfileAppBar({
    super.key,
    required this.onSettingsPressed,
  });
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Profile',
            style: Theme.of(context)
                .textTheme
                .headlineSmall
                ?.copyWith(color: Colors.white,),
          ),
          Container(
            decoration: BoxDecoration(
              color: AppColors.backgroundLight ,
              borderRadius: BorderRadius.circular(20.r),
            ),
            child: IconButton(
              icon:  Icon(Icons.settings_suggest_rounded, color: AppColors.primary ,size: 20.w,),
              onPressed: onSettingsPressed,
            ),
          ),
        ],
      ),
    );
  }
}
