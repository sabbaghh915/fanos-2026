import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/features/auth/presentation/page/otp_verify.dart';
import 'package:fanous/features/auth/presentation/page/sign_in_page.dart';
import 'package:fanous/features/auth/presentation/widgets/app_password_form_field.dart';
import 'package:fanous/features/auth/presentation/widgets/app_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SignUpPage extends StatelessWidget {
  SignUpPage({super.key});

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

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
                          "Welcome",
                          style: Theme.of(context)
                              .textTheme
                              .headlineSmall
                              ?.copyWith(
                            color: AppColors.primary.withAlpha(140),
                          ),
                        ),
                        Text(
                          "Lets create your account",
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
                                labelText: 'Phone Number',
                                icon: Icons.person,
                                textType: TextInputType.number,
                                textController: _phoneController,
                              ),

                              AppPasswordFormField(
                                labelText: 'Password',
                                icon: Icons.lock,
                                textType: TextInputType.visiblePassword,
                                textController: _passwordController,
                                isObscure: true,
                                isShow: true,
                                   counterText: '',
                                onTapEyeIcon: () {}, onTapForgetPassword: () {  },

                              ),

                              ElevatedButton(
                                onPressed: () {
                                  if (_formKey.currentState?.validate() ??
                                      false) {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) =>
                                        const OtpVerify(),
                                      ),
                                    );
                                  }
                                },
                                child: Text(
                                  'Sign Up',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleLarge
                                      ?.copyWith(
                                    color: AppColors.backgroundLight,
                                  ),
                                ),
                              ),

                              /// ===== Footer =====
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Do you have account? ',
                                    style: Theme.of(context)
                                        .textTheme
                                        .titleSmall,
                                  ),
                                  InkWell(
                                    onTap: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              SignInPage(),
                                        ),
                                      );
                                    },
                                    child: Text(
                                      'Sign In',
                                      style: Theme.of(context)
                                          .textTheme
                                          .titleSmall
                                          ?.copyWith(
                                        color: AppColors.secondary,
                                      ),
                                    ),
                                  ),
                                ],
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
