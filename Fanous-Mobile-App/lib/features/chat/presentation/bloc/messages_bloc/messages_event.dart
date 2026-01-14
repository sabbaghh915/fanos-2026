import 'package:equatable/equatable.dart';

abstract class MessagesEvent extends Equatable {
  const MessagesEvent();

  @override
  List<Object> get props => [];
}

class LoadMessages extends MessagesEvent {
  final String chatId;

  const LoadMessages(this.chatId);

  @override
  List<Object> get props => [chatId];
}

class SendMessage extends MessagesEvent {
  final String chatId;
  final String message;

  const SendMessage({
    required this.chatId,
    required this.message,
  });

  @override
  List<Object> get props => [chatId, message];
}

class SendAttachment extends MessagesEvent {
  final String chatId;
  final String filePath;
  final String fileName;
  final String attachmentType;

  const SendAttachment({
    required this.chatId,
    required this.filePath,
    required this.fileName,
    required this.attachmentType,
  });

  @override
  List<Object> get props => [chatId, filePath, fileName, attachmentType];
}

class RefreshMessages extends MessagesEvent {
  final String chatId;

  const RefreshMessages(this.chatId);

  @override
  List<Object> get props => [chatId];
}

