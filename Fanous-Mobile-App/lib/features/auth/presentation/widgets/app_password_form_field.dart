// ignore_for_file: prefer_const_constructors_in_immutables, must_be_immutable

import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';



class AppPasswordFormField extends StatelessWidget {
  AppPasswordFormField({
    super.key,
    required this.labelText,
    required this.icon,
    required this.textType,
    required this.textController,
    this.myValidator,
    this.counterText,
    required this.isObscure,
    required this.onTapForgetPassword,
    required this.onTapEyeIcon,
    required this.isShow,
  });
  final String labelText;
  final IconData icon;
  final TextInputType textType;
  final TextEditingController textController;
  final String? Function(String?)? myValidator;
  final void Function() onTapForgetPassword;
  final void Function() onTapEyeIcon;
  final String? counterText;
  final bool isShow;
  bool isObscure = false;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscuringCharacter: '*',
      obscureText: isObscure,
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
        suffixIcon: InkWell(
          onTap: onTapEyeIcon,
          child: Icon(
            isShow ? Icons.remove_red_eye_outlined : Icons.remove_red_eye,
            color: AppColors.primary,
          ),
        ),
        label: Text(labelText, textScaler: TextScaler.noScaling),
        floatingLabelAlignment: FloatingLabelAlignment.start,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        counter: InkWell(
          onTap: onTapForgetPassword,
          child: Text(
            '$counterText',
            style: Theme.of(context).textTheme.labelMedium!.copyWith(
              color: AppColors.primary,
              fontSize: 10,
            ),
          ),
        ),
        labelStyle: Theme.of(
          context,
        ).textTheme.bodyMedium!.copyWith(color: AppColors.primary),
        floatingLabelStyle: Theme.of(
          context,
        ).textTheme.labelLarge!.copyWith(color: AppColors.primary),
        fillColor: AppColors.surfaceLight,
        filled: true,
      ),
    );
  }
}
