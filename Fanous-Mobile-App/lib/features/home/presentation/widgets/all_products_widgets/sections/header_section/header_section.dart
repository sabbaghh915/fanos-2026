import 'package:flutter/material.dart';
import 'all_products_app_bar.dart';

class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPersistentHeader(
      pinned: true,
      delegate: AllProductsAppBar(),
    );
  }
}

