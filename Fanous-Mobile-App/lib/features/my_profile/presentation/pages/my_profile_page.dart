import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';

import '../widgets/my_profile_top_section/profile_app_bar.dart';
import '../widgets/my_profile_top_section/profile_card.dart';
import '../widgets/my_profile_top_section/profile_header_background.dart';

import '../widgets/my_profile_bottom_section/profile_quick_action.dart';

import '../widgets/my_profile_bottom_section/profile_state_box.dart';

class MyProfilePage extends StatelessWidget {
  const MyProfilePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              children: [
                const ProfileHeaderBackground(),
                SafeArea(
                  child: Column(
                    children: [
                      ProfileAppBar(
                        onSettingsPressed: () {
                          // انتقل إلى الإعدادات
                        },
                      ),
                      SizedBox(height: 10.h),
                      const ProfileCard(
                        name: 'Ahmad Al-Fares',
                        phone: '0936196732',
                        bio: 'Flutter Developer | Tech Enthusiast\nShopping is my therapy',
                        imagePath: 'assets/images/fanous_background2.png',
                      ),
                      SizedBox(height: 10.h),

                    ],
                  ),
                ),
              ],
            ),
            // ===== BOTTOM SECTION (Stats + Actions) =====
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 10.w),
              child: Column(
                children: [
                  // --- Followers & Following Row ---
                  Row(
                    children: [
                      Expanded(
                        child: ProfileStatBox(
                          value: '1.2k',
                          label: 'Followers',
                          icon: Icons.people_rounded,
                          color: AppColors.primaryContainer,
                        ),
                      ),
                      SizedBox(width: 12.w),
                      Expanded(
                        child: ProfileStatBox(
                          value: '150',
                          label: 'Following',
                          icon: Icons.person_add_rounded,
                          color: AppColors.primaryContainer,
                        ),
                      ),
                      SizedBox(width: 12.w),
                      Expanded(
                        child: ProfileStatBox(
                          value: '12',
                          label: 'Posts',
                          icon: Icons.post_add_rounded,
                          color: AppColors.primaryContainer,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12.h),
                  // --- Action Buttons (Edit / Share) ---
                  ProfileQuickActions(
                    onEdit: () {
                      // افتح صفحة التعديل
                    },
                    onShare: () {
                      // شارك الملف الشخصي
                    },
                  ),

                ],
              ),
            ),
            // ... بعد الـ ProfileQuickActions
            SizedBox(height: 12.h),

// --- شبكة المنشورات (Posts Grid) ---
            _buildPostsGrid(context),

            SizedBox(height: 20.h),
          ],
        ),
      ),
    );
  }
}
Widget _buildPostsGrid(BuildContext context) {
  final textTheme = Theme.of(context).textTheme;

  // بيانات وهمية متكاملة للمنشورات
  final List<Map<String, dynamic>> completePosts = [
    {
      'image': 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?_gl=1*n3pebr*_ga*MjAyMzA5NjQ3NS4xNzY3NzAwMDU0*_ga_8JE65Q40S6*czE3NjgwNDUyODUkbzckZzEkdDE3NjgwNDUzNTEkajYwJGwwJGgw',
      'title': 'Premium Camera Lens',
      'price': '450.00',
      'likes': '1.2k',
      'description': 'High quality lens for professional photographers.',
    },
    {
      'image': 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?_gl=1*n3pebr*_ga*MjAyMzA5NjQ3NS4xNzY3NzAwMDU0*_ga_8JE65Q40S6*czE3NjgwNDUyODUkbzckZzEkdDE3NjgwNDUzNTEkajYwJGwwJGgw',
      'title': 'Smart Phone Pro',
      'price': '999.00',
      'likes': '850',
      'description': 'Latest generation smartphone with OLED displayLatest generation smartphone with OLED displayLatest generation smartphone with OLED display.',
    },
    // أضف المزيد هنا...
  ];

  return GridView.builder(
    padding: EdgeInsets.symmetric(horizontal: 10.w),
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemCount: completePosts.length,
    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 1, // عمودين لإعطاء مساحة للتفاصيل
      crossAxisSpacing: 12.w,
      mainAxisSpacing: 15.h,
      childAspectRatio: 1.5, // جعل الكرت مستطيلاً طويلاً
    ),
    itemBuilder: (context, index) {
      final post = completePosts[index];
      return Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(20),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. صورة المنتج مع زر الإعجاب (Overlay)
            Expanded(
              flex: 3,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
                    child: Image.network(post['image'], fit: BoxFit.cover),
                  ),
                  // السعر فوق الصورة بشكل أنيق
                  Positioned(
                    top: 10.r,
                    left: 10.r,
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(10.r),
                      ),
                      child: Text(
                        '\$${post['price']}',
                        style: TextStyle(color: Colors.white, fontSize: 12.sp, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 10.r,
                    right: 10.r,
                    child: CircleAvatar(
                      backgroundColor: AppColors.secondary.withAlpha(30) ,
                      radius: 15.r,
                        child: Icon(Icons.collections ,color:AppColors.secondary  ,)),
                  ),
                ],
              ),
            ),

            // 2. تفاصيل المنتج (العنوان والوصف)
            Expanded(
              flex: 2,
              child: Padding(
                padding: EdgeInsets.all(10.r),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          post['title'],
                          style: textTheme.titleSmall?.copyWith(fontWeight: FontWeight.bold),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          post['description'],
                          style: textTheme.bodySmall?.copyWith(color: Colors.grey, fontSize: 10.sp),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),

                    // 3. أزرار التفاعل (Like, Chat, Share)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.favorite_border, size: 20.sp, color: AppColors.secondary),
                            SizedBox(width: 4.w),
                            Text(post['likes'], style: textTheme.titleSmall?.copyWith(color: AppColors.secondary)),
                          ],
                        ),
                        Row(
                          children: [
                            _buildCircleIcon(Icons.edit ),
                            SizedBox(width: 6.w),
                            _buildCircleIcon(Icons.share_outlined),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      );
    },
  );
}

// ويدجت مساعد لأيقونات التفاعل الصغيرة
Widget _buildCircleIcon(IconData icon) {
  return Container(
    padding: EdgeInsets.all(4.r),
    decoration: BoxDecoration(
      color: AppColors.primary.withAlpha(20),
      shape: BoxShape.circle,
    ),
    child: Icon(icon, size: 18.sp, color: AppColors.primary),
  );
}