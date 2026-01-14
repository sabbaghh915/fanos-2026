import 'package:flutter/material.dart';

class ResultsInfoText extends StatelessWidget {
  final String category;
  final int count;

  const ResultsInfoText({
    super.key,
    required this.category,
    required this.count,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Text(
        'Results for $category. :Showing $count',
        style: theme.textTheme.bodyMedium?.copyWith(
          color: colorScheme.onSurface.withOpacity(0.7),
        ),
        textAlign: TextAlign.left,
      ),
    );
  }
}

