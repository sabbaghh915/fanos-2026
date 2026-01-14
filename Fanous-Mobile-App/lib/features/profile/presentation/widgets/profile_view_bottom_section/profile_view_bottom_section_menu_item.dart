import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProfileViewBottomSectionMenuItem extends StatelessWidget {
  // الحفاظ على جميع الخاصيات الأصلية
  final String title;
  final String subtitle;
  final Color? color;
  final IconData icon;
  final VoidCallback onTap;

  const ProfileViewBottomSectionMenuItem({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.color, // سيبقى اختيارياً كما هو
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12.r),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.r),
          // إذا لم يتم تمرير لون، نستخدم الأبيض كافتراضي للثيم الفاتح
          color: color ?? Colors.white,
          border: Border.all(color: AppColors.primary.withAlpha(20)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(10),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
          child: Row(
            // الحفاظ على خاصية spacing التي استخدمتها
            spacing: 10.w,
            children: [
              CircleAvatar(
                radius: 26.r,
                // تغيير الخلفية لتناسب الثيم الفاتح
                backgroundColor: AppColors.primary.withAlpha(30),
                child: Icon(
                  icon,
                  size: 26.sp,
                  color: AppColors.primary, // الأيقونة بلون الثيم الأساسي
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      // نص داكن للثيم الفاتح
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppColors.primaryDark,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (subtitle.isNotEmpty)
                      Text(
                        subtitle,
                        // نص فرعي رمادي/ثانوي
                        style: Theme.of(context).textTheme.titleSmall?.copyWith(
                          color: AppColors.secondary.withAlpha(150),
                        ),
                      ),
                  ],
                ),
              ),
              // سهم التنقل بلون ثانوي خفيف
              Icon(
                Icons.arrow_forward_ios,
                size: 14.w,
                color: AppColors.primary.withAlpha(100),
              ),
            ],
          ),
        ),
      ),
    );
  }
}