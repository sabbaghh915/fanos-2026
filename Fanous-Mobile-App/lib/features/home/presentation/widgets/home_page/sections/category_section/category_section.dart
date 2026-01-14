import 'package:flutter/material.dart';
import 'category_grid.dart';
import '../../../../../domain/entities/category_entity.dart';

class CategorySection extends StatelessWidget {
  final List<CategoryEntity> categories;

  const CategorySection({
    super.key,
    required this.categories,
  });

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: CategoryGrid(categories: categories),
    );
  }
}

