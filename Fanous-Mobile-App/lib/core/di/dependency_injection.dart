import 'package:fanous/features/address/presentation/bloc/address_add_bloc/address_add_bloc.dart';
import 'package:fanous/features/address/presentation/bloc/address_list_bloc/address_list_bloc.dart';
import 'package:fanous/features/home/data/repositories/home_repository_impl.dart';
import 'package:fanous/features/home/domain/repositories/home_repository.dart';
import 'package:fanous/features/home/presentation/bloc/home_bloc/home_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:fanous/features/home/data/datasources/home_remote_data_source.dart';
import 'package:fanous/features/home/domain/usecases/get_all_products_usecase.dart';
import 'package:fanous/features/home/domain/usecases/get_categories_usecase.dart';
import 'package:fanous/features/home/domain/usecases/get_product_sections_usecase.dart';
import 'package:fanous/features/home/domain/usecases/get_slider_images_usecase.dart';
import 'package:fanous/features/home/presentation/bloc/all_products/all_products_bloc.dart';
import 'package:fanous/features/chat/data/datasources/chat_remote_data_source.dart';
import 'package:fanous/features/chat/data/repositories/chat_repository_impl.dart';
import 'package:fanous/features/chat/domain/repositories/chat_repository.dart';
import 'package:fanous/features/chat/domain/usecases/get_chats_usecase.dart';
import 'package:fanous/features/chat/domain/usecases/get_messages_usecase.dart';
import 'package:fanous/features/chat/domain/usecases/send_message_usecase.dart';
import 'package:fanous/features/chat/presentation/bloc/chat_bloc/chat_bloc.dart';
import 'package:fanous/features/chat/presentation/bloc/messages_bloc/messages_bloc.dart';
import 'package:fanous/features/address/data/datasources/address_remote_data_source.dart';
import 'package:fanous/features/address/data/repositories/address_repository_impl.dart';
import 'package:fanous/features/address/domain/repositories/address_repository.dart';
import 'package:fanous/features/address/domain/usecases/get_addresses_usecase.dart';
import 'package:fanous/features/address/domain/usecases/add_address_usecase.dart';
import 'package:fanous/features/address/domain/usecases/delete_address_usecase.dart';
import 'package:fanous/features/address/domain/usecases/set_default_address_usecase.dart';
import 'package:shared_preferences/shared_preferences.dart';

final getIt = GetIt.instance;

Future<void> setupDependencyInjection() async {
  // Shared Preferences
  final sharedPreferences = await SharedPreferences.getInstance();
  getIt.registerLazySingleton<SharedPreferences>(() => sharedPreferences);

  // Home Feature - Data Sources
  getIt.registerLazySingleton<HomeRemoteDataSource>(
    () => HomeRemoteDataSourceImpl(),
  );

  // Repositories
  getIt.registerLazySingleton<HomeRepository>(
    () => HomeRepositoryImpl(remoteDataSource: getIt<HomeRemoteDataSource>()),
  );

  // Use Cases
  getIt.registerLazySingleton(
    () => GetCategoriesUseCase(getIt<HomeRepository>()),
  );

  getIt.registerLazySingleton(
    () => GetProductSectionsUseCase(getIt<HomeRepository>()),
  );

  getIt.registerLazySingleton(
    () => GetSliderImagesUseCase(getIt<HomeRepository>()),
  );

  getIt.registerLazySingleton(
    () => GetAllProductsUseCase(getIt<HomeRepository>()),
  );

  // Bloc
  getIt.registerFactory(
    () => HomeBloc(
      getCategoriesUseCase: getIt<GetCategoriesUseCase>(),
      getProductSectionsUseCase: getIt<GetProductSectionsUseCase>(),
      getSliderImagesUseCase: getIt<GetSliderImagesUseCase>(),
    ),
  );

  getIt.registerFactory(
    () =>
        AllProductsBloc(getAllProductsUseCase: getIt<GetAllProductsUseCase>()),
  );

  // Chat Feature - Data Sources
  getIt.registerLazySingleton<ChatRemoteDataSource>(
    () => ChatRemoteDataSourceImpl(),
  );

  // Repositories
  getIt.registerLazySingleton<ChatRepository>(
    () => ChatRepositoryImpl(remoteDataSource: getIt<ChatRemoteDataSource>()),
  );

  // Use Cases
  getIt.registerLazySingleton(() => GetChatsUseCase(getIt<ChatRepository>()));

  getIt.registerLazySingleton(
    () => GetMessagesUseCase(getIt<ChatRepository>()),
  );

  getIt.registerLazySingleton(
    () => SendMessageUseCase(getIt<ChatRepository>()),
  );

  // Bloc
  getIt.registerFactory(
    () => ChatBloc(getChatsUseCase: getIt<GetChatsUseCase>()),
  );

  getIt.registerFactory(
    () => MessagesBloc(
      getMessagesUseCase: getIt<GetMessagesUseCase>(),
      sendMessageUseCase: getIt<SendMessageUseCase>(),
    ),
  );

  // Address Feature - Data Sources
  getIt.registerLazySingleton<AddressRemoteDataSource>(
    () => AddressRemoteDataSourceImpl(
      sharedPreferences: getIt<SharedPreferences>(),
    ),
  );

  // Repositories
  getIt.registerLazySingleton<AddressRepository>(
    () => AddressRepositoryImpl(
      remoteDataSource: getIt<AddressRemoteDataSource>(),
    ),
  );

  // Use Cases
  getIt.registerLazySingleton(
    () => GetAddressesUseCase(getIt<AddressRepository>()),
  );

  getIt.registerLazySingleton(
    () => AddAddressUseCase(getIt<AddressRepository>()),
  );

  getIt.registerLazySingleton(
    () => DeleteAddressUseCase(getIt<AddressRepository>()),
  );

  getIt.registerLazySingleton(
    () => SetDefaultAddressUseCase(getIt<AddressRepository>()),
  );

  // Bloc
  getIt.registerFactory(
    () => AddressListBloc(
      getAddressesUseCase: getIt<GetAddressesUseCase>(),
      deleteAddressUseCase: getIt<DeleteAddressUseCase>(),
      setDefaultAddressUseCase: getIt<SetDefaultAddressUseCase>(),
    ),
  );
  getIt.registerFactory(
    () => AddressAddBloc(addAddressUseCase: getIt<AddAddressUseCase>()),
  );
}
