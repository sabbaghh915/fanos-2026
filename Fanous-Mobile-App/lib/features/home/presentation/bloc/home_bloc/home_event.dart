import 'package:equatable/equatable.dart';

enum TabType { property, motors, electronics }

abstract class HomeEvent extends Equatable {
  const HomeEvent();

  @override
  List<Object> get props => [];
}

class HomeTabChanged extends HomeEvent {
  final TabType tabType;

  const HomeTabChanged(this.tabType);

  @override
  List<Object> get props => [tabType];
}

class LoadHomeData extends HomeEvent {
  final TabType tabType;

  const LoadHomeData(this.tabType);

  @override
  List<Object> get props => [tabType];
}

class RefreshHomeData extends HomeEvent {
  final TabType tabType;

  const RefreshHomeData(this.tabType);

  @override
  List<Object> get props => [tabType];
}