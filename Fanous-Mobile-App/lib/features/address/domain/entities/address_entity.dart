class AddressEntity {
  final String id;
  final String title;
  final String? description;
  final double latitude;
  final double longitude;

  final bool isDefault;
  final DateTime createdAt;

  const AddressEntity({
    required this.id,
    required this.title,
    this.description,
    required this.latitude,
    required this.longitude,

    this.isDefault = false,
    required this.createdAt,
  });
}
