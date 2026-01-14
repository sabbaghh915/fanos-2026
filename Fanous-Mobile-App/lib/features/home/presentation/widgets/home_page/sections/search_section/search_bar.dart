import 'package:flutter/material.dart';
import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/widgets/input_field_widget.dart';

import '../../../../../../wish_list/presentation/pages/wish_list_page.dart';

class CustomSearchBar extends StatelessWidget {
  const CustomSearchBar({super.key, required this.withFavIcon});
  final bool withFavIcon;

  @override
  Widget build(BuildContext context) {
    return Row(
      textDirection: TextDirection.ltr,
      children: [
        if (withFavIcon) const FavIconWidget(),
        const SizedBox(width: 6.0),
        const InputFieldWidget(),
      ],
    );
  }
}

class FavIconWidget extends StatelessWidget {
  const FavIconWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => WishListPage(),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.all(0),
        margin: const EdgeInsets.only(right: 6.0),
        decoration: BoxDecoration(
          color: colorScheme.surfaceVariant,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Icon(
            Icons.favorite_border,
            color: AppColors.primary,
            size: 24,
          ),
        ),
      ),
    );
  }
}

