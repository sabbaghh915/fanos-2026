import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';

class AttachmentBottomSheet extends StatelessWidget {
  final Function(String filePath, String fileName, String attachmentType)
      onAttachmentSelected;

  const AttachmentBottomSheet({
    super.key,
    required this.onAttachmentSelected,
  });

  static void show(
    BuildContext context, {
    required Function(String filePath, String fileName, String attachmentType)
        onAttachmentSelected,
  }) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.backgroundDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
      ),
      builder: (bottomSheetContext) {
        return AttachmentBottomSheet(
          onAttachmentSelected: (filePath, fileName, attachmentType) {
            Navigator.pop(bottomSheetContext);
            onAttachmentSelected(filePath, fileName, attachmentType);
          },
        );
      },
    );
  }

  Future<void> _pickImageFromGallery(BuildContext context) async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(
      source: ImageSource.gallery,
    );
    if (image != null) {
      final fileName = image.path.split('/').last;
      onAttachmentSelected(image.path, fileName, 'image');
    }
  }

  Future<void> _takePhoto(BuildContext context) async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(
      source: ImageSource.camera,
    );
    if (image != null) {
      final fileName = image.path.split('/').last;
      onAttachmentSelected(image.path, fileName, 'image');
    }
  }

  Future<void> _pickFile(BuildContext context) async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();
    if (result != null) {
      final file = result.files.single;
      final filePath = file.path ?? '';
      final fileName = file.name;
      if (filePath.isNotEmpty) {
        onAttachmentSelected(filePath, fileName, 'file');
      } else {
        // Handle case where path might be null (web platform)
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('File selected: $fileName'),
              backgroundColor: AppColors.info,
              duration: const Duration(seconds: 2),
            ),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.only(top: 12.h),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // White line on the top
            Container(
              margin: EdgeInsets.only(bottom: 12.h),
              width: 40.w,
              height: 4.h,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(2.r),
              ),
            ),
            // "Choose Attachment" Text centered
            Center(
              child: Padding(
                padding: EdgeInsets.only(bottom: 12.h),
                child: Text(
                  "Choose Attachment",
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 12.sp,
                  ),
                ),
              ),
            ),
            Divider(color: Colors.grey[400], thickness: 0.2.h, height: 0),
            // Pick Image from Gallery
            ListTile(
              leading: Icon(
                Icons.photo_library_outlined,
                color: Colors.white,
                size: 18.sp,
              ),
              title: Text(
                "Pick Image from Gallery",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                  fontSize: 12.sp,
                ),
              ),
              onTap: () => _pickImageFromGallery(context),
            ),
            Divider(
              color: Colors.grey[400],
              thickness: 0.2.h,
              indent: 16.w,
              endIndent: 16.w,
              height: 0,
            ),
            // Take Photo with Camera
            ListTile(
              leading: Icon(
                Icons.camera_alt_outlined,
                color: Colors.white,
                size: 18.sp,
              ),
              title: Text(
                "Take Photo",
                style: TextStyle(color: Colors.white, fontSize: 12.sp),
              ),
              onTap: () => _takePhoto(context),
            ),
            Divider(
              color: Colors.grey[400],
              thickness: 0.2.h,
              indent: 16.w,
              endIndent: 16.w,
              height: 0,
            ),
            // Pick File
            ListTile(
              leading: Icon(
                Icons.insert_drive_file_outlined,
                color: Colors.white,
                size: 18.sp,
              ),
              title: Text(
                "Pick File",
                style: TextStyle(color: Colors.white, fontSize: 12.sp),
              ),
              onTap: () => _pickFile(context),
            ),
          ],
        ),
      ),
    );
  }
}

