
import 'package:fanous/features/wish_list/domain/entities/wishlist_entity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

class WishListCard extends StatelessWidget {
  final WishlistEntity wishlistEntity;
 final VoidCallback onTapFavorite;
  const WishListCard({super.key, required this.wishlistEntity, required this.onTapFavorite});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
      padding: EdgeInsets.all(12.w),
      decoration: BoxDecoration(
        color: AppColors.primaryContainer.withAlpha(100),
        borderRadius: BorderRadius.circular(14.r),
      ),
      child: Row(
        spacing: 4.w,
        children: [
          /// IMAGE
               Stack(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12.r),
                child: Image.network(
                  wishlistEntity.imageUrl,
                  width: 110.w,
                  height: 100.h,
                  fit: BoxFit.cover,
                ),
              ),
              if (wishlistEntity.isFeatured)
                PositionedDirectional(
                  top: 4.h,
                  start: 4.w,
                  child: Container(
                    padding:
                    EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                    decoration: BoxDecoration(
                      color: AppColors.secondary,
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                    child:  Text(
                      'Featured',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white ,fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
            ],
          ),
          ///  CONTENT
          Expanded(
            child: Column(
              spacing: 6.h,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                        '\$${wishlistEntity.price.toStringAsFixed(2)}',
                        style: Theme.of(context)
                            .textTheme
                            .titleLarge
                            ?.copyWith(color: AppColors.primary),
                      ),
                    ),
                    GestureDetector(
                      onTap:  onTapFavorite,
                        child: Icon(Icons.favorite ,color: AppColors.primary,))
                  ],
                ),

                Text(
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  wishlistEntity.title,
                  style: Theme.of(context).textTheme.titleSmall,
                ),
              Row(

                children: [
                  Icon(Icons.location_on ,size:15.w,color: AppColors.primary,),
                     Text(
                       overflow: TextOverflow.ellipsis,
                       maxLines: 1,
                  wishlistEntity.location,
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(color: AppColors.textPrimaryLight.withAlpha(150) ,fontWeight: FontWeight.bold),
                ),
                ],
              ),

                Text(
                  wishlistEntity.timeAgo,
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(color:AppColors.textPrimaryLight.withAlpha(120)),
                ),
              ],
            ),
          ),



        ],
      ),
    );
  }
}
