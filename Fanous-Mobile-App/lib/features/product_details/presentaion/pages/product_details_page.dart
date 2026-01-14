import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';
import '../widgets/product_image_header.dart';
import '../widgets/product_price_section.dart';
import '../widgets/product_details_card.dart';
import '../widgets/product_description_card.dart';
import '../widgets/product_bottom_actions.dart';
import '../widgets/section_title.dart';
import '../widgets/seller_info_card.dart';

class ProductDetailsPage extends StatelessWidget {
  const ProductDetailsPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryContainer,
      body: Column(
        children: [
          ProductImageSlider(
            images: const [
              'https://plus.unsplash.com/premium_photo-1661769021743-7139c6fc4ab9',
              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            ],
          ),

          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ProductPriceSection(
                    price: 102222222220222222.40,
                    title: 'Vivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLED Vivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLEDVivo S1 (8GB - 256GB) Super AMOLED',
                    location: 'Saddar, Rawalpindi',
                    timeAgo: '17h ago',
                    onFavoriteTap: () {
                      // add to favorites
                    },
                    onShareTap: () {
                      // share product
                    },
                  ),
                  const SectionTitle(title: 'Details'),
                  ProductDetailsCard(
                    details: const [
                      ProductDetailItem(title: 'Brand', value: 'Vivo'),
                      ProductDetailItem(title: 'Model', value: 'S1'),
                      ProductDetailItem(title: 'Condition', value: 'New'),
                      ProductDetailItem(title: 'PTA Status', value: 'Approved'),
                    ],
                  ),

                  const SectionTitle(title: 'Description'),
                  const ProductDescriptionCard(description: 'Vivo S1 PTA Approved Dual SIM (Nano-SIM, dual stand-by). Excellent conditionVivo S1 PTA Approved Dual SIM (Nano-SIM, dual stand-by). Excellent conditionVivo S1 PTA Approved Dual SIM (Nano-SIM, dual stand-by). Excellent conditionVivo S1 PTA Approved Dual SIM (Nano-SIM, dual stand-by). Excellent condition.',),
                  const SectionTitle(title: 'Seller'),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8.w),
                    child: SellerInfoCard(
                      name: 'Aqeel Ahmad',
                      imageUrl: 'https://i.pravatar.cc/150',
                      activeAds: 2,
                      memberSince: '2017',
                      onTap: (){},
                    ),
                  ),
                  SizedBox(height: 10.h),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar:  ProductBottomActions(onTapChat: () {  },onTapBuyNow: () {  },),
    );
  }
}
