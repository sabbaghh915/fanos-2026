import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../domain/entities/order_entity.dart';

class OrderItemCard extends StatelessWidget {
  const OrderItemCard({
    super.key,
    required this.order,
    required this.onViewDetails,
  });

  final OrderEntity order;
  final VoidCallback onViewDetails;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Stack(
      clipBehavior: Clip.none, // للسماح للمسكة بالخروج خارج حدود الكرت
      alignment: Alignment.topCenter,
      children: [
        Positioned(
          top: -15.h, // لرفع المسكة فوق الكرت
          child: Container(
            width: 60.w,
            height: 40.h,
            decoration: BoxDecoration(
              border: Border.all(
                color: AppColors.primary.withAlpha(150),
                width: 8.w,
              ),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(25.r),
                topRight: Radius.circular(25.r),
              ),
            ),
          ),
        ),
        // 2. ===== جسم الكرت الأساسي =====
        Container(
          margin: EdgeInsets.only(top: 10.h), // إزاحة بسيطة للأسفل ليعطي مساحة للمسكة
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16.r),
            border: Border.all(color: AppColors.primary.withAlpha(120)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withAlpha(40), // خففت الظل قليلاً ليبدو أنعم
                blurRadius: 12,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          padding: EdgeInsets.all(14.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ===== Product Icon / Image (TOP) =====
              Center(
                child: SizedBox(
                  width: 80.w,
                  height: 80.w,
                  child: Stack(
                    children: [
                      // ===== Image / Fallback =====
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12.r),
                        child: Container(
                          width: 80.w,
                          height: 80.w,
                          color: AppColors.secondary.withAlpha(40),
                          child: order.productImages.isNotEmpty
                              ? Image.network(
                            order.productImages.first,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) {
                              return Icon(
                                Icons.shopping_bag_outlined,
                                color: AppColors.primary,
                                size: 32.sp,
                              );
                            },
                          )
                              : Icon(
                            Icons.shopping_bag_outlined,
                            color: AppColors.primary,
                            size: 32.sp,
                          ),
                        ),
                      ),

                      // ===== +X Overlay =====
                      if (order.productImages.length > 1)
                        Positioned(
                          child: Container(
                            width:  double.infinity,
                            height: double.infinity,
                            alignment: Alignment.center,
                            padding: EdgeInsets.symmetric(
                              horizontal: 6.w,
                              vertical: 2.h,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.secondary.withAlpha(80),
                              borderRadius: BorderRadius.circular(12.r),
                            ),
                            child: Text(
                              '+${order.productImages.length - 1}',
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),

              SizedBox(height: 12.h),

              // ===== Price =====
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Total Amount:',
                    style: textTheme.titleSmall?.copyWith(
                      color: AppColors.secondary,
                    ),
                  ),
                  Text(
                    '\$${order.totalAmount.toStringAsFixed(2)}',
                    style: textTheme.titleMedium?.copyWith(
                      color: AppColors.secondary,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),

              Divider(
                height: 24.h,
                thickness: 1,
                color: AppColors.primary.withAlpha(80),
              ),

              // ===== Order Info + Status =====
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Order #${order.id}',
                        style: textTheme.titleMedium?.copyWith(
                          color: AppColors.primary,
                        ),
                      ),
                      SizedBox(height: 4.h),
                      Text(
                        _formatDate(order.date),
                        style: textTheme.bodySmall,
                      ),
                    ],
                  ),
                  _buildStatusChip(order.status, context),
                ],
              ),

              SizedBox(height: 14.h),

              // ===== Action Button =====
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: onViewDetails,
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(color: AppColors.primary),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 12.h),
                  ),
                  child: Text(
                    'View Details',
                    style: textTheme.titleSmall?.copyWith(
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
  // ===== Helpers =====

  Widget _buildStatusChip(OrderStatus status, BuildContext context) {
    final statusData = _statusConfig(status);

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 4.h),
      decoration: BoxDecoration(
        color: statusData.backgroundColor,
        borderRadius: BorderRadius.circular(20.r),
      ),
      child: Text(
        statusData.label,
        style: Theme.of(context)
            .textTheme
            .labelMedium
            ?.copyWith(color: statusData.textColor),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year} - '
        '${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  _OrderStatusConfig _statusConfig(OrderStatus status) {
    switch (status) {
      case OrderStatus.delivered:
        return _OrderStatusConfig(
          label: 'Delivered',
          textColor: Colors.green,
          backgroundColor: Colors.green.withAlpha(80),
        );
      case OrderStatus.shipped:
        return _OrderStatusConfig(
          label: 'Shipped',
          textColor: Colors.blue,
          backgroundColor: Colors.blue.withAlpha(80),
        );
      case OrderStatus.cancelled:
        return _OrderStatusConfig(
          label: 'Cancelled',
          textColor: Colors.red,
          backgroundColor: Colors.red.withAlpha(80),
        );
      default:
        return _OrderStatusConfig(
          label: 'Pending',
          textColor: AppColors.secondary,
          backgroundColor: AppColors.secondary.withAlpha(100),
        );
    }
  }
}

class _OrderStatusConfig {
  final String label;
  final Color textColor;
  final Color backgroundColor;

  _OrderStatusConfig({
    required this.label,
    required this.textColor,
    required this.backgroundColor,
  });
}
