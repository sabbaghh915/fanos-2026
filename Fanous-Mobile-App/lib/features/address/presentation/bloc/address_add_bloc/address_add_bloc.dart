import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../domain/usecases/add_address_usecase.dart';
import 'address_add_event.dart';
import 'address_add_state.dart';

class AddressAddBloc extends Bloc<AddressAddEvent, AddressAddState> {
  final AddAddressUseCase addAddressUseCase;

  AddressAddBloc({required this.addAddressUseCase})
    : super(const AddressAddInitialState()) {
    on<AddAddressEvent>(_onAddAddressEvent);
  }

  Future<void> _onAddAddressEvent(
    AddAddressEvent event,
    Emitter<AddressAddState> emit,
  ) async {
    emit(const AddressAddLoadingState());

    try {
      await addAddressUseCase(event.address);
      emit(const AddressAddSuccessState(message: 'تم إضافة العنوان بنجاح'));
    } catch (e) {
      emit(AddressAddFailureState(message: e.toString()));
    }
  }
}
