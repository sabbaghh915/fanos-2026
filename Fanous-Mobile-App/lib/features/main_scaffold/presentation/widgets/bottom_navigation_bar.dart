import 'package:flutter/material.dart';
import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomBottomNavigationBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const CustomBottomNavigationBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        height: 70,
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.cardLight,
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.08),
              blurRadius: 10,
              offset: const Offset(0, 2),
              spreadRadius: 0,
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [ 
            _buildNavItem(
              iconUnselected: Icons.person_outline_rounded,
              iconSelected: Icons.person_rounded,
              label: 'Account',
              index: 4,
            ),
            _buildNavItem(
              iconUnselected: Icons.chat_bubble_outline_rounded,
              iconSelected: Icons.chat_bubble_rounded,
              label: 'Chats',
              index: 3,
            ),
            _buildCenterButton(index: 2),
            _buildNavItem(
              iconUnselected: Icons.inventory_2_outlined,
              iconSelected: Icons.inventory_2,
              label: 'My Ads',
              index: 1,
            ),
             _buildNavItem(
              iconUnselected: Icons.home_outlined,
              iconSelected: Icons.home_rounded,
              label: 'Home',
              index: 0,
            ),
           
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required IconData iconUnselected,
    required IconData iconSelected,
    required String label,
    required int index,
  }) {
    final isSelected = currentIndex == index;

    return Expanded(
      child: GestureDetector(
        onTap: () => onTap(index),
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeInOut,
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppColors.primary.withValues(alpha: 0.15)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  isSelected ? iconSelected : iconUnselected,
                  color: isSelected
                      ? AppColors.primary
                      : AppColors.textTertiaryLight,
                  size: 24,
                ),
              ),
              const SizedBox(height: 4),
              AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: 200),
                style: TextStyle(
                  color: isSelected
                      ? AppColors.primary
                      : AppColors.textTertiaryLight,
                  fontSize: 10,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                ),
                child: Text(label),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCenterButton({required int index}) {
    final isSelected = currentIndex == index;

    return Expanded(
      child: GestureDetector(
        onTap: () => onTap(index),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeInOut,
              width: 40.w ,
              height: 40.h,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: isSelected
                    ? AppColors.primaryGradient
                    : null,
                color: isSelected ? null : AppColors.surfaceVariantLight,
                border: Border.all(
                  color: isSelected
                      ? Colors.transparent
                      : AppColors.primary.withValues(alpha: 0.3),
                  width: 2.5,
                ),
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: AppColors.primary.withValues(alpha: 0.4),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                          spreadRadius: 0,
                        ),
                      ]
                    : null,
              ),
              child: Icon(
                Icons.add_rounded,
                color: AppColors.primary,
                size: 28,
                weight: 700,
              ),
            ),
            const SizedBox(height: 4),
            AnimatedDefaultTextStyle(
              duration: const Duration(milliseconds: 200),
              style: TextStyle(
                color: isSelected
                    ? AppColors.primary
                    : AppColors.textTertiaryLight,
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
              child: const Text('Sell'),
            ),
          ],
        ),
      ),
    );
  }
}

