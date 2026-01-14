import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/auth/presentation/widgets/app_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ContactInfoSection extends StatelessWidget {
  const ContactInfoSection({
    super.key,
    required this.phoneController,
  });
  final TextEditingController phoneController;
  @override
  Widget build(BuildContext context) {
    return _buildSectionCard(
      context: context,
      title: 'Contact Information',
      icon: Icons.contact_phone_outlined,
      children: [
        _buildInfoTile(
          context: context,
          title: 'Contact info',
          subtitle: 'This is the number for buyers contacts, reminders, and other notifications.',
          field: AppTextFormField(
            labelText: 'Phone Number',
            textType: TextInputType.phone,
            textController: phoneController,
            icon: Icons.phone,
          ),
        ),
      ],
    );
  }
  // الدوال المساعدة تبقى هنا لأنها خاصة بهذا القسم فقط
  Widget _buildSectionCard({
    required BuildContext context,
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Card(
      elevation: 2.0,
      margin: EdgeInsets.zero,
      shadowColor: AppColors.primary.withAlpha(100),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding:  EdgeInsets.all(16.w),
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
    String? subtitle,
  }) {
    return Padding(
      padding: EdgeInsets.only(bottom: 16.h),
      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(color: AppColors.primaryDark)),
          SizedBox(height: 8.h),
          field,
          if (subtitle != null) ...[
            SizedBox(height: 6.h),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.w),
              child: Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.primary),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
