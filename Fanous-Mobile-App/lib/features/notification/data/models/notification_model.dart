import '../../domain/entity/notification_entity.dart';

class NotificationModel {
  final String title;
  final String description;
  final String time;
  final bool isRead;

  const NotificationModel({
    required this.title,
    required this.description,
    required this.time,
    required this.isRead,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      title: json['title'],
      description: json['description'],
      time: json['time'],
      isRead: json['isRead'],
    );
  }

  NotificationEntity toEntity() {
    return NotificationEntity(
      title: title,
      description: description,
      time: time,
      isRead: isRead,
    );
  }
}
