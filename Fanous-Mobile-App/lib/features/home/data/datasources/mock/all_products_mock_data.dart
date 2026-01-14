/// Mock data for All Products feature
/// This file contains all mock data in JSON format that mimics real server responses
class AllProductsMockData {
  /// Get products JSON by category ID
  /// Returns JSON format: { "products": [...] }
  /// Note: Currently uses ID as title for mapping (until real IDs are added)
  static Map<String, dynamic> getAllProductsJson(String categoryId) {
    // Map of category IDs/titles to product JSON lists
    // TODO: Replace with actual category IDs when available
    final categoryMap = {
      'Property for Sale': _propertyProductsJson,
      'Property for Rent': _propertyProductsJson,
      'Featured Properties': _propertyProductsJson,
      'All Cars': _carProductsJson,
      'Mobile Phones': _electronicsProductsJson,
      'Laptops & Computers': _electronicsProductsJson,
    };

    // Try to find exact match first
    if (categoryMap.containsKey(categoryId)) {
      return {'products': categoryMap[categoryId]!};
    }

    // Fallback: try to match by keywords
    final lowerId = categoryId.toLowerCase();
    if (lowerId.contains('property') || 
        lowerId.contains('sale') || 
        lowerId.contains('rent')) {
      return {'products': _propertyProductsJson};
    } else if (lowerId.contains('car') || 
               lowerId.contains('motor') || 
               lowerId.contains('vehicle')) {
      return {'products': _carProductsJson};
    } else if (lowerId.contains('phone') || 
               lowerId.contains('laptop') || 
               lowerId.contains('electronics') ||
               lowerId.contains('mobile')) {
      return {'products': _electronicsProductsJson};
    }

    // Default: return empty list if no match
    return {'products': []};
  }

