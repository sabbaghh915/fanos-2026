import 'package:equatable/equatable.dart';
import '../../../domain/entities/address_entity.dart';

abstract class AddressListState extends Equatable {
  const AddressListState();

  @override
  List<Object?> get props => [];
}

class AddressListInitial extends AddressListState {
  const AddressListInitial();
}

class AddressListLoading extends AddressListState {
  const AddressListLoading();
}

class AddressListLoaded extends AddressListState {
  final List<AddressEntity> addresses;

  const AddressListLoaded({required this.addresses});

  @override
  List<Object?> get props => [addresses];
}

class AddressListError extends AddressListState {
  final String message;

  const AddressListError({required this.message});

  @override
  List<Object?> get props => [message];
}

class AddressDeleted extends AddressListState {
  final String message;

  const AddressDeleted({this.message = 'تم حذف العنوان بنجاح'});

  @override
  List<Object?> get props => [message];
}

class AddressDefaultSet extends AddressListState {
  final String message;

  const AddressDefaultSet({this.message = 'تم تعيين العنوان كافتراضي بنجاح'});

  @override
  List<Object?> get props => [message];
}
