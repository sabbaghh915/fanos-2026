import '../../domain/repositories/notification_repository.dart';
import '../../domain/entity/notification_entity.dart';
import '../datasources/notification_remote_data_source.dart';


class NotificationRepositoryImpl implements NotificationRepository {
  final NotificationRemoteDataSource remote;

  NotificationRepositoryImpl(this.remote);

  @override
  Future<List<NotificationEntity>> getNotifications() async {
    final models = await remote.getNotifications();
    return models.map((m) => m.toEntity()).toList();
  }

  @override
  Future<void> clearNotifications() async {
    await remote.clearNotifications();
  }
}
