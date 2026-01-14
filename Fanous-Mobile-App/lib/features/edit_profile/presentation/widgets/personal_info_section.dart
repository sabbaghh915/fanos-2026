import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/auth/presentation/widgets/app_date_from_field.dart';
import 'package:fanous/features/auth/presentation/widgets/app_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'drop_down_field.dart';

class PersonalInfoSection extends StatelessWidget {
  const PersonalInfoSection({
    super.key,
    required this.nameController,
    required this.bioController,
    required this.dateController,
    required this.gender,
    required this.onGenderChanged,
  });

  final TextEditingController nameController;
  final TextEditingController bioController;
  final TextEditingController dateController;
  final String? gender;
  final ValueChanged<String?> onGenderChanged;

  @override
  Widget build(BuildContext context) {
    return _buildSectionCard(
      context: context,
      title: 'Personal Information',
      icon: Icons.person_outline,
      children: [
        _buildInfoTile(
          context: context,
          title: 'Your Name',
          field: AppTextFormField(
            labelText: 'Name',
            textController: nameController,
            textType: TextInputType.name,
            icon: Icons.person,
          ),
        ),
        _buildInfoTile(
          context: context,
          title: 'Something about you',
          field: AppTextFormField(
            labelText: 'Enter here',
            textController: bioController,
            textType: TextInputType.multiline,
            icon: Icons.edit_note,
          ),
        ),
        _buildInfoTile(
          context: context,
          title: 'Gender',
          field: AppDropdownField<String>(
            hint: 'Select Gender',
            value: gender,
            onChanged: onGenderChanged,
            items: const [
              DropdownMenuItem(value: 'Male', child: Text('Male') ),
              DropdownMenuItem(value: 'Female', child: Text('Female')),
            ],
          ),
        ),
        _buildInfoTile(
          context: context,
          title: 'BirthDate',
          field: AppDateFromField(
            labelText: 'Select Date',
            controller: dateController,
            onDateSelected: (DateTime? date) {},
          ),
        ),
      ],
    );
  }

  Widget _buildSectionCard({
    required BuildContext context,
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Card(
      elevation: 2.0,
      margin: EdgeInsets.zero,
      shadowColor: AppColors.primary.withAlpha(80),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              spacing: 8.w,
              children: [
                Icon(icon, color: AppColors.primary),

                Text(title, style: Theme.of(context).textTheme.titleLarge),
              ],
            ),
             Divider(height: 24.h),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildInfoTile({
    required BuildContext context,
    required String title,
    required Widget field,
  }) {
    return Padding(
      padding: EdgeInsets.only(bottom: 16.h),
      child: Column(
        spacing: 8.h,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context)
                .textTheme
                .titleMedium
                ?.copyWith(color: AppColors.primaryDark),
          ),

          field,
        ],
      ),
    );
  }
}
