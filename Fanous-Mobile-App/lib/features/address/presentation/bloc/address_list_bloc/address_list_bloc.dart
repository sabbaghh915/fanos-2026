import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/usecases/delete_address_usecase.dart';
import '../../../domain/usecases/get_addresses_usecase.dart';
import '../../../domain/usecases/set_default_address_usecase.dart';
import 'address_list_event.dart';
import 'address_list_state.dart';

class AddressListBloc extends Bloc<AddressListEvent, AddressListState> {
  final GetAddressesUseCase getAddressesUseCase;
  final DeleteAddressUseCase deleteAddressUseCase;
  final SetDefaultAddressUseCase setDefaultAddressUseCase;

  AddressListBloc({
    required this.getAddressesUseCase,
    required this.deleteAddressUseCase,
    required this.setDefaultAddressUseCase,
  }) : super(const AddressListInitial()) {
    on<LoadAddressesEvent>(_onLoadAddresses);
    on<RefreshAddressesEvent>(_onRefreshAddresses);
    on<DeleteAddressEvent>(_onDeleteAddress);
    on<SetDefaultAddressEvent>(_onSetDefaultAddress);
  }

  Future<void> _onLoadAddresses(
    LoadAddressesEvent event,
    Emitter<AddressListState> emit,
  ) async {
    emit(const AddressListLoading());
    try {
      final addresses = await getAddressesUseCase();
      emit(AddressListLoaded(addresses: addresses));
    } catch (e) {
      emit(AddressListError(message: e.toString()));
    }
  }

  Future<void> _onRefreshAddresses(
    RefreshAddressesEvent event,
    Emitter<AddressListState> emit,
  ) async {
    // إبقاء البيانات الحالية أثناء التحديث
    if (state is AddressListLoaded) {
      final currentState = state as AddressListLoaded;
      emit(AddressListLoaded(addresses: currentState.addresses));
    }

    try {
      final addresses = await getAddressesUseCase();
      emit(AddressListLoaded(addresses: addresses));
    } catch (e) {
      emit(AddressListError(message: e.toString()));
    }
  }

  Future<void> _onDeleteAddress(
    DeleteAddressEvent event,
    Emitter<AddressListState> emit,
  ) async {
    try {
      await deleteAddressUseCase(event.addressId);
      emit(const AddressDeleted(message: 'Address deleted successfully'));
      // إعادة تحميل القائمة بعد الحذف
      final addresses = await getAddressesUseCase();
      emit(AddressListLoaded(addresses: addresses));
    } catch (e) {
      emit(AddressListError(message: e.toString()));
    }
  }

  Future<void> _onSetDefaultAddress(
    SetDefaultAddressEvent event,
    Emitter<AddressListState> emit,
  ) async {
    try {
      await setDefaultAddressUseCase(event.addressId);
      // إعادة تحميل القائمة بعد التعيين
      final addresses = await getAddressesUseCase();
      emit(AddressListLoaded(addresses: addresses));
    } catch (e) {
      emit(AddressListError(message: e.toString()));
    }
  }
}
