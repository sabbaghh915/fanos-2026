import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import '../../../../core/theme/app_colors.dart';

class ProductImageSlider extends StatefulWidget {
  final List<String> images;

  const ProductImageSlider({
    super.key,
    required this.images,
  });
  @override
  State<ProductImageSlider> createState() => _ProductImageSliderState();
}
class _ProductImageSliderState extends State<ProductImageSlider> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        /// IMAGE SLIDER
        SizedBox(
          height: 260.h,
          width: double.infinity,
          child: PageView.builder(
            itemCount: widget.images.length,
            onPageChanged: (index) {
              setState(() => _currentIndex = index);
            },
            itemBuilder: (context, index) {
              return Image.network(
                widget.images[index],
                fit: BoxFit.cover,
              );
            },
          ),
        ),

        /// BACK BUTTON
        Positioned(
          top: 40.h,
          left: 8.w,
          child: _circleButton(
            icon: Icons.arrow_back,
            onTap: () => Navigator.pop(context),
          ),
        ),

        /// INDICATORS
        Positioned(
          bottom: 12.h,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              widget.images.length,
                  (index) => AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin: EdgeInsets.symmetric(horizontal: 4.w),
                width: _currentIndex == index ? 16.w : 6.w,
                height: 6.h,
                decoration: BoxDecoration(
                  color: _currentIndex == index
                      ? AppColors.primary
                      : Colors.white.withAlpha(150),
                  borderRadius: BorderRadius.circular(6.r),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _circleButton({
    required IconData icon,
    VoidCallback? onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: 36.w,
        height: 36.h,
        decoration: BoxDecoration(
          color: AppColors.surfaceLight,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(60),
              blurRadius: 6,
            ),
          ],
        ),
        child: Icon(
          icon,
          color: AppColors.primary,
          size: AppSpacing.iconSize,
        ),
      ),
    );
  }
}
