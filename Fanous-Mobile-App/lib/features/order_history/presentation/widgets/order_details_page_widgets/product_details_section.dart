import 'package:fanous/features/order_history/domain/entities/order_details_entity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/theme/app_colors.dart';
class ProductDetailsSection extends StatelessWidget {
  final OrderDetailsEntity   order;
  const ProductDetailsSection({
    super.key,
    required this.order,
  });
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(10),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 220.h,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.all(12.w),
              itemCount: order.images.isEmpty ? 1 : order.images.length,
              separatorBuilder: (_, __) => SizedBox(width: 8.w),
              itemBuilder: (context, index) {
                return ClipRRect(
                  borderRadius: BorderRadius.circular(14.r),
                  child: Container(
                    width: 220.w,
                    color: Colors.grey[100],
                    child: order.images.isEmpty
                        ? _buildPlaceholderIcon()
                        : Image.network(
                      order.images[index],
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => _buildPlaceholderIcon(),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
            child: Column(
              spacing:  8.h,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  order.title,
                  style: textTheme.titleLarge,
                ),
                Text(
                  '\$${order.price.toStringAsFixed(2)}',
                  style: textTheme.titleLarge?.copyWith(
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                // عرض تفاصيل المنتج (Details Card)
                _buildDetailsGrid(order.details ,context  ),
                Divider(color: Colors.grey.withAlpha(40)),
                // ===== Description =====
                Text(
                  'Description:',
                  style: textTheme.titleMedium,
                ),
                Text(
                  order.description,
                  style: textTheme.titleSmall?.copyWith(
                    color: AppColors.primary.withAlpha(150),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
  Widget _buildPlaceholderIcon() {
    return Center(
      child: Icon(
        Icons.shopping_bag_outlined,
        color: AppColors.primary,
        size: 36.sp,
      ),
    );
  }
  // ويدجت داخلي لعرض قائمة التفاصيل بشكل قائمة
  Widget  _buildDetailsGrid( List<OrderProductDetailItem> details ,BuildContext context) {
    return Wrap(
      spacing: 12.w,
      runSpacing: 8.h,
      children: details.map((item) => Container(
        padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 6.h),
        decoration: BoxDecoration(
          color: AppColors.primary.withAlpha(15),
          borderRadius: BorderRadius.circular(8.r),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('${item.title}: ', style: Theme.of(context).textTheme.titleSmall?.copyWith(color: AppColors.secondary)),
            Text(item.value, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.textPrimaryLight)),
          ],
        ),
      )).toList(),
    );
  }
}