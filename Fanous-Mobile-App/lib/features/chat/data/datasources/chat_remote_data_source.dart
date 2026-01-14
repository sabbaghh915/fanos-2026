import 'mock/message_mock_data.dart';
import 'mock/message_details_mock_data.dart';
import '../models/chat_model.dart';
import '../models/message_model.dart';

abstract class ChatRemoteDataSource {
  Future<List<ChatModel>> getChats();
  Future<List<MessageModel>> getMessages(String chatId);
  Future<MessageModel> sendMessage(
    String chatId,
    String message, {
    String? attachmentPath,
    String? attachmentType,
  });
}

class ChatRemoteDataSourceImpl implements ChatRemoteDataSource {
  @override
  Future<List<ChatModel>> getChats() async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final jsonList = MessageMockData.getMockMessages();
      return ChatModel.fromJsonList(jsonList);
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }

  @override
  Future<List<MessageModel>> getMessages(String chatId) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 100));

      final jsonList = MessageDetailsMockData.getMockMessagesForChat(chatId);
      return MessageModel.fromJsonList(jsonList);
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }

  @override
  Future<MessageModel> sendMessage(
    String chatId,
    String message, {
    String? attachmentPath,
    String? attachmentType,
  }) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(milliseconds: 300));

      // Create a new message model
      final messageModel = MessageModel(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        message: message,
        time: DateTime.now(),
        isSent: true,
        attachmentUrl: attachmentPath,
        attachmentType: attachmentType,
      );

      return messageModel;
    } catch (e) {
      rethrow; // إعادة Exception بدون معالجة
    }
  }
}
