import 'package:fanous/core/widgets/input_field_widget.dart';
import 'package:flutter/material.dart';

class AllProductsAppBar extends SliverPersistentHeaderDelegate {
  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      color: colorScheme.surface,
      padding: const EdgeInsets.only(
        left: 16.0,
        right: 16.0,
        bottom: 10.0,
        top: 16.0,
      ),
      child: Row(
        textDirection: TextDirection.rtl,
        children: [
          IconButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            icon: Icon(Icons.arrow_back_ios_new, size: 20),
            color: colorScheme.onSurface,
          ),
          const InputFieldWidget(),
        ],
      ),
    );
  }

  @override
  double get maxExtent => 70.0;

  @override
  double get minExtent => 70.0;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) =>
      false;
}
