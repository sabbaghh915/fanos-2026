import 'package:flutter/material.dart';
import 'results_info_text.dart';

class ResultsInfoSection extends StatelessWidget {
  final String categoryTitle;
  final int productsCount;

  const ResultsInfoSection({
    super.key,
    required this.categoryTitle,
    required this.productsCount,
  });

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: ResultsInfoText(
        category: categoryTitle,
        count: productsCount,
      ),
    );
  }
}

