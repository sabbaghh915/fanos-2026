import '../entities/message_entity.dart';
import '../repositories/chat_repository.dart';

class SendMessageUseCase {
  final ChatRepository repository;

  SendMessageUseCase(this.repository);

  Future<MessageEntity> call(
    String chatId,
    String message, {
    String? attachmentPath,
    String? attachmentType,
  }) {
    return repository.sendMessage(
      chatId,
      message,
      attachmentPath: attachmentPath,
      attachmentType: attachmentType,
    );
  }
}
