// رسائل الأخطاء الموحدة
class ErrorMessages {
  static const String unknownError = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
  static const String unexpectedResponse = 'استجابة غير متوقعة من الخادم';
  static const String noInternetConnection =
      'لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال والمحاولة مرة أخرى';
  static const String serverError = 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً';
  static const String authFailed = 'فشل في المصادقة. يرجى تسجيل الدخول مرة أخرى';
  static const String noPermission = 'ليس لديك صلاحية للوصول إلى هذا المورد';
  static const String invalidData =
      'البيانات المدخلة غير صحيحة. يرجى التحقق والمحاولة مرة أخرى';
  static const String databaseError = 'حدث خطأ في قاعدة البيانات. يرجى المحاولة مرة أخرى';
  static const String uploadFailed =
      'فشل في رفع الملف. يرجى التحقق من الملف والمحاولة مرة أخرى';
  static const String rpcFailed = 'فشل في تنفيذ العملية. يرجى المحاولة مرة أخرى';
  static const String connectionTimeout = 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى';
  static const String storeNotFound = 'لم يتم العثور على متجر مرتبط بحسابك';
}
