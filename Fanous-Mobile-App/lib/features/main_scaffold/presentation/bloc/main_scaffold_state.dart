import 'package:equatable/equatable.dart';

class MainScaffoldState extends Equatable {
  final int currentIndex;

  const MainScaffoldState({
    this.currentIndex = 0,
  });

  MainScaffoldState copyWith({
    int? currentIndex,
  }) {
    return MainScaffoldState(
      currentIndex: currentIndex ?? this.currentIndex,
    );
  }

  @override
  List<Object> get props => [currentIndex];
}
