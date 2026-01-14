import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../widgets/appbar_section/appbar_section.dart';
import '../widgets/view_all_section/view_all_section.dart';
import '../widgets/category_section/category_section.dart';

class SubCategoryPage extends StatelessWidget {
  const SubCategoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SizedBox(height: 16.h),
          const AppbarSection(),
          const ViewAllSection(),
          const CategorySection(),
        ],
      ),
    );
  }
}
