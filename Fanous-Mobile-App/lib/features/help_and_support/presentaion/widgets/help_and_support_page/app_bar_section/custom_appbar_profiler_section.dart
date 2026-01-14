import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomAppBarHelpWidget extends StatelessWidget {
  const CustomAppBarHelpWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      height: 56.0.h,
      decoration: BoxDecoration(
        color: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
        border: Border(
          bottom: BorderSide(
            color: Colors.grey, // لون رمادي
            width: 0.5, // ناعم (رفيع)
          ),
        ),
      ),

      child: Row(
        children: [
          IconButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            icon: const Icon(Icons.arrow_back_ios_new),
            color: isDark ? AppColors.primaryDark : AppColors.primaryLight,
            iconSize: 16.0.sp,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Center(
              child: Text(
                'Help and Support',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
          ),
          IconButton(
            onPressed: () async {
              // استدعاء خدمة المشاركة (تأكد من وجود ShareService واستيراده)
              // await ShareService.shareApp(
              //   message:
              //       'Hello! Try the amazing Fanous app for buying and selling. '
              //       'Download it now from the store:',
              //   subject: 'Try the amazing Fanous app for buying and selling',
              // );
            },
            icon: const Icon(Icons.share),
            color: isDark ? AppColors.primaryDark : AppColors.primaryLight,
            iconSize: 20.0.sp,
            tooltip: 'Share App',
          ),
        ],
      ),
    );
  }
}
