import 'package:intl/intl.dart';
import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';
class AppDateFromField extends StatelessWidget {
  final String labelText;
  final TextEditingController controller;
  final Function(DateTime?) onDateSelected;
  final String? Function(String?)? validator;
  final DateTime? initialDate;
  final DateTime? firstDate;
  final DateTime? lastDate;
  const AppDateFromField({
    super.key,
    required this.labelText,
    required this.controller,
    required this.onDateSelected,
    this.validator,
    this.initialDate,
    this.firstDate,
    this.lastDate,
  });

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: initialDate ?? DateTime.now(),
      firstDate: firstDate ?? DateTime(1900),
      lastDate: lastDate ?? DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary:  AppColors.primary,
              onPrimary: Colors.white,
              surface: Colors.white,
              onSurface: AppColors.primary,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      controller.text = DateFormat('yyyy/MM/dd').format(picked);
      onDateSelected(picked);
    } else {
      onDateSelected(null);
    }
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      validator: validator,
      controller: controller,
      readOnly: true,
      onTap: () => _selectDate(context),
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
        prefixIcon: Icon(
          Icons.calendar_today,
          color: AppColors.primary,
          size: 26,
        ),
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
