import 'dart:convert';
import 'package:fanous/core/constants/shared_preference_keys.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/address_model.dart';

abstract class AddressRemoteDataSource {
  Future<List<AddressModel>> getAddresses();
  Future<void> addAddress(AddressModel address);
  Future<void> deleteAddress(String addressId);
  Future<void> setDefaultAddress(String addressId);
}

class AddressRemoteDataSourceImpl implements AddressRemoteDataSource {
  final SharedPreferences sharedPreferences;
  static const String _addressesKey = SharedPreferenceKeys.addressesKey;

  AddressRemoteDataSourceImpl({required this.sharedPreferences});

  @override
  Future<List<AddressModel>> getAddresses() async {
    try {
      final String? addressesJson = sharedPreferences.getString(_addressesKey);
      if (addressesJson == null || addressesJson.isEmpty) {
        return [];
      }
      final List<dynamic> decodedJson = json.decode(addressesJson);
      return AddressModel.fromJsonList(decodedJson);
    } catch (e) {
      throw Exception('فشل في تحميل العناوين: $e');
    }
  }

  @override
  Future<void> addAddress(AddressModel address) async {
    try {
      List<AddressModel> addresses = await getAddresses();
      addresses.add(address);

      final String encodedJson = json.encode(
        addresses.map((addr) => addr.toJson()).toList(),
      );
      await sharedPreferences.setString(_addressesKey, encodedJson);
    } catch (e) {
      throw Exception('فشل في إضافة العنوان: $e');
    }
  }

  @override
  Future<void> deleteAddress(String addressId) async {
    try {
      final List<AddressModel> addresses = await getAddresses();
      addresses.removeWhere((address) => address.id == addressId);
      final String encodedJson = json.encode(
        addresses.map((addr) => addr.toJson()).toList(),
      );
      await sharedPreferences.setString(_addressesKey, encodedJson);
    } catch (e) {
      throw Exception('فشل في حذف العنوان: $e');
    }
  }

  @override
  Future<void> setDefaultAddress(String addressId) async {
    try {
      final List<AddressModel> addresses = await getAddresses();
      final updatedAddresses = addresses.map((address) {
        return AddressModel(
          id: address.id,
          title: address.title,
          description: address.description,
          latitude: address.latitude,
          longitude: address.longitude,
          isDefault:
              address.id ==
              addressId, // rest all to false except addressId == same dafalut
          createdAt: address.createdAt,
        );
      }).toList();
      final String encodedJson = json.encode(
        updatedAddresses.map((addr) => addr.toJson()).toList(),
      );
      await sharedPreferences.setString(_addressesKey, encodedJson);
    } catch (e) {
      throw Exception('fails to set a default address $e');
    }
  }
}
