import '../models/notification_model.dart';
import 'mock/notification_mock_data.dart';

abstract class NotificationRemoteDataSource {
  Future<List<NotificationModel>> getNotifications();
  Future<void> clearNotifications();
}
class NotificationRemoteDataSourceImpl
    implements NotificationRemoteDataSource {

  List<Map<String, dynamic>> _storage =
  NotificationMockData.getNotificationsJson();

  @override
  Future<List<NotificationModel>> getNotifications() async {
    await Future.delayed(const Duration(milliseconds: 200));

    return _storage
        .map((e) => NotificationModel.fromJson(e))
        .toList();
  }

  @override
  Future<void> clearNotifications() async {
    await Future.delayed(const Duration(milliseconds: 100));
    _storage = [];
  }}