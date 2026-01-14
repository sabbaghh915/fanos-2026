class ChatEntity {
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

  const ChatEntity({
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
}
