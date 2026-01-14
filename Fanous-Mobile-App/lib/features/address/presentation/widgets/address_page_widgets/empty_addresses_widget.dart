import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/features/address/presentation/pages/add_address_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class EmptyAddressesWidget extends StatelessWidget {
  const EmptyAddressesWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Padding(
        padding: EdgeInsets.all(AppSpacing.xl),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.location_off,
              size: 80.sp,
              color: isDark ? Colors.white38 : Colors.black26,
            ),
            SizedBox(height: AppSpacing.lg),
            Text(
              'لا توجد عناوين',
              style: TextStyle(
                color: isDark ? Colors.white : Colors.black,
                fontSize: 20.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: AppSpacing.sm),
            Text(
              'قم بإضافة عنوان جديد لتتمكن من استخدامه',
              style: TextStyle(
                color: isDark ? Colors.white60 : Colors.black54,
                fontSize: 14.sp,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: AppSpacing.xl),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const AddAddressPage(),
                  ),
                ).then((_) {
                  // إعادة تحميل العناوين عند العودة
                  if (context.mounted) {
                    Navigator.pop(context, true);
                  }
                });
              },
              icon: Icon(Icons.add_location, size: 20.sp),
              label: Text(
                'إضافة عنوان جديد',
                style: TextStyle(fontSize: 16.sp),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                padding: EdgeInsets.symmetric(
                  horizontal: AppSpacing.lg,
                  vertical: AppSpacing.md,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
