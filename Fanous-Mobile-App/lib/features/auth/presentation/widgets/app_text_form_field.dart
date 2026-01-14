import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';



class AppTextFormField extends StatelessWidget {
  final String labelText;
  final IconData icon;
  final TextInputType textType;
  final TextEditingController textController;
  final String? Function(String?)? myValidator;

  const AppTextFormField({
    super.key,
    required this.labelText,
    required this.icon,
    required this.textType,
    required this.textController,
    this.myValidator,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      validator: myValidator,
      controller: textController,
      keyboardType: textType,
      cursorColor: AppColors.primary,
      cursorWidth: 1,
      cursorHeight: 18,
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderSide: BorderSide(color: AppColors.primaryDark, width: 1),
          borderRadius: BorderRadius.circular(12),
        ),
        disabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.red[300]!, width: 1),
          borderRadius: BorderRadius.circular(12),
        ),
        errorBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.red[300]!, width: 2),
          borderRadius: BorderRadius.circular(12),
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: AppColors.primary, width: 1),
          borderRadius: BorderRadius.circular(12),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: AppColors.primary, width: 2),
          borderRadius: BorderRadius.circular(12),
        ),
        errorStyle: Theme.of(
          context,
        ).textTheme.bodyMedium!.copyWith(color: Colors.red, fontSize: 12),
        prefixIcon: Icon(icon, color: AppColors.primary, size: 26),
        label: Text(labelText, textScaler: TextScaler.noScaling),
        floatingLabelAlignment: FloatingLabelAlignment.start,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        labelStyle: Theme.of(
          context,
        ).textTheme.bodyMedium!.copyWith(color: AppColors.primary),
        floatingLabelStyle: Theme.of(
          context,
        ).textTheme.labelLarge!.copyWith(color: AppColors.primary),
        fillColor: AppColors.backgroundLight,
        filled: true,
      ),
    );
  }
}
