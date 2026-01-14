import 'package:flutter/material.dart';
import 'package:fanous/core/theme/app_colors.dart';
import 'search_bar.dart';

class SearchSection extends StatelessWidget {
  const SearchSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPersistentHeader(
      pinned: true,
      delegate: _SearchBarDelegate(),
    );
  }
}

class _SearchBarDelegate extends SliverPersistentHeaderDelegate {
  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Container(
      color: AppColors.backgroundLight,
      padding: const EdgeInsets.only(
        left: 16.0,
        right: 16.0,
        bottom: 10.0,
        top: 16.0,
      ),
      child: const CustomSearchBar(withFavIcon: true,),
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

