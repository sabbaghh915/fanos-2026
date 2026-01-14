import '../entity/notification_entity.dart';
import '../repositories/notification_repository.dart';
class GetNotificationUseCase {
final NotificationRepository repository ;
GetNotificationUseCase(this.repository) ;
Future<List<NotificationEntity>> call() {
  return repository.getNotifications();
}
}