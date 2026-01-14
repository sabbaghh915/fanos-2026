import 'package:flutter_bloc/flutter_bloc.dart';
import '../../domain/usecases/clear_notification_use_case.dart';
import '../../domain/usecases/get_notification_use_case.dart';
import 'notification_event.dart';
import 'notification_state.dart';

class NotificationBloc
    extends Bloc<NotificationEvent, NotificationState> {

  final GetNotificationUseCase getNotifications;
  final ClearNotificationUseCase clearNotifications;

  NotificationBloc(
      this.getNotifications,
      this.clearNotifications,
      ) : super(NotificationInitial()) {

    on<LoadNotificationsEvent>(_onLoad);
    on<ClearNotificationsEvent>(_onClear);
  }

  Future<void> _onLoad(
      LoadNotificationsEvent event,
      Emitter<NotificationState> emit,
      ) async {
    emit(NotificationLoading());

    try {
      final data = await getNotifications();
      emit(NotificationLoaded(data));
    } catch (e) {
      emit(NotificationError("Failed to load notifications"));
    }
  }

  Future<void> _onClear(
      ClearNotificationsEvent event,
      Emitter<NotificationState> emit,
      ) async {
    await clearNotifications();
    emit(NotificationLoaded([]));
  }
}
