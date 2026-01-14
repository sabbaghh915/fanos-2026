import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

// استيراد الويدجتس الجديدة
import '../widgets/contact_info_section.dart';
import '../widgets/personal_info_section.dart';
import '../widgets/profile_image_section.dart';

class EditProfilePage extends StatelessWidget {
  EditProfilePage({super.key});
  final nameController = TextEditingController(text: 'ahmad');
  final bioController = TextEditingController(text: 'hello world');
  final phoneController = TextEditingController();
  final dateController = TextEditingController();
  final String gender = 'Male';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Edit ', style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: AppColors.primary)),
            Text('Profile', style:Theme.of(context).textTheme.headlineMedium?.copyWith(color: AppColors.secondary)),
          ],
        ),
        backgroundColor: AppColors.backgroundLight,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),
      backgroundColor: AppColors.backgroundLight,
      body: SingleChildScrollView(
        padding:  EdgeInsets.symmetric(horizontal: 16.w),
        child: Column(
          spacing: 20.h,
          children: [
            const ProfileImageSection(
              imageUrl: 'https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg?semt=ais_hybrid&w=740&q=80',
            ), // -- استخدام ويدجت الصورة

            PersonalInfoSection(
              nameController: nameController,
              bioController: bioController,
              dateController: dateController,
              gender: gender,
              onGenderChanged: (String? value) { },
            ),
            ContactInfoSection(
              phoneController: phoneController,
            ),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                icon:  Icon(Icons.save_alt_outlined ,size: 15.w,),
                label: Text('Save Changes', style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white,)),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Save Changes')),
                  );
                },
              ),
            ),
            SizedBox(height: 10.h),
          ],
        ),
      ),
    );
  }

}
