import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/features/address/domain/entities/address_entity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../bloc/address_list_bloc/address_list_bloc.dart';
import '../../bloc/address_list_bloc/address_list_event.dart';

class AddressItemWidget extends StatelessWidget {
  final AddressEntity address;

  const AddressItemWidget({super.key, required this.address});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDark ? AppColors.surfaceDark : AppColors.surfaceLight;

    return Card(
      color: cardColor,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.r),
        side: BorderSide(
          color: address.isDefault
              ? AppColors.primary
              : (isDark
                    ? AppColors.surfaceVariantDark
                    : AppColors.surfaceVariantLight),
          width: address.isDefault ? 2 : 1,
        ),
      ),
      child: Padding(
        padding: EdgeInsets.all(AppSpacing.md),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Icon
            Container(
              padding: EdgeInsets.all(12.r),
              decoration: BoxDecoration(
                color: address.isDefault
                    ? AppColors.primary.withAlpha((0.1 * 255).toInt())
                    : AppColors.primaryContainer.withAlpha((0.5 * 255).toInt()),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Icon(
                Icons.location_on,
                color: address.isDefault
                    ? AppColors.primary
                    : AppColors.primaryLight,
                size: 24.sp,
              ),
            ),
            SizedBox(width: AppSpacing.md),
            // Address Details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          address.title,
                          style: TextStyle(
                            color: isDark ? Colors.white : Colors.black,
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      if (address.isDefault)
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8.w,
                            vertical: 4.h,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(4.r),
                          ),
                          child: Text(
                            'افتراضي',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 10.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 4.h),
                  if (address.description != null)
                    Text(
                      address.description!,
                      style: TextStyle(
                        color: isDark ? Colors.white70 : Colors.black87,
                        fontSize: 14.sp,
                      ),
                    ),
                  SizedBox(height: 4.h),

                  Text(
                    '${address.latitude.toStringAsFixed(6)}, ${address.longitude.toStringAsFixed(6)}',
                    style: TextStyle(
                      color: isDark ? Colors.white54 : Colors.black45,
                      fontSize: 11.sp,
                    ),
                  ),
                ],
              ),
            ),
            // Actions Menu
            PopupMenuButton<String>(
              icon: Icon(
                Icons.more_vert,
                color: isDark ? Colors.white70 : Colors.black54,
                size: 20.sp,
              ),
              onSelected: (value) {
                if (value == 'delete') {
                  _showDeleteDialog(context);
                } else if (value == 'set_default' && !address.isDefault) {
                  context.read<AddressListBloc>().add(
                    SetDefaultAddressEvent(address.id),
                  );
                }
              },
              itemBuilder: (context) => [
                if (!address.isDefault)
                  PopupMenuItem(
                    value: 'set_default',
                    child: Row(
                      children: [
                        Icon(Icons.star, size: 20.sp, color: AppColors.primary),
                        SizedBox(width: 8.w),
                        Text(
                          'تعيين كافتراضي',
                          style: TextStyle(fontSize: 14.sp),
                        ),
                      ],
                    ),
                  ),
                PopupMenuItem(
                  value: 'delete',
                  child: Row(
                    children: [
                      Icon(Icons.delete, size: 20.sp, color: Colors.red),
                      SizedBox(width: 8.w),
                      Text(
                        'حذف',
                        style: TextStyle(fontSize: 14.sp, color: Colors.red),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteDialog(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        backgroundColor: isDark
            ? AppColors.surfaceDark
            : AppColors.surfaceLight,
        title: Text(
          'حذف العنوان',
          style: TextStyle(
            color: isDark ? Colors.white : Colors.black,
            fontSize: 18.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
        content: Text(
          'هل أنت متأكد من حذف هذا العنوان؟',
          style: TextStyle(
            color: isDark ? Colors.white70 : Colors.black87,
            fontSize: 14.sp,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: Text(
              'إلغاء',
              style: TextStyle(color: isDark ? Colors.white70 : Colors.black54),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(dialogContext);
              context.read<AddressListBloc>().add(
                DeleteAddressEvent(address.id),
              );
            },
            child: Text(
              'حذف',
              style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}
