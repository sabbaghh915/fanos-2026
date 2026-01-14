import '../entities/chat_entity.dart';
import '../entities/message_entity.dart';

abstract class ChatRepository {
  Future<List<ChatEntity>> getChats();
  Future<List<MessageEntity>> getMessages(String chatId);
  Future<MessageEntity> sendMessage(
    String chatId,
    String message, {
    String? attachmentPath,
    String? attachmentType,
  });
}
