import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'statistics_card.dart';
class OrderStatisticsSection extends StatelessWidget {
  const OrderStatisticsSection({
    super.key,
    required this.totalOrders,
    required this.completedOrders,
  });
  final int totalOrders;
  final int completedOrders;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w),
      child: Row(
        spacing: 16.w,
        children: [
          Expanded(
            child: StatisticsCard(
              label: 'Orders',
              value: totalOrders.toString(),
              icon: Icons.shopping_bag_outlined,
            ),
          ),
          Expanded(
            child: StatisticsCard(
              label: 'Delivered',
              value: completedOrders.toString(),
              icon: Icons.check_circle_outline,
            ),
          ),
        ],
      ),
    );
  }
}
