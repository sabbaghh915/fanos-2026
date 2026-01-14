import 'package:flutter/material.dart';
import '../../../../../domain/entities/product_entity.dart';
import 'products_list.dart';

class ProductsSection extends StatelessWidget {
  final List<ProductEntity> products;
  final Function(ProductEntity) onProductTap;

  const ProductsSection({
    super.key,
    required this.products,
    required this.onProductTap,
  });

  @override
  Widget build(BuildContext context) {
    return ProductsList(
      products: products,
      onProductTap: onProductTap,
    );
  }
}

