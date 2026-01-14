import 'package:fanous/features/home/presentation/bloc/home_bloc/home_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fanous/core/theme/app_colors.dart';

class TopNavigationBar extends StatelessWidget {
  final TabType selectedTab;
  final Function(TabType) onTabChanged;

  const TopNavigationBar({
    super.key,
    required this.selectedTab,
    required this.onTabChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.backgroundLight,
      padding: const EdgeInsets.only(left: 16.0, right: 16.0, top: 16.0),
      child: Column(
        children: [
          AppBarButton(selectedTab: selectedTab, onTabChanged: onTabChanged),
        ],
      ),
    );
  }
}

class AppBarButton extends StatelessWidget {
  final TabType selectedTab;
  final Function(TabType) onTabChanged;

  const AppBarButton({
    super.key,
    required this.selectedTab,
    required this.onTabChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _buildButton(
          svgUrl:
              'https://raw.githubusercontent.com/feathericons/feather/master/icons/home.svg',
          label: 'Property',
          iconColor: AppColors.primary,
          tabType: TabType.property,
        ),
        const SizedBox(width: 12),
        _buildButton(
          svgUrl:
              'https://raw.githubusercontent.com/feathericons/feather/master/icons/truck.svg',
          label: 'Motors',
          iconColor: AppColors.tertiary,
          tabType: TabType.motors,
        ),
        const SizedBox(width: 12),
        _buildButton(
          svgUrl:
              'https://raw.githubusercontent.com/feathericons/feather/master/icons/shopping-bag.svg',
          label: 'Fanos',
          iconColor: AppColors.secondary,
          tabType: TabType.electronics,
        ),
      ],
    );
  }

  Widget _buildButton({
    required String svgUrl,
    required String label,
    Color? iconColor,
    required TabType tabType,
  }) {
    final isSelected = selectedTab == tabType;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          onTabChanged(tabType);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          decoration: BoxDecoration(
            color: isSelected
                ? AppColors.surfaceLight
                : AppColors.surfaceVariantLight,
            borderRadius: BorderRadius.circular(8),
            border: isSelected
                ? Border.all(color: iconColor ?? AppColors.primary, width: 1.5)
                : null,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              SvgPicture.network(
                svgUrl,
                width: 25,
                height: 25,
                colorFilter: iconColor != null
                    ? ColorFilter.mode(iconColor, BlendMode.srcIn)
                    : null,
                placeholderBuilder: (context) => SizedBox(
                  width: 25,
                  height: 25,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: iconColor ?? AppColors.textTertiaryLight,
                  ),
                ),
              ),
              const SizedBox(height: 6),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.textPrimaryLight,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

