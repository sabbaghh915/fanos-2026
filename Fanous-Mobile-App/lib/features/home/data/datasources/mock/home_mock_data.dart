import 'package:flutter/material.dart';

/// Mock data for Home feature
/// This file contains all mock data in JSON format that mimics real server responses
class HomeMockData {
  /// Get categories JSON for a specific tab type
  /// Returns JSON format: { "categories": [...] }
  static Map<String, dynamic> getCategoriesJson(String tabType) {
    switch (tabType) {
      case 'property':
        return {
          'categories': [
            {'icon': Icons.camera_alt.codePoint, 'title': 'Electronics & Home A...'},
            {'icon': Icons.home.codePoint, 'title': 'Property for Rent'},
            {'icon': Icons.business.codePoint, 'title': 'Property for Sale'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Vehicles'},
            {'icon': Icons.smartphone.codePoint, 'title': 'Mobiles'},
            {'icon': Icons.watch.codePoint, 'title': 'Fashion & Beauty'},
            {'icon': Icons.chair.codePoint, 'title': 'Furniture & Home Dec...'},
            {'icon': Icons.pets.codePoint, 'title': 'Animals'},
            {'icon': Icons.work.codePoint, 'title': 'Jobs'},
            {'icon': Icons.build.codePoint, 'title': 'Services'},
          ],
        };
      case 'motors':
        return {
          'categories': [
            {'icon': Icons.directions_car.codePoint, 'title': 'Audi'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Camaro'},
            {'icon': Icons.directions_car.codePoint, 'title': 'BMW'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Toyota'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Honda'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Mercedes'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Ford'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Nissan'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Hyundai'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Suzuki'},
          ],
        };
      case 'electronics':
        return {
          'categories': [
            {'icon': Icons.smartphone.codePoint, 'title': 'Mobile Phones'},
            {'icon': Icons.laptop.codePoint, 'title': 'Laptops'},
            {'icon': Icons.tv.codePoint, 'title': 'TV & Audio'},
            {'icon': Icons.headphones.codePoint, 'title': 'Headphones'},
            {'icon': Icons.watch.codePoint, 'title': 'Smart Watches'},
            {'icon': Icons.camera_alt.codePoint, 'title': 'Cameras'},
            {'icon': Icons.gamepad.codePoint, 'title': 'Gaming'},
            {'icon': Icons.tablet.codePoint, 'title': 'Tablets'},
            {'icon': Icons.speaker.codePoint, 'title': 'Speakers'},
            {'icon': Icons.memory.codePoint, 'title': 'Accessories'},
          ],
        };
      default:
        return {
          'categories': [
            {'icon': Icons.camera_alt.codePoint, 'title': 'Electronics & Home A...'},
            {'icon': Icons.home.codePoint, 'title': 'Property for Rent'},
            {'icon': Icons.business.codePoint, 'title': 'Property for Sale'},
            {'icon': Icons.directions_car.codePoint, 'title': 'Vehicles'},
            {'icon': Icons.smartphone.codePoint, 'title': 'Mobiles'},
            {'icon': Icons.watch.codePoint, 'title': 'Fashion & Beauty'},
            {'icon': Icons.chair.codePoint, 'title': 'Furniture & Home Dec...'},
            {'icon': Icons.pets.codePoint, 'title': 'Animals'},
            {'icon': Icons.work.codePoint, 'title': 'Jobs'},
            {'icon': Icons.build.codePoint, 'title': 'Services'},
          ],
        };
    }
  }

  /// Get product sections JSON for a specific tab type
  /// Returns JSON format: { "sections": [...] }
  static Map<String, dynamic> getProductSectionsJson(String tabType) {
    switch (tabType) {
      case 'property':
        return {
          'sections': [
            {
              'title': 'Property for Sale',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
                  'price': 'Rs 95 Lacs',
                  'priceValue': 9500000,
                  'title': 'Saima Green valley 120 sq yar...',
                  'details': '120 sqyd • 3 beds • 2 baths',
                  'location': 'Saima Green Valley, Karachi',
                  'timeAgo': '3 days ago',
                  'isFeatured': true,
                  'isForSale': true,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
                  'price': 'Rs 2.57 Lacs',
                  'priceValue': 257000,
                  'title': 'Modern Villa with Garden',
                  'details': '5 Beds • 4 Baths • 250 sqyd',
                  'location': 'Gulberg 2, Lahore',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
                  'price': 'Rs 1.2 Lacs',
                  'priceValue': 120000,
                  'title': 'Luxury Apartment',
                  'details': '3 Beds • 2 Baths • 120 sqyd',
                  'location': 'Faisalabad',
                  'timeAgo': '5 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
              ],
              'showSeeAll': true,
            },
            {
              'title': 'Property for Rent',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
                  'price': 'Rs 2.57 Lacs',
                  'priceValue': 257000,
                  'title': 'Modern Villa with Garden',
                  'details': '5 Beds • 4 Baths • 250 sqyd',
                  'location': 'Gulberg 2, Lahore',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
                  'price': 'Rs 1.2 Lacs',
                  'priceValue': 120000,
                  'title': 'Luxury Apartment',
                  'details': '3 Beds • 2 Baths • 120 sqyd',
                  'location': 'Faisalabad',
                  'timeAgo': '5 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
                  'price': 'Rs 45,000',
                  'priceValue': 45000,
                  'title': 'Cozy Family Home',
                  'details': '4 Beds • 3 Baths • 180 sqyd',
                  'location': 'Multan',
                  'timeAgo': '2 weeks ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
              ],
              'showSeeAll': true,
            },
            {
              'title': 'Featured Properties',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
                  'price': 'Rs 95 Lacs',
                  'priceValue': 9500000,
                  'title': 'Saima Green valley 120 sq yar...',
                  'details': '120 sqyd • 3 beds • 2 baths',
                  'location': 'Saima Green Valley, Karachi',
                  'timeAgo': '3 days ago',
                  'isFeatured': true,
                  'isForSale': true,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
                  'price': 'Rs 2.57 Lacs',
                  'priceValue': 257000,
                  'title': 'Modern Villa with Garden',
                  'details': '5 Beds • 4 Baths • 250 sqyd',
                  'location': 'Gulberg 2, Lahore',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
              ],
              'showSeeAll': false,
            },
          ],
        };
      case 'motors':
        return {
          'sections': [
            {
              'title': 'All Cars',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
                  'price': 'Rs 45 Lacs',
                  'priceValue': 4500000,
                  'title': 'Audi A4 2023',
                  'details': 'Automatic • 2.0L • 15,000 km',
                  'location': 'Karachi',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
                  'price': 'Rs 35 Lacs',
                  'priceValue': 3500000,
                  'title': 'Chevrolet Camaro 2022',
                  'details': 'Manual • 3.6L • 20,000 km',
                  'location': 'Lahore',
                  'timeAgo': '2 days ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
                  'price': 'Rs 55 Lacs',
                  'priceValue': 5500000,
                  'title': 'BMW 5 Series 2023',
                  'details': 'Automatic • 2.0L • 10,000 km',
                  'location': 'Islamabad',
                  'timeAgo': '3 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
                  'price': 'Rs 25 Lacs',
                  'priceValue': 2500000,
                  'title': 'Toyota Camry 2022',
                  'details': 'Automatic • 2.5L • 25,000 km',
                  'location': 'Faisalabad',
                  'timeAgo': '5 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
                  'price': 'Rs 18 Lacs',
                  'priceValue': 1800000,
                  'title': 'Honda Civic 2021',
                  'details': 'Manual • 1.5L • 30,000 km',
                  'location': 'Multan',
                  'timeAgo': '1 week ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
              ],
              'showSeeAll': true,
            },
          ],
        };
      case 'electronics':
        return {
          'sections': [
            {
              'title': 'Mobile Phones',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                  'price': 'Rs 85,000',
                  'priceValue': 85000,
                  'title': 'iPhone 14 Pro Max',
                  'details': '256GB • Space Black • Brand New',
                  'location': 'Karachi',
                  'timeAgo': '2 hours ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                  'price': 'Rs 120,000',
                  'priceValue': 120000,
                  'title': 'MacBook Pro M2',
                  'details': '13 inch • 512GB • Space Gray',
                  'location': 'Lahore',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                  'price': 'Rs 45,000',
                  'priceValue': 45000,
                  'title': 'Samsung 55" 4K TV',
                  'details': 'Smart TV • HDR • Like New',
                  'location': 'Islamabad',
                  'timeAgo': '2 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
              ],
              'showSeeAll': true,
            },
            {
              'title': 'Laptops & Computers',
              'products': [
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                  'price': 'Rs 120,000',
                  'priceValue': 120000,
                  'title': 'MacBook Pro M2',
                  'details': '13 inch • 512GB • Space Gray',
                  'location': 'Lahore',
                  'timeAgo': '1 day ago',
                  'isFeatured': true,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                  'price': 'Rs 45,000',
                  'priceValue': 45000,
                  'title': 'Samsung 55" 4K TV',
                  'details': 'Smart TV • HDR • Like New',
                  'location': 'Islamabad',
                  'timeAgo': '2 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
                {
                  'imageUrl': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                  'price': 'Rs 25,000',
                  'priceValue': 25000,
                  'title': 'Sony WH-1000XM4',
                  'details': 'Noise Cancelling • Wireless',
                  'location': 'Faisalabad',
                  'timeAgo': '3 days ago',
                  'isFeatured': false,
                  'isForSale': false,
                },
              ],
              'showSeeAll': true,
            },
          ],
        };
      default:
        return {
          'sections': [],
        };
    }
  }

  /// Get slider images JSON for a specific tab type
  /// Returns JSON format: { "images": [...] }
  static Map<String, dynamic> getSliderImagesJson(String tabType) {
    switch (tabType) {
      case 'property':
        return {
          'images': [
            {'imageUrl': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'},
          ],
        };
      case 'motors':
        return {
          'images': [
            {'imageUrl': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'},
          ],
        };
      case 'electronics':
        return {
          'images': [
            {'imageUrl': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'},
          ],
        };
      default:
        return {
          'images': [
            {'imageUrl': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'},
            {'imageUrl': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'},
          ],
        };
    }
  }
}
