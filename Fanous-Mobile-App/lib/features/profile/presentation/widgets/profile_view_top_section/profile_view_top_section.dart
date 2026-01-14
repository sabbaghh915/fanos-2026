import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'profile_view_top_section_card.dart';
import 'profile_view_top_section_user_details.dart';

class ProfileViewTopSection extends StatelessWidget {
  final String userName;
  final String userNumber;
  final String userImage;
  final VoidCallback onTapNotification;
  final VoidCallback onTapChat;
  final VoidCallback onTapFavorite;
  final VoidCallback onTapOrders;
  const ProfileViewTopSection({
    super.key,
    required this.userName,
    required this.userNumber,
    required this.userImage,
    required this.onTapNotification,
    required this.onTapChat,
    required this.onTapFavorite,
    required this.onTapOrders,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none, // مهم للسماح بالخروج خارج الصورة
      children: [
        // ===== BACKGROUND IMAGE =====
        Container(
          height: 170.h,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/fanous_image2.jpg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
        Positioned(
          top: 60.h,
          left: 16.w,
          right: 16.w,
          child: ProfileViewTopSectionUserDetails(
            userName: userName,
            userNumber: userNumber,
            userImage: userImage,
            onTabNotification: onTapNotification,
          ),
        ),
        Positioned(
          bottom: -40.h,
          left: 10.w,
          right: 10.w,
          child: Row(
            spacing: 10.w,
            children: [
              ProfileViewTopSectionCard(
                iconData: Icons.chat,
                title: 'chat',
                onTap: onTapChat,
              ),
              ProfileViewTopSectionCard(
                iconData: Icons.favorite,
                title: 'Favorite',
                onTap: onTapFavorite,
              ),
              ProfileViewTopSectionCard(
                iconData: Icons.shopping_bag,
                title: 'Orders',
                onTap: onTapOrders,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
