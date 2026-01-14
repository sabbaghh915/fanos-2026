import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProfileImageSection extends StatelessWidget {
  final String? imageUrl;

  const ProfileImageSection({
    super.key,
    this.imageUrl, // جعله اختيارياً
  });

  @override
  Widget build(BuildContext context) {
    // 3. التحقق من وجود رابط الصورة
    final networkImage = imageUrl != null && imageUrl!.isNotEmpty
        ? NetworkImage(imageUrl!)
        : null;

    return Center(
      child: Stack(
        children: [
          CircleAvatar(
            radius: 52.r,
            backgroundColor: AppColors.primary.withAlpha(120),
            child: CircleAvatar(
              radius: 48.r,
              backgroundColor: AppColors.primary,
              // 4. استخدام backgroundImage لعرض الصورة
              //    وتلقائياً سيعرض الـ child إذا كانت الصورة null أو فشل تحميلها
              backgroundImage: networkImage as ImageProvider?,
              child: networkImage == null
                  ? Icon(Icons.person, size: 48.w, color: Colors.white)
                  : null, // لا تعرض الأيقونة إذا كانت الصورة موجودة
            ),
          ),
          Positioned(
            bottom: 2.h,
            right: 2.w,
            child: CircleAvatar(
              radius: 16.r,
              backgroundColor: AppColors.backgroundLight,
              child: CircleAvatar(
                radius: 14.r,
                backgroundColor: AppColors.secondary,
                child:
                 Icon(Icons.camera_alt, size: 16.w, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
