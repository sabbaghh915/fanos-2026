enum FilterType {
  datePosted,
  category,
  price,
}

extension FilterTypeExtension on FilterType {
  String get label {
    switch (this) {
      case FilterType.datePosted:
        return 'Date Posted';
      case FilterType.category:
        return 'Category';
      case FilterType.price:
        return 'Price';
    }
  }
}

