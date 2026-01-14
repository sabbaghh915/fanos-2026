import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../widget/sell_bottom_sheet_item.dart';

class SellBottomSheetPage extends StatelessWidget {

  const SellBottomSheetPage({super.key});


  @override

  Widget build(BuildContext context) {
    final List<Map<String, ImageProvider?>> mainCategories = [
      {
        'Mobiles': NetworkImage(
          'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=600',
        ),
      },
      {'Vehicles': null},
      {'Property for Sale': null},
      {'Property for Rent': null},
    ];

    final List<String> subCategories = [
      'Electronics & Home Appliances',
      'Bikes',
      'Business, Industrial & Agriculture',
      'Services',
      'Jobs',
      'Animals',
      'Furniture & Home Decor',
    ];

    return SafeArea(
      top: true,
      child: Padding(
        padding: EdgeInsets.only(top: kToolbarHeight),
        child: Container(
          decoration: const BoxDecoration(
            color: AppColors.backgroundLight,
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: Column(
            spacing: 4.h,
            children: [
              // ===== Handle =====
              SizedBox(height: 4.h),
              Container(
                width: 40.w,
                height: 4.h,
                decoration: BoxDecoration(
                  color: AppColors.primary,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),

              // ===== Header =====
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 8.h),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        'What are you selling?',
                        style: Theme.of(context)
                            .textTheme
                            .headlineSmall
                            ?.copyWith(color: AppColors.surfaceVariantDark),
                      ),
                    ),
                    InkWell(
                      onTap: () => Navigator.pop(context),
                      borderRadius: BorderRadius.circular(20),
                      child: Icon(
                        Icons.close,
                        size: AppSpacing.iconSize,
                        color: AppColors.primaryDark,
                      ),
                    ),
                  ],
                ),
              ),

              Divider(
                height: 1,
                color: AppColors.primary,
              ),

              // ===== Content =====
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // ===== Category Title =====
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 10.w),
                        child: Text(
                          'Category',
                          style: Theme.of(context)
                              .textTheme
                              .titleMedium
                              ?.copyWith(color: AppColors.surfaceVariantDark),
                        ),
                      ),

                      // ===== Main Categories List =====
                      ListView.builder(
                        itemCount: mainCategories.length,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          final entry = mainCategories[index].entries.first;

                          return SellBottomSheetItem(
                            title: entry.key,
                            image: entry.value,
                            onTap: () {},
                          );
                        },
                      ),

                      SizedBox(height: 10.h),

                      // ===== Sub Category Title =====
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 10.w),
                        child: Text(
                          'Sub Category',
                          style: Theme.of(context)
                              .textTheme
                              .titleMedium
                              ?.copyWith(color: AppColors.surfaceVariantDark),
                        ),
                      ),

                      // ===== Sub Categories List =====
                      ListView.builder(
                        itemCount: subCategories.length,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return SellBottomSheetItem(
                            title: subCategories[index],
                            onTap: () {},
                          );
                        },
                      ),

                      SizedBox(height: 12.h),
                    ],
                  ),
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}
