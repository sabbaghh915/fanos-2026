import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ViewAllSection extends StatelessWidget {
  const ViewAllSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 4.h),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8.r),
          border: Border.all(
            color: Colors.orange.withAlpha((0.3 * 255).toInt()),
            width: 1.w,
          ),
        ),
        child: ListTile(
          title: Text(
            'View All In viehicles',
            style: TextStyle(
              fontSize: 12.sp,
              color: Colors.orange,
              fontWeight: FontWeight.normal,
            ),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.r),
          ),
          onTap: () {
            // TODO: تنفيذ منطق عرض كل المنتجات
          },
          contentPadding: EdgeInsets.symmetric(
            horizontal: 12.w,
            vertical: 4.h,
          ),
          dense: true,
          visualDensity: VisualDensity.compact,
        ),
      ),
    );
  }
}

