import 'exceptions.dart';
import 'failures.dart';
import 'error_messages.dart';

// معالج الأخطاء الموحد
// بتحول الـ Exceptions لـ Failures وبعالج الـ JSON Responses
class ErrorHandler {
  // تحويل Exception لـ Failure
  static Failure handleException(dynamic exception) {
    switch (exception.runtimeType) {
      case ServerException _:
        final e = exception as ServerException;
        return ServerFailure(
          message: e.message,
          originalError: e.originalError,
        );
      case NetworkException _:
        final e = exception as NetworkException;
        return NetworkFailure(
          message: e.message,
          originalError: e.originalError,
        );
      case AuthenticationException _:
        final e = exception as AuthenticationException;
        return AuthenticationFailure(
          message: e.message,
          originalError: e.originalError,
        );
      case PermissionException _:
        final e = exception as PermissionException;
        return PermissionFailure(
          message: e.message,
          originalError: e.originalError,
        );
      case ValidationException _:
        final e = exception as ValidationException;
        return ValidationFailure(
          message: e.message,
          fieldErrors: e.fieldErrors,
          originalError: e.originalError,
        );
      case DatabaseException _:
        final e = exception as DatabaseException;
        return DatabaseFailure(
          message: e.message,
          code: e.code,
          originalError: e.originalError,
        );
      case StorageException _:
        final e = exception as StorageException;
        return StorageFailure(
          message: e.message,
          bucketName: e.bucketName,
          originalError: e.originalError,
        );
      default:
        if (exception is Exception) {
          return UnknownFailure(
            message: exception.toString(),
            originalError: exception,
          );
        }
        return UnknownFailure(
          message: ErrorMessages.unknownError,
          originalError: exception,
        );
    }
  }

  // جلب رسالة خطأ مناسبة للمستخدم
  static String getUserFriendlyMessage(Failure failure) {
    switch (failure) {
      case NetworkFailure():
        return ErrorMessages.noInternetConnection;
      case AuthenticationFailure(message: var message):
        return message.isNotEmpty ? message : ErrorMessages.authFailed;
      case PermissionFailure(message: var message):
        return message.isNotEmpty ? message : ErrorMessages.noPermission;
      case ValidationFailure(message: var message):
        return message.isNotEmpty ? message : ErrorMessages.invalidData;
      case ServerFailure():
        return ErrorMessages.serverError;
      case DatabaseFailure():
        return ErrorMessages.databaseError;
      case StorageFailure():
        return ErrorMessages.uploadFailed;
      case RpcFailure(message: var message):
        return message.isNotEmpty ? message : ErrorMessages.rpcFailed;
      default:
        return ErrorMessages.unknownError;
    }
  }
}