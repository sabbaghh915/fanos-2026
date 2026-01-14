import 'package:equatable/equatable.dart';
import '../../../domain/entities/address_entity.dart';

abstract class AddressAddEvent extends Equatable {
  const AddressAddEvent();

  @override
  List<Object?> get props => [];
}

class AddAddressEvent extends AddressAddEvent {
  final AddressEntity address;

  const AddAddressEvent(this.address);

  @override
  List<Object?> get props => [address];
}
