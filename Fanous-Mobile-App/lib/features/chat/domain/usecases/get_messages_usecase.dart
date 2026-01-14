import '../entities/message_entity.dart';
import '../repositories/chat_repository.dart';

class GetMessagesUseCase {
  final ChatRepository repository;

  GetMessagesUseCase(this.repository);

  Future<List<MessageEntity>> call(String chatId) {
    return repository.getMessages(chatId);
  }
}
