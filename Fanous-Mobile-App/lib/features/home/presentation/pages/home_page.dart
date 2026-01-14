import 'package:fanous/features/home/presentation/bloc/home_bloc/home_bloc.dart';
import 'package:fanous/features/home/presentation/bloc/home_bloc/home_event.dart';
import 'package:fanous/features/home/presentation/bloc/home_bloc/home_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../widgets/home_page/sections/navigation_section/navigation_section.dart';
import '../widgets/home_page/sections/search_section/search_section.dart';
import '../widgets/home_page/sections/image_slider_section/image_slider_section.dart';
import '../widgets/home_page/sections/category_section/category_section.dart';
import '../widgets/home_page/sections/products_section/products_section.dart';
import 'all_products_page.dart';

class HomePage extends StatelessWidget {
  final HomeBloc homeBloc;

  const HomePage({
    super.key,
    required this.homeBloc,
  });

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: homeBloc,
      child: const _HomePageContent(),
    );
  }
}

class _HomePageContent extends StatefulWidget {
  const _HomePageContent();

  @override
  State<_HomePageContent> createState() => _HomePageContentState();
}

class _HomePageContentState extends State<_HomePageContent> {
  @override
  void initState() {
    super.initState();
    // Load initial data
    final bloc = context.read<HomeBloc>();
    final currentState = bloc.state;
    if (currentState is HomeInitial) {
      bloc.add(LoadHomeData(currentState.selectedTab));
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      bottom: false,
      child: BlocBuilder<HomeBloc, HomeState>(
        builder: (context, state) {
          final selectedTab = state is HomeInitial
              ? state.selectedTab
              : state is HomeLoading
                  ? state.selectedTab
                  : state is HomeLoaded
                      ? state.selectedTab
                      : state is HomeError
                          ? state.selectedTab
                          : TabType.property;

          // Handle different states
          if (state is HomeLoading) {
            return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }

          if (state is HomeError) {
            return Scaffold(
              body: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Error: ${state.message}'),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        context.read<HomeBloc>().add(RefreshHomeData(selectedTab));
                      },
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
            );
          }

          if (state is HomeLoaded) {
            return CustomScrollView(
              slivers: [
                NavigationSection(
                  selectedTab: selectedTab,
                  onTabChanged: (tab) {
                    context.read<HomeBloc>().add(HomeTabChanged(tab));
                  },
                ),
                const SearchSection(),
                ImageSliderSection(images: state.sliderImages),
                CategorySection(categories: state.categories),
                ...List.generate(state.sections.length, (index) {
                  final section = state.sections[index];
                  return ProductsSection(
                    section: section,
                    onSeeAllTap: section.showSeeAll
                        ? () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => AllProductsPage(
                                  categoryId: section.title, // TODO: Use section.id when available
                                ),
                              ),
                            );
                          }
                        : null,
                  );
                }),
                const SliverToBoxAdapter(child: SizedBox(height: 100)),
              ],
            );
          }

          // Initial state - show loading
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        },
      ),
    );
  }
}
