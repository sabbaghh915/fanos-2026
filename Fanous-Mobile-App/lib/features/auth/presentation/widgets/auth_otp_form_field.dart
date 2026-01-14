import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';

import '../../../../core/theme/app_colors.dart';

class AuthOtpFormField extends StatelessWidget {
  const AuthOtpFormField({super.key, required this.onSubmit});

  final void Function(String) onSubmit;

  @override
  Widget build(BuildContext context) {
    return OtpTextField(
      autoFocus: true,
      clearText: true,
      numberOfFields: 6,
      filled: true,
      fillColor: AppColors.backgroundLight,
      cursorColor: AppColors.primary,
      borderColor: AppColors.primaryDark,
      focusedBorderColor: AppColors.primary,
      fieldWidth: 45.w,
      borderRadius: BorderRadius.circular(10),
      showFieldAsBox: true,
      onSubmit: onSubmit,
    );
  }
}
