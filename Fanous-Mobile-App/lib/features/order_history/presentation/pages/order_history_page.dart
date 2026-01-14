import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/order_history/domain/entities/order_entity.dart';
import 'package:fanous/features/order_history/presentation/pages/order_details_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../widgets/order_history_page_widgets/order_item_card.dart';
import '../widgets/order_history_page_widgets/statistics_section.dart';
class OrderHistoryPage extends StatelessWidget {
  const OrderHistoryPage({super.key});
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final List<OrderEntity> orders = [
      OrderEntity(
        id: 'FN-9852',
        date: DateTime(2023, 10, 24, 10, 30),
        itemsCount: 1,
        totalAmount: 150.00,
        status: OrderStatus.delivered,
        productImages: [
          'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?_gl=1*1q1jxre*_ga*MjAyMzA5NjQ3NS4xNzY3NzAwMDU0*_ga_8JE65Q40S6*czE3Njc3MDAwNTQkbzEkZzEkdDE3Njc3MDAxODUkajYwJGwwJGgw'
        ],
      ),
      OrderEntity(
        id: 'FN-9853',
        date: DateTime(2023, 10, 22, 14, 15),
        itemsCount: 3,
        totalAmount: 320.50,
        status: OrderStatus.shipped,
        productImages: [
          'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?_gl=1*1akoz2l*_ga*MjAyMzA5NjQ3NS4xNzY3NzAwMDU0*_ga_8JE65Q40S6*czE3Njc3MDAwNTQkbzEkZzEkdDE3Njc3MDA0ODUkajYwJGwwJGgw',
          'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg',
          'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg',
        ],
      ),
      OrderEntity(
        id: 'FN-9854',
        date: DateTime(2023, 10, 18, 9, 00),
        itemsCount: 2,
        totalAmount: 210.00,
        status: OrderStatus.pending,
        productImages: [],
      ),
    ];
    final int completedOrders = orders
        .where((order) => order.status == OrderStatus.delivered)
        .length;
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppBar(
        surfaceTintColor: Colors.transparent,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Order ',
              style: textTheme.headlineMedium
                  ?.copyWith(color: AppColors.primary),
            ),
            Text(
              'History',
              style: textTheme.headlineMedium
                  ?.copyWith(color: AppColors.secondary),
            ),
          ],
        ),
        backgroundColor: AppColors.backgroundLight,
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          spacing:  2.h,
          children: [
            // ===== Statistics Section =====
            OrderStatisticsSection(
              totalOrders: orders.length,
              completedOrders: completedOrders,
            ),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              padding: EdgeInsets.all(16.w),
              itemCount: orders.length,
              separatorBuilder: (_, __) => SizedBox(height: 30.h),
              itemBuilder: (context, index) {
                return OrderItemCard(
                  order: orders[index],
                  onViewDetails: () {
    Navigator.push(context,MaterialPageRoute( builder: (_)=> OrderDetailsPage()));
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
