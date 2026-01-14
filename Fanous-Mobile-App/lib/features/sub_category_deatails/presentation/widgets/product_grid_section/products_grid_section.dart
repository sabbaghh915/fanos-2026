import 'package:fanous/core/widgets/product_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProductsGridSection extends StatelessWidget {
  final List<Map<String, dynamic>> products;
  final Function(Map<String, dynamic>)? onProductTap;

  const ProductsGridSection({
    super.key,
    required this.products,
    this.onProductTap,
  });

  @override
  Widget build(BuildContext context) {
    if (products.isEmpty) {
      return Center(
        child: Text(
          'No products available',
          style: TextStyle(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withAlpha((0.6 * 255).toInt()),
          ),
        ),
      );
    }
    return GridView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16.0.sp, vertical: 4.0.sp),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.55.sp,
        crossAxisSpacing: 12.0.sp,
        mainAxisSpacing: 12.0.sp,
      ),
      itemCount: products.length,
      itemBuilder: (context, index) {
        final product = products[index];
        return ProductCard(
          imageUrl: product['imageUrl'] as String?,
          price: product['price'] as String? ?? '',
          title: product['title'] as String? ?? '',
          details: product['details'] as String? ?? '',
          location: product['location'] as String? ?? '',
          timeAgo: product['timeAgo'] as String? ?? '',
          isForSale: product['isForSale'] as bool? ?? false,
          isFeatured: product['isFeatured'] as bool? ?? false,
          onTap: () => onProductTap?.call(product),
        );
      },
    );
  }
}
