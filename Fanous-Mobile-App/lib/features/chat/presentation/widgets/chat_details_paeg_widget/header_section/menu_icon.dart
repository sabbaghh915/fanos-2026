import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MenuIcon extends StatelessWidget {
  const MenuIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        showModalBottomSheet(
          context: context,
          backgroundColor: AppColors.backgroundDark,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
          ),
          builder: (context) {
            return SafeArea(
              child: Padding(
                padding: EdgeInsets.only(top: 12.h),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // White line on the top
                    Container(
                      margin: EdgeInsets.only(bottom: 12.h),
                      width: 40.w,
                      height: 4.h,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(2.r),
                      ),
                    ),
                    // "Options" Text centered
                    Center(
                      child: Padding(
                        padding: EdgeInsets.only(bottom: 12.h),
                        child: Text(
                          "Options",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 12.sp,
                          ),
                        ),
                      ),
                    ),
                    Divider(
                      color: Colors.grey[400],
                      thickness: 0.2.h,
                      height: 0,
                    ),
                    ListTile(
                      leading: Icon(
                        Icons.delete_outline,
                        color: Colors.red,
                        size: 18.sp,
                      ),
                      title: Text(
                        "Delete Chat",
                        style: TextStyle(
                          color: Colors.red,
                          fontWeight: FontWeight.w500,
                          fontSize: 12.sp,
                        ),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                        // Handle delete chat
                      },
                    ),
                    Divider(
                      color: Colors.grey[400],
                      thickness: 0.2.h,
                      indent: 16.w,
                      endIndent: 16.w,
                      height: 0,
                    ),
                    ListTile(
                      leading: Icon(
                        Icons.report_outlined,
                        color: Colors.white,
                        size: 18.sp,
                      ),
                      title: Text(
                        "Report User",
                        style: TextStyle(color: Colors.white, fontSize: 12.sp),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                        // Handle report user
                      },
                    ),
                    Divider(
                      color: Colors.grey[400],
                      thickness: 0.2.h,
                      indent: 16.w,
                      endIndent: 16.w,
                      height: 0,
                    ),
                    ListTile(
                      leading: Icon(
                        Icons.block_outlined,
                        color: Colors.white,
                        size: 18.sp,
                      ),
                      title: Text(
                        "Block User",
                        style: TextStyle(color: Colors.white, fontSize: 12.sp),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                        // Handle block user
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
      child: Icon(Icons.more_vert, color: Colors.white, size: 18.sp),
    );
  }
}
