import '../../domain/entities/address_entity.dart';
import '../../domain/repositories/address_repository.dart';
import '../datasources/address_remote_data_source.dart';
import '../models/address_model.dart';

class AddressRepositoryImpl implements AddressRepository {
  final AddressRemoteDataSource remoteDataSource;

  const AddressRepositoryImpl({required this.remoteDataSource});

  @override
  Future<List<AddressEntity>> getAddresses() async {
    try {
      final addressModels = await remoteDataSource.getAddresses();
      return addressModels.map((model) => model.toEntity()).toList();
    } catch (e) {
      throw Exception('فشل في جلب العناوين: $e');
    }
  }

  @override
  Future<void> addAddress(AddressEntity address) async {
    try {
      return await remoteDataSource.addAddress(
        AddressModel.fromEntity(address),
      );
    } catch (e) {
      throw Exception('فشل في إضافة العنوان: $e');
    }
  }

  @override
  Future<void> deleteAddress(String addressId) async {
    try {
      return await remoteDataSource.deleteAddress(addressId);
    } catch (e) {
      throw Exception('فشل في حذف العنوان: $e');
    }
  }

  @override
  Future<void> setDefaultAddress(String addressId) async {
    try {
      return await remoteDataSource.setDefaultAddress(addressId);
    } catch (e) {
      throw Exception('فشل في تعيين العنوان الافتراضي: $e');
    }
  }
}
