class WishlistEntity {
  final String title;
  final double price;
  final String location;
  final String timeAgo;
  final String imageUrl;
  final bool isFeatured;

  WishlistEntity({
    required this.title,
    required this.price,
    required this.location,
    required this.timeAgo,
    required this.imageUrl,
    this.isFeatured = false,
  });
}
