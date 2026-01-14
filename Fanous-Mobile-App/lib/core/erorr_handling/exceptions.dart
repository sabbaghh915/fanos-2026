// أنواع الأخطاء اللي ممكن تحصل في التطبيق

// خطأ في السيرفر
class ServerException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic originalError;

  ServerException({
    required this.message,
    this.statusCode,
    this.originalError,
  });

  @override
  String toString() => 'ServerException: $message';
}

// خطأ في الاتصال بالإنترنت
class NetworkException implements Exception {
  final String message;
  final dynamic originalError;

  NetworkException({
    required this.message,
    this.originalError,
  });

  @override
  String toString() => 'NetworkException: $message';
}

// خطأ في تسجيل الدخول
class AuthenticationException implements Exception {
  final String message;
  final dynamic originalError;

  AuthenticationException({
    required this.message,
    this.originalError,
  });

  @override
  String toString() => 'AuthenticationException: $message';
}

// خطأ في الصلاحيات
class PermissionException implements Exception {
  final String message;
  final dynamic originalError;

  PermissionException({
    required this.message,
    this.originalError,
  });

  @override
  String toString() => 'PermissionException: $message';
}

// خطأ في التحقق من البيانات (مثلاً بيانات غير صحيحة)
class ValidationException implements Exception {
  final String message;
  final Map<String, String>? fieldErrors;
  final dynamic originalError;

  ValidationException({
    required this.message,
    this.fieldErrors,
    this.originalError,
  });

  @override
  String toString() => 'ValidationException: $message';
}

// خطأ في قاعدة البيانات
class DatabaseException implements Exception {
  final String message;
  final String? code;
  final dynamic originalError;

  DatabaseException({
    required this.message,
    this.code,
    this.originalError,
  });

  @override
  String toString() => 'DatabaseException: $message';
}

// خطأ في رفع الملفات
class StorageException implements Exception {
  final String message;
  final String? bucketName;
  final dynamic originalError;

  StorageException({
    required this.message,
    this.bucketName,
    this.originalError,
  });

  @override
  String toString() => 'StorageException: $message';
}

// خطأ مش معروف
class UnknownException implements Exception {
  final String message;
  final dynamic originalError;

  UnknownException({
    required this.message,
    this.originalError,
  });

  @override
  String toString() => 'UnknownException: $message';
}

// طبعا خرج نخصص هون اي نوع للخطأ ولكن هذه ال standard