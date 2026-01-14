import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/my_adds/presentation/widgets/my_add_view_discount_tile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'my_ads_active_view.dart';
import 'my_ads_all_view.dart';
import 'my_ads_in_active_view.dart';
import 'my_ads_pending_view.dart';

class MyAdsPage extends StatelessWidget {
  const MyAdsPage({super.key});
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: AppBar(

          title: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('My', style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: AppColors.primary),),
              Text(
                'Ads',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: AppColors.secondary),
              ),
            ],
          ),
          centerTitle: true,
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(60.h),
            child: Column(
              children: [
                TabBar(
                  indicatorColor:AppColors.primary,
                  indicatorWeight: 2,
                  dividerColor: Colors.transparent,
                  labelColor: AppColors.primary,
                  unselectedLabelColor: AppColors.primary,
                  tabs: const [
                    Tab(text: 'All'),
                    Tab(text: 'Active'),
                    Tab(text: 'Pending'),
                    Tab(text: 'Inactive'),
                  ],
                ),
                MyAddViewDiscountTile(onTapDiscount: () {}),
              ],
            ),
          ),
        ),
        body: TabBarView(
          children: [
            MyAdsAllView(),
            MyAdsActiveView(),
            MyAdsPendingView(),
            MyAdsInActiveView(),
          ],
        ),
      ),
    );
  }
}
