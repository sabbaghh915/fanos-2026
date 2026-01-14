import 'package:flutter/material.dart';
import 'package:fanous/features/home/domain/entities/slider_image_entity.dart';
import 'image_slider.dart';

class ImageSliderSection extends StatelessWidget {
  final List<SliderImageEntity> images;

  const ImageSliderSection({
    super.key,
    required this.images,
  });

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: const EdgeInsets.only(top: 20.0, bottom: 20.0),
      sliver: SliverToBoxAdapter(
        child: ImageSlider(images: images),
      ),
    );
  }
}

