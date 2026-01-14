import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/core/widgets/app_snack_bar.dart';
import 'package:fanous/features/address/presentation/bloc/address_add_bloc/address_add_bloc.dart';
import 'package:fanous/features/address/presentation/pages/add_address_page.dart';
import 'package:fanous/features/address/presentation/widgets/address_page_widgets/address_item_widget.dart';
import 'package:fanous/features/address/presentation/widgets/address_page_widgets/empty_addresses_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/di/dependency_injection.dart';
import '../bloc/address_list_bloc/address_list_bloc.dart';
import '../bloc/address_list_bloc/address_list_event.dart';
import '../bloc/address_list_bloc/address_list_state.dart';

class AddressesPage extends StatelessWidget {
  const AddressesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final backgroundColor = isDark
        ? AppColors.backgroundDark
        : AppColors.backgroundLight;

    return BlocProvider(
      create: (context) =>
          getIt<AddressListBloc>()..add(const LoadAddressesEvent()),
      child: Scaffold(
        backgroundColor: backgroundColor,
        appBar: AppBar(
          title: Align(
            alignment: Alignment.centerRight,
            child: Text(
              'عناويني',
              style: TextStyle(
                color: isDark ? Colors.white : AppColors.primary,
                fontSize: 18.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          backgroundColor: backgroundColor,
          iconTheme: IconThemeData(
            color: isDark ? Colors.white : AppColors.primary,
          ),
          elevation: 0,
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(1.h),
            child: Container(
              height: 1.h,
              color: isDark
                  ? AppColors.surfaceVariantDark
                  : AppColors.surfaceVariantLight,
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => BlocProvider(
                  create: (context) => getIt<AddressAddBloc>(),
                  child: const AddAddressPage(),
                ),
              ),
            ).then((_) {
              // إعادة تحميل العناوين عند العودة من صفحة الإضافة
              if (context.mounted) {
                context.read<AddressListBloc>().add(
                  const RefreshAddressesEvent(),
                );
              }
            });
          },
          backgroundColor: AppColors.primary,
          icon: Icon(Icons.add_location, color: Colors.white, size: 20.sp),
          label: Text(
            'إضافة عنوان',
            style: TextStyle(
              color: Colors.white,
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        body: BlocConsumer<AddressListBloc, AddressListState>(
          listener: (context, state) {
            if (state is AddressListError) {
              AppSnackBar.showPrimarySnackBar(context, state.message);
            } else if (state is AddressDeleted) {
              AppSnackBar.showSecondarySnackBar(context, state.message);
            } else if (state is AddressDefaultSet) {
              AppSnackBar.showPrimarySnackBar(context, state.message);
            }
          },
          builder: (context, state) {
            if (state is AddressListLoading) {
              return Center(
                child: CircularProgressIndicator(color: AppColors.primary),
              );
            }

            if (state is AddressListLoaded) {
              final addresses = state.addresses;

              if (addresses.isEmpty) {
                return const EmptyAddressesWidget();
              }

              return RefreshIndicator(
                onRefresh: () async {
                  context.read<AddressListBloc>().add(
                    const RefreshAddressesEvent(),
                  );
                },
                color: AppColors.primary,
                child: ListView.builder(
                  padding: EdgeInsets.all(AppSpacing.md),
                  itemCount: addresses.length,
                  itemBuilder: (context, index) {
                    final address = addresses[index];
                    return Padding(
                      padding: EdgeInsets.only(bottom: AppSpacing.md),
                      child: AddressItemWidget(address: address),
                    );
                  },
                ),
              );
            }

            if (state is AddressListError) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.error_outline, size: 64.sp, color: Colors.red),
                    SizedBox(height: AppSpacing.md),
                    Text(
                      state.message,
                      style: TextStyle(
                        color: isDark ? Colors.white : Colors.black,
                        fontSize: 16.sp,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: AppSpacing.md),
                    ElevatedButton(
                      onPressed: () {
                        context.read<AddressListBloc>().add(
                          const LoadAddressesEvent(),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                      ),
                      child: Text(
                        'إعادة المحاولة',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
              );
            }
            return const SizedBox.shrink();
          },
        ),
      ),
    );
  }
}
