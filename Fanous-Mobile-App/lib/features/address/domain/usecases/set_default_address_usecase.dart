import '../repositories/address_repository.dart';

class SetDefaultAddressUseCase {
  final AddressRepository repository;

  SetDefaultAddressUseCase(this.repository);

  Future<void> call(String addressId) {
    return repository.setDefaultAddress(addressId);
  }
}
