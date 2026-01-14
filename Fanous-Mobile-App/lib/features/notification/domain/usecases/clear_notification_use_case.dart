
import '../repositories/notification_repository.dart';
class ClearNotificationUseCase{
  final NotificationRepository repository ;
  ClearNotificationUseCase(this.repository) ;
Future <void> call() {
  return repository.clearNotifications();
}
}
