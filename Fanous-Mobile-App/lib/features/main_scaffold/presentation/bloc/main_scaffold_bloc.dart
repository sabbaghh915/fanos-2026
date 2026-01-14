import 'package:flutter_bloc/flutter_bloc.dart';
import 'main_scaffold_event.dart';
import 'main_scaffold_state.dart';

class MainScaffoldBloc extends Bloc<MainScaffoldEvent, MainScaffoldState> {
  MainScaffoldBloc() : super(const MainScaffoldState()) {
    on<MainScaffoldPageChanged>(_onPageChanged);
  }

  void _onPageChanged(MainScaffoldPageChanged event, Emitter<MainScaffoldState> emit) {
    emit(state.copyWith(currentIndex: event.index));
  }
}

