import 'package:equatable/equatable.dart';

abstract class MainScaffoldEvent extends Equatable {
  const MainScaffoldEvent();

  @override
  List<Object> get props => [];
}

class MainScaffoldPageChanged extends MainScaffoldEvent {
  final int index;

  const MainScaffoldPageChanged(this.index);

  @override
  List<Object> get props => [index];
}

