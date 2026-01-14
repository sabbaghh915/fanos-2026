import 'package:fanous/features/address/presentation/pages/addresses_page.dart';
import 'package:fanous/features/edit_profile/presentation/pages/edit_profile_page.dart';
import 'package:fanous/features/feed_backs/presentation/pages/feed_backs_page.dart';
import 'package:fanous/features/help_and_support/presentaion/pages/help_and_support_page.dart';
import 'package:fanous/features/my_profile/presentation/pages/my_profile_page.dart';
import 'package:fanous/features/setting/presentation/pages/setting_page.dart';
import 'package:fanous/features/wish_list/presentation/pages/wish_list_page.dart';
import 'package:flutter/material.dart';

import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../notification/data/datasources/notification_remote_data_source.dart';
import '../../../notification/data/repsitories/notification_repository_impl.dart';
import '../../../notification/domain/usecases/clear_notification_use_case.dart';
import '../../../notification/domain/usecases/get_notification_use_case.dart';
import '../../../notification/presentation/bloc/notification_bloc.dart';
import '../../../notification/presentation/bloc/notification_event.dart';
import '../../../notification/presentation/pages/notification_page.dart';
import '../../../order_history/presentation/pages/order_history_page.dart';
import '../widgets/profile_view_bottom_section/profile_view_bottom_section.dart';
import '../widgets/profile_view_top_section/profile_view_top_section.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: SingleChildScrollView(
        child: Column(
          children: [
            ProfileViewTopSection(
              userName: 'ahmad',
              userNumber: '0936196732',
              userImage: '',
              onTapNotification: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => BlocProvider(
                      create: (_) {
                        final remote = NotificationRemoteDataSourceImpl();
                        final repo = NotificationRepositoryImpl(remote);

                        return NotificationBloc(
                          GetNotificationUseCase(repo),
                          ClearNotificationUseCase(repo),
                        )..add(LoadNotificationsEvent());
                      },
                      child: const NotificationPage(),
                    ),
                  ),
                );
              },

              onTapChat: () {

                  Navigator.of(
                    context,
                  ).push(MaterialPageRoute(builder: (_) => MyProfilePage()));

              },
              onTapFavorite: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => WishListPage()));
              },
              onTapOrders: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => OrderHistoryPage()));
              },
            ),
            ProfileViewBottomSection(
              onTapDiscount: () {},
              onTapProfile: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => EditProfilePage()));
              },
              onTapPayment: () {},
              onTapAddresses: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => AddressesPage()));
              },
              onTapSetting: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => SettingPage()));
              },
              onTapSupport: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => HelpAndSupportPage()));
              },
              onTapFeedBack: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => FeedBacksPage()),
                );
              },
              onTapLogOut: () {},
            ),
          ],
        ),
      ),
    );
  }
}
