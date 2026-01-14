import '../../../domain/usecases/get_chats_usecase.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'chat_event.dart';
import 'chat_state.dart';

class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final GetChatsUseCase getChatsUseCase;

  ChatBloc({required this.getChatsUseCase}) : super(const ChatInitial()) {
    on<LoadChats>(_onLoadChats);
    on<RefreshChats>(_onRefreshChats);
  }

  Future<void> _onLoadChats(LoadChats event, Emitter<ChatState> emit) async {
    emit(const ChatLoading());

    try {
      final chats = await getChatsUseCase();
      emit(ChatLoaded(chats: chats));
    } catch (e) {
      emit(ChatError(message: e.toString()));
    }
  }

  Future<void> _onRefreshChats(
    RefreshChats event,
    Emitter<ChatState> emit,
  ) async {
    // هنا احافظ على الحالة واحدث البيانات لاعادة العرض
    if (state is ChatLoaded) {
      final currentState = state as ChatLoaded;
      emit(ChatLoaded(chats: currentState.chats));
    }

    try {
      final chats = await getChatsUseCase();
      emit(ChatLoaded(chats: chats));
    } catch (e) {
      emit(ChatError(message: e.toString()));
    }
  }
}
