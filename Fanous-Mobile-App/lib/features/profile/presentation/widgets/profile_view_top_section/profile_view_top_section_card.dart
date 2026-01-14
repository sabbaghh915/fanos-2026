import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
class ProfileViewTopSectionCard extends StatelessWidget {
  final IconData iconData;
  final String title ;
  final VoidCallback onTap;
  const ProfileViewTopSectionCard({super.key, required this.iconData, required this.title, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        borderRadius:BorderRadius.circular(12.r),
        onTap: onTap,
        child: Container(
          height: 80.h,
          decoration: BoxDecoration(
            color: AppColors.primaryContainer,
            borderRadius: BorderRadius.circular(12.r),
          ),
          child: Column(
            spacing: 8.h,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(iconData, color: AppColors.primary,),
              Text(
                title,
                style: Theme.of(context).textTheme.titleSmall?.copyWith(color: AppColors.primary)
              ),
            ],
          ),
        ),
      ),
    ) ;
  }
}
