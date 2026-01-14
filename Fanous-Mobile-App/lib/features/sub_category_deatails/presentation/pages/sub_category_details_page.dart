import 'package:flutter/material.dart';
import '../widgets/sub_category_details_widget.dart';

class SubCategoryDetailsPage extends StatelessWidget {
  const SubCategoryDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Example data - سيتم استبدالها بالبيانات الفعلية من BLoC لاحقاً
    final filters = ['Date Posted', 'Category', 'Price'];
    final products = [
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'price': '500 \$',
        'title': 'Product 1',
        'details': 'Product details here',
        'location': 'Location 1',
        'timeAgo': '2 days ago',
        'isForSale': true,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '750 \$',
        'title': 'Product 2',
        'details': 'Product details here',
        'location': 'Location 2',
        'timeAgo': '1 day ago',
        'isForSale': true,
        'isFeatured': true,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
      {
        'imageUrl':
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'price': '300 \$',
        'title': 'Product 3',
        'details': 'Product details here',
        'location': 'Location 3',
        'timeAgo': '3 days ago',
        'isForSale': false,
        'isFeatured': false,
      },
    ];

    return Scaffold(
      body: SubCategoryDetailsWidget(
        filters: filters,
        products: products,
        onSearchChanged: (query) {
          // TODO: Handle search
        },
        onFilterTap: (filter) {
          // TODO: Handle filter tap
        },
        onProductTap: (product) {
          // TODO: Navigate to product details
        },
      ),
    );
  }
}
