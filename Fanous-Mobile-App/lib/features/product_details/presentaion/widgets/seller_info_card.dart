import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

class SellerInfoCard extends StatelessWidget {
  final String name;
  final String imageUrl;
  final int activeAds;
  final String memberSince;
  final VoidCallback? onTap;


  const SellerInfoCard({
    super.key,
    required this.name,
    required this.imageUrl,
    required this.activeAds,
    required this.memberSince,
    required this.onTap,

  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:  EdgeInsets.all(8.w),
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: EdgeInsets.all(8.w),
          decoration: BoxDecoration(
            gradient: AppColors.primaryGradient,
            borderRadius: BorderRadius.circular(10.r),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// الصف العلوي
              Row(
                spacing: 6.w,
                children: [
                  CircleAvatar(
                    radius: 22.r,
                    backgroundColor: AppColors.primaryContainer,
                    backgroundImage: NetworkImage(imageUrl),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Posted by',
                          style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.white.withAlpha(150)),
                        ),
                        Text(
                          name,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(color:Colors.white ),
                        ),
                      ],
                    ),
                  ),

                ],
              ),
              Divider(height: 8.h,
                  color: AppColors.textPrimaryLight
              ),
              Row(
                children: [
                  _infoItem(
                    context: context,
                    icon: Icons.article_outlined,
                    title: 'Active Ads',
                    value: activeAds.toString(),
                  ),
                  Padding(
                    padding:  EdgeInsets.symmetric(horizontal:  8.w),
                    child: Container(
                      width: 1,
                      height: 40.h,
                      color: AppColors.textPrimaryLight,
                    ),
                  ),
                  _infoItem(
                    context: context,
                    icon: Icons.calendar_month_outlined,
                    title: 'Member Since',
                    value: memberSince,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
  Widget _infoItem({
    required IconData icon,
    required String title,
    required String value,
    required BuildContext context
  }) {
    return Expanded(
      child: Row(
       crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 8.w,
        children: [
          CircleAvatar(
            radius: 18.r,
            backgroundColor: AppColors.primaryContainer,
            child: Icon(
              icon,
              size: AppSpacing.iconSizeSmall,
              color: AppColors.primary,
            ),
          ),
        Column(
            crossAxisAlignment: CrossAxisAlignment.start,
spacing: 2.h,
          children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.white.withAlpha(150)),
          ),

          Text(
            value,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.white),
          ),

        ],)

        ],
      ),
    );
  }


}
