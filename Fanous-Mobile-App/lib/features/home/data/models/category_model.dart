import 'package:flutter/material.dart';
import '../../domain/entities/category_entity.dart';

class CategoryModel {
  final IconData icon;
  final String title;

  const CategoryModel({
    required this.icon,
    required this.title,
  });

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      // todo: replace Icon by image just to be back-end ready
      icon: IconData(
        json['icon'] as int? ?? Icons.category.codePoint,
        fontFamily: 'MaterialIcons',
      ),
      title: json['title'] as String? ?? '',
    );
  }


  /// Convert to Entity
  CategoryEntity toEntity() {
    return CategoryEntity(
      icon: icon,
      title: title,
    );
  }

  /// Convert list of JSON to list of CategoryModel
  static List<CategoryModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => CategoryModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}

