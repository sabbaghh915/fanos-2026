import 'package:flutter/material.dart     ';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../../core/theme/app_colors.dart';
class ProfileAvatar extends StatelessWidget {
  final String imagePath;
  final double radius;
  const ProfileAvatar({
    super.key,
    required this.imagePath,
    this.radius = 45,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(4.r),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: AppColors.secondary, width: 3),
      ),
      child: CircleAvatar(
        radius: radius.r,
        backgroundImage: AssetImage(imagePath),
      ),
    );
  }
}
