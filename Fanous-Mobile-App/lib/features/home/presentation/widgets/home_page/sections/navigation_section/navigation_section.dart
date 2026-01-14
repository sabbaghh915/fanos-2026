import 'package:flutter/material.dart';
import 'package:fanous/core/theme/app_colors.dart';
import '../../../../bloc/home_bloc/home_event.dart';
import 'top_navigation_bar.dart';

class NavigationSection extends StatelessWidget {
  final TabType selectedTab;
  final Function(TabType) onTabChanged;

  const NavigationSection({
    super.key,
    required this.selectedTab,
    required this.onTabChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      backgroundColor: AppColors.backgroundLight,
      expandedHeight: 92.0,
      flexibleSpace: FlexibleSpaceBar(
        background: Padding(
          padding: const EdgeInsets.only(
            left: 16.0,
            right: 16.0,
            top: 16.0,
          ),
          child: AppBarButton(
            selectedTab: selectedTab,
            onTabChanged: onTabChanged,
          ),
        ),
      ),
    );
  }
}

