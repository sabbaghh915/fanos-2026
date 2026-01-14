import 'package:flutter/material.dart';
import '../../../../../domain/entities/product_entity.dart';
import 'product_vertical_card.dart';

class ProductsList extends StatelessWidget {
  final List<ProductEntity> products;
  final Function(ProductEntity)? onProductTap;

  const ProductsList({
    super.key,
    required this.products,
    this.onProductTap,
  });

  @override
  Widget build(BuildContext context) {
    if (products.isEmpty) {
      final theme = Theme.of(context);
      final colorScheme = theme.colorScheme;
      
      return SliverToBoxAdapter(
        child: Container(
          padding: const EdgeInsets.all(32.0),
          child: Center(
            child: Column(
              children: [
                Icon(
                  Icons.inbox_outlined,
                  size: 64.0,
                  color: colorScheme.onSurface.withOpacity(0.5),
                ),
                const SizedBox(height: 16.0),
                Text(
                  'No products found',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: colorScheme.onSurface.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final product = products[index];
            return ProductVerticalCard(
              product: product,
              onTap: () => onProductTap?.call(product),
              imageUrls: product.imageUrls,
            );
          },
          childCount: products.length,
        ),
      ),
    );
  }
}

