import '../entities/address_entity.dart';

abstract class AddressRepository {
  Future<List<AddressEntity>> getAddresses();
  Future<void> addAddress(AddressEntity address);
  Future<void> deleteAddress(String addressId);
  Future<void> setDefaultAddress(String addressId);
}
