import 'package:equatable/equatable.dart';

abstract class AddressAddState extends Equatable {
  const AddressAddState();

  @override
  List<Object?> get props => [];
}

class AddressAddInitialState extends AddressAddState {
  const AddressAddInitialState();
}

class AddressAddLoadingState extends AddressAddState {
  const AddressAddLoadingState();
}

class AddressAddSuccessState extends AddressAddState {
  final String message;

  const AddressAddSuccessState({required this.message});

  @override
  List<Object?> get props => [message];
}

class AddressAddFailureState extends AddressAddState {
  final String message;

  const AddressAddFailureState({required this.message});

  @override
  List<Object?> get props => [message];
}
