import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'profile_view_bottom_section_menu_item.dart';

class ProfileViewBottomSection extends StatelessWidget {
  final VoidCallback onTapDiscount;
  final VoidCallback onTapProfile;
  final VoidCallback onTapPayment;
  final VoidCallback onTapAddresses;
  final VoidCallback onTapSetting;
  final VoidCallback onTapSupport;
  final VoidCallback onTapFeedBack;
  final VoidCallback onTapLogOut;
  const ProfileViewBottomSection({
    super.key,
    required this.onTapDiscount,
    required this.onTapProfile,
    required this.onTapPayment,
    required this.onTapAddresses,
    required this.onTapSetting,
    required this.onTapSupport,
    required this.onTapFeedBack,
    required this.onTapLogOut,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 40.h),
        Padding(
          padding: EdgeInsets.all(8.w),
          child: ProfileViewBottomSectionMenuItem(
            title: 'Buy Discount Package',
            subtitle: 'save big on exclusive package',
            icon: Icons.discount,
            color: AppColors.secondaryContainer,
            onTap: onTapDiscount,
          ),
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Edit Profile',
          subtitle: 'Edit your profile to ne better',
          icon: Icons.person,
          onTap: onTapProfile,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Payment Options',
          subtitle: 'Manage saved payment methods',
          icon: Icons.payment,
          onTap: onTapPayment,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Addresses',
          subtitle: 'Address and billing info',
          icon: Icons.location_on,
          onTap: onTapAddresses,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Setting',
          subtitle: 'Privacy and manage account',
          icon: Icons.settings,
          onTap: onTapSetting,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Help & Support',
          subtitle: 'Help center and legal terms',
          icon: Icons.help_outline,
          onTap: onTapSupport,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Feedback',
          subtitle: 'Take a moment to let us know how we are doing',
          icon: Icons.feedback,
          onTap: onTapFeedBack,
        ),
        ProfileViewBottomSectionMenuItem(
          title: 'Logout',
          subtitle: '',
          icon: Icons.logout,
          onTap: onTapLogOut,
        ),
      ],
    );
  }
}
