import 'package:fanous/features/auth/presentation/page/sign_up_second_page.dart';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lottie/lottie.dart';

import '../../../../core/theme/app_colors.dart';
import '../widgets/auth_otp_form_field.dart';

class OtpVerify extends StatelessWidget {
  const OtpVerify({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          /// TOP IMAGE
          SizedBox(
        width: 300.w,
            height: 300.h,
            child: Lottie.asset(
              'assets/lottie/DATA SECURITY.json',
              fit: BoxFit.cover,
            ),
          ),
          /// CONTENT
          Expanded(
            child: Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
              ),
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    spacing: 16.h,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [

                      Text(
                        'Enter the 6-digit code sent to your email',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      /// OTP FIELD
                      AuthOtpFormField(
                        onSubmit: (code) {

                        },
                      ),
                      SizedBox(height: 8.h),
                      /// VERIFY BUTTON
                      SizedBox(
                        width: double.infinity,
                        height: 52.h,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>  SignUpSecondPage(),
                              ),
                            );
                          },
                          child: Text(
                            'Verify',
                            style: Theme.of(context)
                                .textTheme
                                .titleLarge
                                ?.copyWith(
                              color: AppColors.backgroundLight,
                            ),
                          ),
                        ),
                      ),

                      SizedBox(height: 8.h),
                      /// RESEND CODE
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "Didn't receive the code? ",
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                          GestureDetector(
                            onTap: () {
                            },
                            child: Text(
                              'Resend',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.copyWith(
                                color: AppColors.primaryLight,

                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