  // Property Products JSON
  static List<Map<String, dynamic>> get _propertyProductsJson {
    final now = DateTime.now();
    return [
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
      ],
      'price': 'Rs 95 Lacs',
      'priceValue': 9500000,
      'title': 'Saima Green valley 120 sq yar...',
      'category': 'Property for Sale',
      'details': '120 sqyd • 3 beds • 2 baths',
      'location': 'Saima Green Valley, Karachi',
      'timeAgo': '3 days ago',
      'createdAt': now.subtract(const Duration(days: 3)).toIso8601String(),
      'isFeatured': true,
      'isForSale': true,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
        'https://images.unsplash.com/photo-1600585154084-4e0fef31e0f5?w=400',
      ],
      'price': 'Rs 2.57 Lacs',
      'priceValue': 257000,
      'title': 'Modern Villa with Garden',
      'category': 'Property for Rent',
      'details': '5 Beds • 4 Baths • 250 sqyd',
      'location': 'Gulberg 2, Lahore',
      'timeAgo': '1 day ago',
      'createdAt': now.subtract(const Duration(days: 1)).toIso8601String(),
      'isFeatured': true,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      ],
      'price': 'Rs 1.2 Lacs',
      'priceValue': 120000,
      'title': 'Luxury Apartment',
      'category': 'Property for Sale',
      'details': '3 Beds • 2 Baths • 120 sqyd',
      'location': 'Faisalabad',
      'timeAgo': '5 days ago',
      'createdAt': now.subtract(const Duration(days: 5)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
      ],
      'price': 'Rs 45,000',
      'priceValue': 45000,
      'title': 'Cozy Family Home',
      'category': 'Property for Rent',
      'details': '4 Beds • 3 Baths • 180 sqyd',
      'location': 'Multan',
      'timeAgo': '2 weeks ago',
      'createdAt': now.subtract(const Duration(days: 14)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        'https://images.unsplash.com/photo-1600585154084-4e0fef31e0f5?w=400',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
      ],
      'price': 'Rs 1.8 Lacs',
      'priceValue': 180000,
      'title': 'Spacious House',
      'category': 'Property for Sale',
      'details': '6 Beds • 5 Baths • 300 sqyd',
      'location': 'DHA Phase 5, Karachi',
      'timeAgo': '1 week ago',
      'createdAt': now.subtract(const Duration(days: 7)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    ];
  }

  // Car Products JSON
  static List<Map<String, dynamic>> get _carProductsJson {
    final now = DateTime.now();
    return [
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      ],
      'price': 'Rs 45 Lacs',
      'priceValue': 4500000,
      'title': 'Audi A4 2023',
      'category': 'Vehicles',
      'details': 'Automatic • 2.0L • 15,000 km',
      'location': 'Karachi',
      'timeAgo': '1 day ago',
      'createdAt': now.subtract(const Duration(days: 1)).toIso8601String(),
      'isFeatured': true,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      ],
      'price': 'Rs 35 Lacs',
      'priceValue': 3500000,
      'title': 'Chevrolet Camaro 2022',
      'category': 'Vehicles',
      'details': 'Manual • 3.6L • 20,000 km',
      'location': 'Lahore',
      'timeAgo': '2 days ago',
      'createdAt': now.subtract(const Duration(days: 2)).toIso8601String(),
      'isFeatured': true,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
      ],
      'price': 'Rs 55 Lacs',
      'priceValue': 5500000,
      'title': 'BMW 5 Series 2023',
      'category': 'Vehicles',
      'details': 'Automatic • 2.0L • 10,000 km',
      'location': 'Islamabad',
      'timeAgo': '3 days ago',
      'createdAt': now.subtract(const Duration(days: 3)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      ],
      'price': 'Rs 25 Lacs',
      'priceValue': 2500000,
      'title': 'Toyota Camry 2022',
      'category': 'Vehicles',
      'details': 'Automatic • 2.5L • 25,000 km',
      'location': 'Faisalabad',
      'timeAgo': '5 days ago',
      'createdAt': now.subtract(const Duration(days: 5)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
      ],
      'price': 'Rs 18 Lacs',
      'priceValue': 1800000,
      'title': 'Honda Civic 2021',
      'category': 'Vehicles',
      'details': 'Manual • 1.5L • 30,000 km',
      'location': 'Multan',
      'timeAgo': '1 week ago',
      'createdAt': now.subtract(const Duration(days: 7)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    ];
  }

  // Electronics Products JSON
  static List<Map<String, dynamic>> get _electronicsProductsJson {
    final now = DateTime.now();
    return [
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      ],
      'price': 'Rs 85,000',
      'priceValue': 85000,
      'title': 'iPhone 14 Pro Max',
      'category': 'Mobiles',
      'details': '256GB • Space Black • Brand New',
      'location': 'Karachi',
      'timeAgo': '2 hours ago',
      'createdAt': now.subtract(const Duration(hours: 2)).toIso8601String(),
      'isFeatured': true,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      ],
      'price': 'Rs 120,000',
      'priceValue': 120000,
      'title': 'MacBook Pro M2',
      'category': 'Electronics',
      'details': '13 inch • 512GB • Space Gray',
      'location': 'Lahore',
      'timeAgo': '1 day ago',
      'createdAt': now.subtract(const Duration(days: 1)).toIso8601String(),
      'isFeatured': true,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      ],
      'price': 'Rs 45,000',
      'priceValue': 45000,
      'title': 'Samsung 55" 4K TV',
      'category': 'Electronics',
      'details': 'Smart TV • HDR • Like New',
      'location': 'Islamabad',
      'timeAgo': '2 days ago',
      'createdAt': now.subtract(const Duration(days: 2)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      ],
      'price': 'Rs 25,000',
      'priceValue': 25000,
      'title': 'Sony WH-1000XM4',
      'category': 'Electronics',
      'details': 'Noise Cancelling • Wireless',
      'location': 'Faisalabad',
      'timeAgo': '3 days ago',
      'createdAt': now.subtract(const Duration(days: 3)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    {
      'imageUrls': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      ],
      'price': 'Rs 35,000',
      'priceValue': 35000,
      'title': 'Apple Watch Series 8',
      'category': 'Electronics',
      'details': 'GPS • 45mm • Midnight',
      'location': 'Multan',
      'timeAgo': '1 week ago',
      'createdAt': now.subtract(const Duration(days: 7)).toIso8601String(),
      'isFeatured': false,
      'isForSale': false,
    },
    ];
  }
}
