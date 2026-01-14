import 'package:fanous/features/product_details/presentaion/pages/product_details_page.dart';
import 'package:flutter/material.dart';
import 'section_header.dart';
import 'package:fanous/core/widgets/product_card.dart';
import '../../../../../domain/entities/product_entity.dart';

class ProductsSectionWidget extends StatelessWidget {
  final String title;
  final bool showSeeAll;
  final List<ProductEntity> products;
  final VoidCallback? onSeeAllTap;
  const ProductsSectionWidget({
    super.key,
    required this.title,
    required this.products,
    this.showSeeAll = false,
    this.onSeeAllTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: title,
          showSeeAll: showSeeAll,
          onSeeAllTap: onSeeAllTap,
        ),
        SizedBox(
          height: 320,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.only(left: 16.0),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return ProductCard(
                imageUrl: product.imageUrls.isNotEmpty
                    ? product.imageUrls.first
                    : null,
                price: product.price,
                title: product.title,
                details: product.details,
                location: product.location,
                timeAgo: product.timeAgo,
                isForSale: product.isForSale,
                isFeatured: product.isFeatured,
                width: 240,
                margin: const EdgeInsets.only(right: 12.0),
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => ProductDetailsPage()),
                  );
                },
              );
            },
          ),
        ),
      ],
    );
  }
}
