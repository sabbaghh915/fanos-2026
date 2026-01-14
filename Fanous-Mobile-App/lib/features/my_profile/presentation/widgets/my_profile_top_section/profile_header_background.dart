import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/theme/app_colors.dart';

class ProfileHeaderBackground extends StatelessWidget {
  const ProfileHeaderBackground({super.key});
  @override
  Widget build(BuildContext context) {
    return ClipPath(
      clipper: MyCustomClipper(),
      child: Container(
        height: 270.h,
        width: double.infinity, // تأكد من إضافة العرض الكامل
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topRight ,
            end: Alignment.bottomLeft,
            colors: [
              AppColors.primary,
              AppColors.primaryDark,
            ],
          ),
        ),
      ),
    );
  }
}
class MyCustomClipper extends CustomClipper<Path> {
  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
  @override
  Path getClip(Size size) {
    Path path = Path();
    // النقطة 1: نبدأ من أعلى اليسار (0,0) - افتراضياً
    path.lineTo(0, size.height); // النقطة 2: أسفل اليسار
    // النقطة 3: خط مائل لجهة اليمين (أعلى قليلاً من القاع)
    path.lineTo(size.width, size.height * 0.7);
    // النقطة 4: أعلى اليمين
    path.lineTo(size.width, 0);

    path.close(); // العودة لنقطة البداية (إغلاق المسار)
    return path;
  }

}