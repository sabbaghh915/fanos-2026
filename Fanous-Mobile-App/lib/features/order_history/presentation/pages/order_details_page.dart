import 'package:fanous/features/order_history/domain/entities/order_details_entity.dart';
import 'package:fanous/features/order_history/presentation/widgets/order_details_page_widgets/product_details_section.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../product_details/presentaion/widgets/seller_info_card.dart';
class OrderDetailsPage extends StatelessWidget {
  const OrderDetailsPage({super.key});
  @override
  Widget build(BuildContext context) {
    // ... داخل build في صفحة التفاصيل
    final dummyOrderDetails = OrderDetailsEntity(
      title: 'Premium Wireless Headphones',
      price: 150.00,
      description:
      'Experience immersive sound quality with premium wireless headphones featuring active noise cancellation.',
      images: const [
        'https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg',
        'https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg',
      ],
      details: const [
        OrderProductDetailItem(title: 'Brand', value: 'Vivo'),
        OrderProductDetailItem(title: 'Model', value: 'S1'),
        OrderProductDetailItem(title: 'Condition', value: 'New'),
        OrderProductDetailItem(title: 'PTA Status', value: 'Approved'),
      ],
      seller: const SellerEntity(
        name: 'Aqeel Ahmad',
        imageUrl: 'https://i.pravatar.cc/150',
        activeAds: 2,
        memberSince: '2017',
      ),
    );

    final textTheme= Theme.of(context).textTheme  ;
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppBar(
        surfaceTintColor: Colors.transparent,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Order ', style: textTheme.headlineMedium?.copyWith(color: AppColors.primary)),
            Text('Details', style: textTheme.headlineMedium?.copyWith(color: AppColors.secondary)),
          ],
        ),
        backgroundColor: AppColors.backgroundLight,
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Column(
          spacing:  8.h,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Product Info', style: textTheme.titleLarge?.copyWith(color: AppColors.primaryDark)),
            ProductDetailsSection(order: dummyOrderDetails),
            SellerInfoCard(
              name: dummyOrderDetails.seller.name,
              imageUrl: dummyOrderDetails.seller.imageUrl,
              activeAds: dummyOrderDetails.seller.activeAds,
              memberSince: dummyOrderDetails.seller.memberSince,
              onTap: () {},
            ),
            SizedBox(
              width: double.infinity,
              child: TextButton(
                onPressed: () {},
                child: Text('Need help with this order?',style: textTheme.titleSmall?.copyWith(color: AppColors.secondary),),
              ),
            ),

          ],
        ),
      ),
    );
  }


}