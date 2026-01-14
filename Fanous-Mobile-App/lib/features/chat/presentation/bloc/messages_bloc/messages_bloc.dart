import '../../../domain/usecases/get_messages_usecase.dart';
import '../../../domain/usecases/send_message_usecase.dart';
import '../../../domain/entities/message_entity.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'messages_event.dart';
import 'messages_state.dart';

class MessagesBloc extends Bloc<MessagesEvent, MessagesState> {
  final GetMessagesUseCase getMessagesUseCase;
  final SendMessageUseCase sendMessageUseCase;

  MessagesBloc({
    required this.getMessagesUseCase,
    required this.sendMessageUseCase,
  }) : super(const MessagesInitial()) {
    on<LoadMessages>(_onLoadMessages);
    on<SendMessage>(_onSendMessage);
    on<SendAttachment>(_onSendAttachment);
    on<RefreshMessages>(_onRefreshMessages);
  }

  Future<void> _onLoadMessages(
    LoadMessages event,
    Emitter<MessagesState> emit,
  ) async {
    emit(const MessagesLoading());

    try {
      final messages = await getMessagesUseCase(event.chatId);
      emit(MessagesLoaded(messages: messages));
    } catch (e) {
      emit(MessagesError(message: e.toString()));
    }
  }

  Future<void> _onSendMessage(
    SendMessage event,
    Emitter<MessagesState> emit,
  ) async {
    // Get current messages if available
    List<MessageEntity> currentMessages = [];
    if (state is MessagesLoaded) {
      final currentState = state as MessagesLoaded;
      currentMessages = List.from(currentState.messages);
      emit(MessageSending(messages: currentMessages));
    } else if (state is MessageSending) {
      final currentState = state as MessageSending;
      currentMessages = List.from(currentState.messages);
    }

    try {
      // Send message and get the sent message entity
      final sentMessage = await sendMessageUseCase(event.chatId, event.message);

      // Add the sent message to the current messages list
      final updatedMessages = [...currentMessages, sentMessage];
      emit(MessagesLoaded(messages: updatedMessages));
    } catch (e) {
      // On error, revert to previous state and show error
      if (currentMessages.isNotEmpty) {
        emit(MessagesLoaded(messages: currentMessages));
      } else {
        emit(MessagesError(message: e.toString()));
      }
    }
  }

  Future<void> _onSendAttachment(
    SendAttachment event,
    Emitter<MessagesState> emit,
  ) async {
    // Get current messages if available
    List<MessageEntity> currentMessages = [];
    if (state is MessagesLoaded) {
      final currentState = state as MessagesLoaded;
      currentMessages = List.from(currentState.messages);
      emit(MessageSending(messages: currentMessages));
    } else if (state is MessageSending) {
      final currentState = state as MessageSending;
      currentMessages = List.from(currentState.messages);
    }

    try {
      final messageText = event.attachmentType == 'image'
          ? '📷 Image: ${event.fileName}'
          : '📎 File: ${event.fileName}';

      // Send attachment and get the sent message entity
      final sentMessage = await sendMessageUseCase(
        event.chatId,
        messageText,
        attachmentPath: event.filePath,
        attachmentType: event.attachmentType,
      );

      // Add the sent message to the current messages list
      final updatedMessages = [...currentMessages, sentMessage];
      emit(MessagesLoaded(messages: updatedMessages));
    } catch (e) {
      // On error, revert to previous state and show error
      if (currentMessages.isNotEmpty) {
        emit(MessagesLoaded(messages: currentMessages));
      } else {
        emit(MessagesError(message: e.toString()));
      }
    }
  }

  Future<void> _onRefreshMessages(
    RefreshMessages event,
    Emitter<MessagesState> emit,
  ) async {
    // Keep current state while refreshing
    if (state is MessagesLoaded) {
      final currentState = state as MessagesLoaded;
      emit(MessagesLoaded(messages: currentState.messages));
    }

    try {
      final messages = await getMessagesUseCase(event.chatId);
      emit(MessagesLoaded(messages: messages));
    } catch (e) {
      emit(MessagesError(message: e.toString()));
    }
  }
}
