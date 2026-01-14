import '../../domain/entities/chat_entity.dart';

class ChatModel {
  final String id;
  final String userName;
  final String itemName;
  final String lastMessage;
  final bool isPhoneViewed;
  final String time;
  final String? avatarUrl;
  final String? thumbnailUrl;
  final int unreadCount;
  final bool isRead;

  const ChatModel({
    required this.id,
    required this.userName,
    required this.itemName,
    required this.lastMessage,
    required this.isPhoneViewed,
    required this.time,
    this.avatarUrl,
    this.thumbnailUrl,
    required this.unreadCount,
    required this.isRead,
  });

  factory ChatModel.fromJson(Map<String, dynamic> json) {
    return ChatModel(
      id: json['id'] ?? '',
      userName: json['userName'] ?? '',
      itemName: json['itemName'] ?? '',
      lastMessage: json['lastMessage'] ?? '',
      isPhoneViewed: json['isPhoneViewed'] ?? false,
      time: json['time'] ?? '',
      avatarUrl: json['avatarUrl'],
      thumbnailUrl: json['thumbnailUrl'],
      unreadCount: json['unreadCount'] ?? 0,
      isRead: json['isRead'] ?? false,
    );
  }

  ChatEntity toEntity() {
    return ChatEntity(
      id: id,
      userName: userName,
      itemName: itemName,
      lastMessage: lastMessage,
      isPhoneViewed: isPhoneViewed,
      time: time,
      avatarUrl: avatarUrl,
      thumbnailUrl: thumbnailUrl,
      unreadCount: unreadCount,
      isRead: isRead,
    );
  }

  static List<ChatModel> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => ChatModel.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
