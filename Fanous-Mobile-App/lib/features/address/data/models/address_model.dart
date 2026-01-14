import '../../domain/entities/address_entity.dart';

class AddressModel {
  final String id;
  final String title;
  final String? description;
  final double latitude;
  final double longitude;
  final bool isDefault;
  final DateTime createdAt;

  const AddressModel({
    required this.id,
    required this.title,
    this.description,
    required this.latitude,
    required this.longitude,
    this.isDefault = false,
    required this.createdAt,
  });

  factory AddressModel.fromJson(Map<String, dynamic> json) {
    return AddressModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'],
      latitude: (json['latitude'] ?? 0.0).toDouble(),
      longitude: (json['longitude'] ?? 0.0).toDouble(),
      isDefault: json['isDefault'] ?? false,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'latitude': latitude,
      'longitude': longitude,
      'isDefault': isDefault,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  AddressEntity toEntity() {
    return AddressEntity(
      id: id,
      title: title,
      description: description,
      latitude: latitude,
      longitude: longitude,
      isDefault: isDefault,
      createdAt: createdAt,
    );
  }

  factory AddressModel.fromEntity(AddressEntity entity) {
    return AddressModel(
      id: entity.id,
      title: entity.title,
      description: entity.description,
      latitude: entity.latitude,
      longitude: entity.longitude,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
    );
  }

  static List<AddressModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => AddressModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
