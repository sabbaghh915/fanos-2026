import 'package:fanous/core/theme/app_typography.dart';
import 'package:fanous/features/sub_category_deatails/presentation/pages/sub_category_details_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CategoryItem extends StatelessWidget {
  const CategoryItem({super.key, required this.category});
  final String category;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return InkWell(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const SubCategoryDetailsPage(),
          ),
        );
      },
      borderRadius: BorderRadius.circular(12.r),
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 6.w),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.r),
          color: isDark ? const Color(0xFF232323) : Colors.white,
          border: Border.all(
            color: isDark ? const Color(0xFF444444) : Colors.grey.shade200,
            width: 1.2.w,
          ),
          boxShadow: [
            BoxShadow(
              color: (isDark ? Colors.black : Colors.grey).withAlpha(
                (0.06 * 255).toInt(),
              ),
              blurRadius: 6.r,
              offset: Offset(0, 2.h),
            ),
          ],
        ),
        child: ListTile(
          contentPadding: EdgeInsets.symmetric(vertical: 4.h, horizontal: 8.w),
          leading: CircleAvatar(
            backgroundColor: Theme.of(
              context,
            ).colorScheme.primary.withAlpha((0.1 * 255).toInt()),
            child: Icon(
              Icons.category,
              color: Theme.of(context).colorScheme.primary,
            ),
          ),
          title: Text(
            category,
            style: AppTypography.bodyMedium(isDark: isDark),
          ),
          trailing: Icon(
            Icons.arrow_forward_ios_rounded,
            size: 18.sp,
            color: isDark ? Colors.white60 : Colors.grey,
          ),
        ),
      ),
    );
  }
}
