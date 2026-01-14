import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
class ProfileActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color color;
  final VoidCallback onPressed;

  const ProfileActionButton({
    super.key,
    required this.label,
    required this.icon,
    required this.color,
    required this.onPressed,
  });
  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon, size: 18.sp, color: color),
      label: Text(
        label,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
color: color
        ),
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: color.withAlpha(10),
        elevation: 0,
        padding: EdgeInsets.symmetric(vertical: 0, horizontal: 0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.r),
          side: BorderSide(
            color: color , // لون البوردر
            width: 1.5,              // سماكة البوردر
          ),
        ),
      ),

    );
  }
}
