import 'package:fanous/core/widgets/input_field_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SubCategorySearchSection extends StatelessWidget {
  const SubCategorySearchSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 12.0.sp),
      child: Row(
        textDirection: TextDirection.ltr,
        children: [
          IconButton(
            onPressed: Navigator.of(context).pop,
            icon: Icon(Icons.arrow_back_ios_new, size: 16.0.sp),
          ),
          Expanded(child: InputFieldWidget()),
        ],
      ),
    );
  }
}
