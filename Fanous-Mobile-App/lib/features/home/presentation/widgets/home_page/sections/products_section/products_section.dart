import 'package:flutter/material.dart';
import 'products_section_widget.dart';
import '../../../../../domain/entities/product_section_data.dart';

class ProductsSection extends StatelessWidget {
  final ProductSectionData section;
  final VoidCallback? onSeeAllTap;

  const ProductsSection({
    super.key,
    required this.section,
    this.onSeeAllTap,
  });

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: const EdgeInsets.only(bottom: 20.0),
      sliver: SliverToBoxAdapter(
        child: ProductsSectionWidget(
          title: section.title,
          products: section.products,
          showSeeAll: section.showSeeAll,
          onSeeAllTap: onSeeAllTap,
        ),
      ),
    );
  }
}

