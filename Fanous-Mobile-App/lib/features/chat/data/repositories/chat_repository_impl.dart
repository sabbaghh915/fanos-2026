import '../../domain/entities/chat_entity.dart';
import '../../domain/entities/message_entity.dart';
import '../../domain/repositories/chat_repository.dart';
import '../datasources/chat_remote_data_source.dart';

class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDataSource remoteDataSource;

  const ChatRepositoryImpl({required this.remoteDataSource});

  @override
  Future<List<ChatEntity>> getChats() async {
    // Data Source handles try/catch and returns Models
    final chatModels = await remoteDataSource.getChats();

    // Convert Models to Entities
    return chatModels.map((model) => model.toEntity()).toList();
  }

  @override
  Future<List<MessageEntity>> getMessages(String chatId) async {
    // Data Source handles try/catch and returns Models
    final messageModels = await remoteDataSource.getMessages(chatId);

    // Convert Models to Entities
    return messageModels.map((model) => model.toEntity()).toList();
  }

  @override
  Future<MessageEntity> sendMessage(
    String chatId,
    String message, {
    String? attachmentPath,
    String? attachmentType,
  }) async {
    // Data Source handles try/catch and returns Model
    final messageModel = await remoteDataSource.sendMessage(
      chatId,
      message,
      attachmentPath: attachmentPath,
      attachmentType: attachmentType,
    );

    // Convert Model to Entity
    return messageModel.toEntity();
  }
}
