import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/chat/presentation/pages/chat_page.dart';
import 'package:fanous/features/sell_bottom_sheet/presentation/page/sell_bottom_sheet_page.dart';
import 'package:flutter/material.dart';
import '../../../../core/di/dependency_injection.dart';
import '../../../home/presentation/bloc/home_bloc/home_bloc.dart';
import '../../../home/presentation/pages/home_page.dart';
import '../widgets/bottom_navigation_bar.dart';
import '../../../my_adds/presentation/pages/my_ads_page.dart';
import '../../../profile/presentation/pages/profile_page.dart';

class MainScaffold extends StatefulWidget {
  const MainScaffold({super.key});

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _currentIndex = 0;

  late final List<Widget> _pages = [
    HomePage(homeBloc: getIt<HomeBloc>()),
    const MyAdsPage(),
    const Placeholder(),
    const ChatPage(),
    const ProfilePage(),
  ];

  void _onTabTapped(int index) {
    if (index == 2) {
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (_) => const SellBottomSheetPage(),
      );
      return;
    }
    setState(() {
      _currentIndex = index;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Scaffold(
        backgroundColor: AppColors.backgroundLight,
        body: Stack(
          children: [
            // Main Content
            IndexedStack(index: _currentIndex, children: _pages),
            // Bottom Navigation Bar
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: CustomBottomNavigationBar(
                currentIndex: _currentIndex,
                onTap: _onTabTapped,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

