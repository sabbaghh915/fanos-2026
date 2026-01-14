class MessageEntity {
  final String id;
  final String message;
  final DateTime time;
  final bool isSent;
  final String? attachmentUrl;
  final String? attachmentType;

  const MessageEntity({
    required this.id,
    required this.message,
    required this.time,
    required this.isSent,
    this.attachmentUrl,
    this.attachmentType,
  });
}
