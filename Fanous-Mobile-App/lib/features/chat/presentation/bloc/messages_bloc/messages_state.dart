import 'package:equatable/equatable.dart';
import '../../../domain/entities/message_entity.dart';

abstract class MessagesState extends Equatable {
  const MessagesState();

  @override
  List<Object?> get props => [];
}

class MessagesInitial extends MessagesState {
  const MessagesInitial();
}

class MessagesLoading extends MessagesState {
  const MessagesLoading();
}

class MessagesLoaded extends MessagesState {
  final List<MessageEntity> messages;

  const MessagesLoaded({required this.messages});

  @override
  List<Object> get props => [messages];
}

class MessagesError extends MessagesState {
  final String message;

  const MessagesError({required this.message});

  @override
  List<Object> get props => [message];
}

class MessageSending extends MessagesState {
  final List<MessageEntity> messages;

  const MessageSending({required this.messages});

  @override
  List<Object> get props => [messages];
}

