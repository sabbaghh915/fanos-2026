import '../entities/address_entity.dart';
import '../repositories/address_repository.dart';

class AddAddressUseCase {
  final AddressRepository repository;

  AddAddressUseCase(this.repository);

  Future<void> call(AddressEntity address) {
    return repository.addAddress(address);
  }
}
