import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/all_products/all_products_bloc.dart';
import '../bloc/all_products/all_products_event.dart';
import '../bloc/all_products/all_products_state.dart';
import '../widgets/all_products_widgets/sections/header_section/header_section.dart';
import '../widgets/all_products_widgets/sections/filter_section/filter_section.dart';
import '../widgets/all_products_widgets/sections/results_info_section/results_info_section.dart';
import '../widgets/all_products_widgets/sections/products_section/products_section.dart';
import '../../../../core/di/dependency_injection.dart';

class AllProductsPage extends StatefulWidget {
  final String categoryId;

  const AllProductsPage({
    super.key,
    required this.categoryId,
  });

  @override
  State<AllProductsPage> createState() => _AllProductsPageState();
}

class _AllProductsPageState extends State<AllProductsPage> {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<AllProductsBloc>()
        ..add(LoadAllProductsEvent(widget.categoryId)),
      child: Scaffold(
        backgroundColor: AppColors.surfaceLight,
        body: SafeArea(
          bottom: false,
          child: BlocBuilder<AllProductsBloc, AllProductsState>(
            builder: (context, state) {
              final theme = Theme.of(context);
              final colorScheme = theme.colorScheme;
              
              if (state is AllProductsLoading) {
                return Center(
                  child: CircularProgressIndicator(
                    color: colorScheme.primary,
                  ),
                );
              }

              if (state is AllProductsError) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Error: ${state.message}',
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: colorScheme.error,
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {
                          context.read<AllProductsBloc>().add(
                                LoadAllProductsEvent(widget.categoryId),
                              );
                        },
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                );
              }

              if (state is AllProductsLoaded) {
                return CustomScrollView(
                  slivers: [
                    const HeaderSection(),
                    FilterSection(state: state),
                    ResultsInfoSection(
                      categoryTitle: state.categoryId, // TODO: Use category title when available
                      productsCount: state.filteredProducts.length,
                    ),
                    ProductsSection(
                      products: state.filteredProducts,
                      onProductTap: (product) {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => const Placeholder(),
                          ),
                        );
                      },
                    ),
                  ],
                );
              }

              return const SizedBox.shrink();
            },
          ),
        ),
      ),
    );
  }
}
