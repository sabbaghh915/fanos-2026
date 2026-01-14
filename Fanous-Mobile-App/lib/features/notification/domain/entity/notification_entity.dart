class NotificationEntity {
  final String title;
  final String description;
  final String time;
  final bool isRead;

  const NotificationEntity({
    required this.title,
    required this.description,
    required this.time,
    required this.isRead,
  });
}
