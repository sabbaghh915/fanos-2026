import 'package:equatable/equatable.dart';

abstract class ChatEvent extends Equatable {
  const ChatEvent();

  @override
  List<Object> get props => [];
}

class LoadChats extends ChatEvent {
  const LoadChats();
}

class RefreshChats extends ChatEvent {
  const RefreshChats();
}

