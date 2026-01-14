abstract class Failure {
  final String message;
  final dynamic originalError;

  const Failure({
    required this.message,
    this.originalError,
  });

  @override
  String toString() => message;
}

// فشل في السيرفر
class ServerFailure extends Failure {
  const ServerFailure({
    required super.message,
    super.originalError,
  });
}

// فشل في الاتصال بالإنترنت
class NetworkFailure extends Failure {
  const NetworkFailure({
    required super.message,
    super.originalError,
  });
}

// فشل في تسجيل الدخول
class AuthenticationFailure extends Failure {
  const AuthenticationFailure({
    required super.message,
    super.originalError,
  });
}

// فشل في الصلاحيات
class PermissionFailure extends Failure {
  const PermissionFailure({
    required super.message,
    super.originalError,
  });
}

// فشل في التحقق من البيانات
class ValidationFailure extends Failure {
  final Map<String, String>? fieldErrors;

  const ValidationFailure({
    required super.message,
    this.fieldErrors,
    super.originalError,
  });
}

// فشل في قاعدة البيانات
class DatabaseFailure extends Failure {
  final String? code;

  const DatabaseFailure({
    required super.message,
    this.code,
    super.originalError,
  });
}

// فشل في رفع الملفات
class StorageFailure extends Failure {
  final String? bucketName;

  const StorageFailure({
    required super.message,
    this.bucketName,
    super.originalError,
  });
}

// فشل في استدعاء RPC Function
class RpcFailure extends Failure {
  final String? functionName;

  const RpcFailure({
    required super.message,
    this.functionName,
    super.originalError,
  });
}

// فشل مش معروف
class UnknownFailure extends Failure {
  const UnknownFailure({
    required super.message,
    super.originalError,
  });
}

// اذا كنت عم تسأل ليش خطيت طبقين للاخطاء راجع ملف التوثيق شارح كلشي
