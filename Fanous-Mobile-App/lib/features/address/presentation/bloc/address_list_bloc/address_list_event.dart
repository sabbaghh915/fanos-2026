import 'package:equatable/equatable.dart';

abstract class AddressListEvent extends Equatable {
  const AddressListEvent();

  @override
  List<Object?> get props => [];
}

class LoadAddressesEvent extends AddressListEvent {
  const LoadAddressesEvent();
}

class RefreshAddressesEvent extends AddressListEvent {
  const RefreshAddressesEvent();
}

class DeleteAddressEvent extends AddressListEvent {
  final String addressId;

  const DeleteAddressEvent(this.addressId);

  @override
  List<Object?> get props => [addressId];
}

class SetDefaultAddressEvent extends AddressListEvent {
  final String addressId;

  const SetDefaultAddressEvent(this.addressId);

  @override
  List<Object?> get props => [addressId];
}
