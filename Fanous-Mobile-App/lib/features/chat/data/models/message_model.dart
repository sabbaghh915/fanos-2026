import '../../domain/entities/message_entity.dart';

class MessageModel {
  final String id;
  final String message;
  final DateTime time;
  final bool isSent;
  final String? attachmentUrl;
  final String? attachmentType;

  const MessageModel({
    required this.id,
    required this.message,
    required this.time,
    required this.isSent,
    this.attachmentUrl,
    this.attachmentType,
  });

  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      id: json['id'] ?? '',
      message: json['message'] ?? '',
      time: json['time'] != null
          ? DateTime.tryParse(json['time']) ?? DateTime.now()
          : DateTime.now(),
      isSent: json['isSent'] ?? false,
      attachmentUrl: json['attachmentUrl'],
      attachmentType: json['attachmentType'],
    );
  }

  MessageEntity toEntity() {
    return MessageEntity(
      id: id,
      message: message,
      time: time,
      isSent: isSent,
      attachmentUrl: attachmentUrl,
      attachmentType: attachmentType,
    );
  }

  static List<MessageModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => MessageModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
