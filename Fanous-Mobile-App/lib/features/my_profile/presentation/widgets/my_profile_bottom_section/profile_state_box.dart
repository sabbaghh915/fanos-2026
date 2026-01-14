import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProfileStatBox extends StatelessWidget {
  final String value;
  final String label;
  final IconData icon;
  final Color color;
  const ProfileStatBox({
    super.key,
    required this.value,
    required this.label,
    required this.icon,
    required this.color,
  });
  
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        // 1. استخدام التدرج اللوني لعمق أكبر
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            color,
            color.withAlpha(80), // لون أغمق قليلاً للنهاية
          ],
        ),
        borderRadius: BorderRadius.circular(24.r),
        // 2. إضافة ظل ملون يتناسب مع لون الكارت
        boxShadow: [
          BoxShadow(
            color:   color.withAlpha(120),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Stack( // استخدام Stack لإضافة الأيقونة الخلفية
        children: [
          // 3. أيقونة كبيرة خلفية شفافة لتعطي شكلاً جمالياً
          Positioned(
            right: -10,
            bottom: -10,
            child: Icon(
              icon,
              size: 100.sp,
              color: Colors.white.withAlpha(80)  ,
            ),
          ),
          // 4. المحتوى الأساسي
          Center(
            child: Padding(
              padding: EdgeInsets.all(16.r),
              child: Column(
                spacing: 8.h,
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // أيقونة صغيرة في الأعلى داخل دائرة خفيفة
                  Container(
                    padding: EdgeInsets.all(8.r),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withAlpha(160) ,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(icon, color: Colors.white, size: 20.sp),
                  ),
                  Text(
                    value,
                    style: Theme.of(context).textTheme  .titleLarge?.copyWith(color:AppColors .primary),
                  ),
                  Text(
                    label,
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(color:AppColors .secondary) ,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}