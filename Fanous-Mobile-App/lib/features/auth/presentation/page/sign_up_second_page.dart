import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/auth/presentation/widgets/app_date_from_field.dart';
import 'package:fanous/features/auth/presentation/widgets/app_text_form_field.dart';
import 'package:fanous/features/main_scaffold/presentation/pages/main_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SignUpSecondPage extends StatelessWidget {
  SignUpSecondPage({super.key});

  /// ===== Form Key =====
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  /// ===== Controllers =====
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _birthDateController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surfaceVariantLight,
      resizeToAvoidBottomInset: true,
      body: SafeArea(
        child: Column(
          spacing: 10.h,
          children: [
            /// ===== Header Image =====
            Container(
              width: double.infinity,
              height: 180.h,
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/fanous_background2.png'),
                  fit: BoxFit.contain,
                ),
              ),
            ),

            /// ===== Bottom Container =====
            Expanded(
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primaryContainer,
                      spreadRadius: 3,
                      blurRadius: 8,
                      offset: const Offset(0, 3),
                    ),
                  ],
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(35),
                    topRight: Radius.circular(35),
                  ),
                ),
                child: SingleChildScrollView(
                  padding: EdgeInsets.only(
                    bottom: MediaQuery.of(context).viewInsets.bottom,
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(16.w),
                    child: Column(
                      spacing: 8.h,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        /// ===== Titles =====
                        Text(
                          "Almost there",
                          style: Theme.of(context)
                              .textTheme
                              .headlineSmall
                              ?.copyWith(
                            color: AppColors.primary.withAlpha(140),
                          ),
                        ),
                        Text(
                          "Let's finish setting up your profile",
                          maxLines: 2,
                          style: Theme.of(context)
                              .textTheme
                              .headlineMedium
                              ?.copyWith(color: AppColors.primary),
                        ),

                        SizedBox(height: 4.h),

                        /// ===== Form =====
                        Form(
                          key: _formKey,
                          child: Column(
                            spacing: 8.h,
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              AppTextFormField(
                                labelText: 'Name',
                                icon: Icons.person,
                                textType: TextInputType.name,
                                textController: _nameController,
                              ),

                              AppTextFormField(
                                labelText: 'Last Name',
                                icon: Icons.person_outline,
                                textType: TextInputType.name,
                                textController: _lastNameController,
                              ),

                              AppDateFromField(
                                labelText: 'Birth Date',
                                controller: _birthDateController,
                                onDateSelected: (date) {},
                              ),

                              ElevatedButton(
                                onPressed: () {
                                  if (_formKey.currentState?.validate() ??
                                      false) {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => MainScaffold(),
                                      ),
                                    );
                                  }
                                },
                                child: Text(
                                  'Finish',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleLarge
                                      ?.copyWith(
                                    color: AppColors.backgroundLight,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
