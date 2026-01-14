class OrderDetailsEntity {
  final String title;
  final double price;
  final String description;
  final List<String> images;
  final List<OrderProductDetailItem> details;
  final SellerEntity seller;

  const OrderDetailsEntity({
    required this.title,
    required this.price,
    required this.description,
    required this.images,
    required this.details,
    required this.seller,

  });
}

class OrderProductDetailItem {
  final String title;
  final String value;

  const OrderProductDetailItem({
    required this.title,
    required this.value,
  });
}
class SellerEntity {
  final String name;
  final String imageUrl;
  final int activeAds;
  final String memberSince;

  const SellerEntity({
    required this.name,
    required this.imageUrl,
    required this.activeAds,
    required this.memberSince,
  });
}
