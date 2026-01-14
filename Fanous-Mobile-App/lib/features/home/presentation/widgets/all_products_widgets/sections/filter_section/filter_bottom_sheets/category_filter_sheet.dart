import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';

class CategoryFilterSheet extends StatefulWidget {
  final Function(String?)? onApply;
  final List<String>? availableCategories;

  const CategoryFilterSheet({
    super.key,
    this.onApply,
    this.availableCategories,
  });

  @override
  State<CategoryFilterSheet> createState() => _CategoryFilterSheetState();
}

class _CategoryFilterSheetState extends State<CategoryFilterSheet> {
  String? selectedCategory;
  String _searchQuery = '';

  // -- Data Lists --
  final List<String> _popularCategories = [
    'Vehicles',
    'Electronics',
    'Property for Sale',
    'Property for Rent',
    'Mobiles',
  ];

  final List<String> _otherCategories = [
    'Fashion & Beauty',
    'Furniture & Home Dec',
    'Animals',
    'Jobs',
    'Services',
  ];

  // -- Getters for filtered lists --
  List<String> get _filteredPopularCategories {
    if (_searchQuery.isEmpty) return _popularCategories;
    return _popularCategories
        .where((category) => category.toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();
  }

  List<String> get _filteredOtherCategories {
    if (_searchQuery.isEmpty) return _otherCategories;
    return _otherCategories
        .where((category) => category.toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();
  }

  void _onCategoryTap(String category) {
    setState(() => selectedCategory = selectedCategory == category ? null : category);
  }

  Widget _buildCategoryItem(String category, BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final bool isSelected = selectedCategory == category;

    return ListTile(
      onTap: () => _onCategoryTap(category),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 0),
      tileColor:
          isSelected ? AppColors.primary.withAlpha(50) : Colors.transparent,
      title: Text(
        category,
        style: theme.textTheme.bodyLarge?.copyWith(
          color: colorScheme.onSurface,
          fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
        ),
      ),
      leading: Container(
        width: 25,
        height: 25,
        decoration: BoxDecoration(
          color: colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: Text(
            category.substring(0, 1),
            style: TextStyle(
              color: colorScheme.onSurface,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
      trailing: isSelected
          ? Icon(Icons.check, color: AppColors.secondary)
          : null,
      shape: Border(
        bottom: BorderSide(
          color: colorScheme.outline.withValues(alpha: 0.2),
          width: 0.5,
        ),
      ),
    );
  }


  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Category',
            style: theme.textTheme.titleLarge?.copyWith(
              color: AppColors.secondary,
              fontWeight: FontWeight.bold,
            ),
          ),
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(Icons.close, color: AppColors.secondary),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Container(
        decoration: BoxDecoration(
          color: colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(8),
        ),
        child: TextField(
          style: TextStyle(color: colorScheme.onSurface),
          decoration: InputDecoration(
            hintText: 'Search',
            hintStyle: TextStyle(color: colorScheme.onSurface.withValues(alpha: 0.5)),
            prefixIcon: Icon(Icons.search, color: colorScheme.onSurface.withValues(alpha: 0.7)),
            border: InputBorder.none,
            filled: true,
            fillColor: theme.cardColor,
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
          onChanged: (value) => setState(() => _searchQuery = value),
        ),
      ),
    );
  }

  Widget _buildCategoriesSection(String title, List<String> categories, BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    if (categories.isEmpty) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: title == 'Popular'
              ? const EdgeInsets.fromLTRB(16, 16, 16, 8)
              : const EdgeInsets.fromLTRB(16, 16, 16, 16),
          child: Text(
            title,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: colorScheme.onSurface.withValues(alpha: 0.7),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        ...categories.map((category) => _buildCategoryItem(category, context)),
      ],
    );
  }

  Widget _buildCategoriesList(BuildContext context) {
    return Expanded(
      child: ListView(
        children: [
          _buildCategoriesSection('Popular', _filteredPopularCategories, context),
          _buildCategoriesSection('Others', _filteredOtherCategories, context),
        ],
      ),
    );
  }

  Widget _buildConfirmButton(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.cardColor,
        border: Border(
          top: BorderSide(
            color: colorScheme.outline.withValues(alpha: 0.2),
            width: 0.5,
          ),
        ),
      ),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          onPressed: () {
            widget.onApply?.call(selectedCategory);
            Navigator.pop(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: colorScheme.surfaceContainerHighest,
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text(
            'Confirm',
            style: theme.textTheme.titleMedium?.copyWith(
              color: colorScheme.onSurface,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final theme = Theme.of(context);

    return Container(
      height: screenHeight * 0.9,
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHeader(context),
          _buildSearchBar(context),
          _buildCategoriesList(context),
          _buildConfirmButton(context),
        ],
      ),
    );
  }
}
