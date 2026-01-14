class ProductEntity {
  final List<String> imageUrls;
  final String price; // For display purposes
  final double? priceValue; // For filtering and calculations
  final String title;
  final String? category; // Category for filtering (e.g., "Cars", "Electronics", "Property")
  final String details;
  final String location;
  final String timeAgo; // For display purposes only
  final DateTime? createdAt; // From backend for filtering
  final bool isFeatured;
  final bool isForSale;

  const ProductEntity({
    required this.imageUrls,
    required this.price,
    this.priceValue,
    required this.title,
    this.category,
    required this.details,
    required this.location,
    required this.timeAgo,
    this.createdAt,
    this.isFeatured = false,
    this.isForSale = false,
  });
}



