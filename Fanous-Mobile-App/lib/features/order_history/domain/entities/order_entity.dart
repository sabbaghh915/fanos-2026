enum OrderStatus {
  pending,
  shipped,
  delivered,
  cancelled,
}
class OrderEntity {
  final String id;
  final DateTime date;
  final int itemsCount;
  final double totalAmount;
  final OrderStatus status;
  final List<String> productImages;

  const OrderEntity({
    required this.id,
    required this.date,
    required this.itemsCount,
    required this.totalAmount,
    required this.status,
    required this.productImages,
  });
}

