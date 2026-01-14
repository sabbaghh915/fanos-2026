import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/wish_list/domain/entities/wishlist_entity.dart';
import 'package:fanous/features/wish_list/presentation/widgets/wish_list_card.dart';
import 'package:flutter/material.dart';
class WishListPage extends StatelessWidget {
  WishListPage({super.key});

  final List<WishlistEntity> wishInfo = [
    WishlistEntity(
      title: 'Samsung Galaxy Z fold for SaleSamsung Galaxy Z fold for Sale Samsung Galaxy Z fold for SaleSamsung Galaxy Z fold for Sale',
      price: 200000000000000000000,
      location: 'Sitara Park City, Faisalabad',
      timeAgo: '10 mins ago',
      imageUrl:
      'https://plus.unsplash.com/premium_photo-1661769021743-7139c6fc4ab9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isFeatured: true,
    ),
    WishlistEntity(
      title: 'Toyota Aqua 2013',
      price: 20,
      location: 'Saidpur Road, Rawalpindi',
      timeAgo: '5 hours ago',
      imageUrl:
      'https://plus.unsplash.com/premium_photo-1661769021743-7139c6fc4ab9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isFeatured: true,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.backgroundLight,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Wish',
              style: Theme.of(context)
                  .textTheme
                  .headlineMedium
                  ?.copyWith(color: AppColors.primary),
            ),
            Text(
              'List',
              style: Theme.of(context)
                  .textTheme
                  .headlineMedium
                  ?.copyWith(color: AppColors.secondary),
            ),
          ],
        ),
      ),
      body: ListView.builder(
        itemCount: wishInfo.length,
        itemBuilder: (context, index) {
          return WishListCard(wishlistEntity: wishInfo[index], onTapFavorite: () { },);
        },
      ),
    );
  }
}

