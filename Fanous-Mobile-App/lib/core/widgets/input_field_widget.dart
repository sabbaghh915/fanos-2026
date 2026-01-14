import 'package:flutter/material.dart';
import 'package:fanous/core/theme/app_colors.dart';

class InputFieldWidget extends StatelessWidget {
  const InputFieldWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.primaryLight.withAlpha((255 * 0.1).toInt()),
          borderRadius: BorderRadius.circular(8.0),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 12.0),
        child: Row(
          children: [
            Icon(Icons.search, color: AppColors.primaryLight, size: 20),
            const SizedBox(width: 12.0),
            Expanded(
              child: TextField(
                style: TextStyle(color: colorScheme.onSurface, fontSize: 14),
                decoration: InputDecoration(
                  hintText: 'Search for properties',
                  hintStyle: const TextStyle(
                    color: AppColors.primaryLight,
                    fontSize: 14,
                  ),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                  isDense: true,
                  fillColor: Colors.transparent,
                ),
                textDirection: TextDirection.ltr,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
