import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/features/address/domain/entities/address_entity.dart';
import 'package:fanous/features/address/presentation/bloc/address_add_bloc/address_add_bloc.dart';
import 'package:fanous/features/address/presentation/bloc/address_add_bloc/address_add_event.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class AddAddressPage extends StatefulWidget {
  const AddAddressPage({super.key});

  @override
  State<AddAddressPage> createState() => _AddAddressPageState();
}

class _AddAddressPageState extends State<AddAddressPage> {
  GoogleMapController? _mapController;
  Set<Marker> _markers = {};
  final CameraPosition _initialCameraPosition = const CameraPosition(
    target: LatLng(30.0444, 31.2357),
    zoom: 14.0,
  );

  void _onMapTap(LatLng position) {
    setState(() {
      _markers = {
        Marker(
          markerId: const MarkerId('selected_location'),
          position: position,
          infoWindow: const InfoWindow(title: 'الموقع المحدد'),
        ),
      };
    });
  }

  void _onMapCreated(GoogleMapController controller) {
    _mapController = controller;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text(
          'إضافة عنوان',
          style: TextStyle(color: AppColors.primary),
        ),
        backgroundColor: AppColors.backgroundLight,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back, color: AppColors.primary),
        ),
      ),
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: _initialCameraPosition,
            onMapCreated: _onMapCreated,
            onTap: _onMapTap,
            markers: _markers,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            mapType: MapType.normal,
          ),
          Positioned(
            bottom: 10.h,
            left: 10.w,
            right: 10.w,
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: AppColors.backgroundLight,
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    padding: EdgeInsets.all(AppSpacing.md),
                    child: Row(
                      children: [
                        const Icon(Icons.location_on, color: AppColors.primary),
                        SizedBox(width: AppSpacing.sm),
                        Text(
                          'العنوان',
                          style: TextStyle(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(width: 20.w),
                InkWell(
                  onTap: () {
                    final addressController = TextEditingController();
                    final descriptionController = TextEditingController();
                    showDialog(
                      context: context,
                      barrierDismissible: true,
                      useSafeArea: true,
                      builder: (BuildContext dialogContext) {
                        return AlertDialog(
                          insetPadding: EdgeInsets.symmetric(horizontal: 24.0),
                          title: Text(
                            'إضافة عنوان',
                            style: TextStyle(color: AppColors.primary),
                          ),
                          content: SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                TextField(
                                  controller: addressController,
                                  decoration: const InputDecoration(
                                    labelText: 'عنوان الموقع',
                                  ),
                                ),
                                const SizedBox(height: 16),
                                TextField(
                                  controller: descriptionController,
                                  decoration: const InputDecoration(
                                    labelText: 'وصف الموقع',
                                  ),
                                ),
                              ],
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(dialogContext).pop();
                              },
                              child: const Text('إلغاء'),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                final address = addressController.text.trim();
                                final description = descriptionController.text
                                    .trim();

                                if (address.isNotEmpty) {
                                  // استدعاء حدث AddAddressEvent وإرسال العنوان
                                  context.read<AddressAddBloc>().add(
                                    AddAddressEvent(
                                      AddressEntity(
                                        id: '',
                                        title: address,
                                        latitude: 213213,
                                        longitude: 123,
                                        createdAt: DateTime.now(),
                                        description: description,
                                      ),
                                    ),
                                  );
                                  Navigator.of(dialogContext).pop();
                                }
                              },
                              child: const Text('حفظ'),
                            ),
                          ],
                        );
                      },
                      useRootNavigator: true,
                    );
                  },
                  child: Container(
                    height: 48.h,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                    child: const Text(
                      'Add',
                      style: TextStyle(color: AppColors.backgroundLight),
                    ),
                  ),
                ),
              ],
            ),
          ),

          Positioned(
            top: 10.h,
            left: 10.w,
            // this to get the current location
            child: InkWell(
              onTap: () {
                //todo: change the location to the current location
                _mapController?.animateCamera(
                  CameraUpdate.newLatLngZoom(LatLng(30.0444, 31.2357), 14.0),
                );
              },
              child: Container(
                decoration: BoxDecoration(
                  color: AppColors.backgroundLight.withAlpha(200),
                  borderRadius: BorderRadius.circular(100.r),
                ),
                padding: EdgeInsets.all(AppSpacing.md),
                child: const Icon(Icons.location_on, color: AppColors.primary),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
