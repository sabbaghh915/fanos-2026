import 'package:flutter/material.dart';
import '../../../../../domain/entities/filter_type.dart';
import 'package:fanous/core/widgets/filter_card.dart';

class FilterButtonsRow extends StatefulWidget {
  final List<FilterType> filters;
  final int? initialSelectedIndex;
  final Function(int)? onFilterChanged;
  final Function(FilterType)? onFilterTap;
  final Function(FilterType)? onFilterClear;

  const FilterButtonsRow({
    super.key,
    required this.filters,
    this.initialSelectedIndex,
    this.onFilterChanged,
    this.onFilterTap,
    this.onFilterClear,
  });

  @override
  State<FilterButtonsRow> createState() => _FilterButtonsRowState();
}

class _FilterButtonsRowState extends State<FilterButtonsRow> {
  late int? selectedIndex;

  @override
  void initState() {
    super.initState();
    selectedIndex = widget.initialSelectedIndex;
  }

  @override
  void didUpdateWidget(FilterButtonsRow oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.initialSelectedIndex != oldWidget.initialSelectedIndex) {
      selectedIndex = widget.initialSelectedIndex;
    }
  }

  void _onFilterCardTap(int index) {
    final wasSelected = selectedIndex == index;
    // إذا كان الفلتر محدداً بالفعل، ألغِ التحديد فقط
    if (wasSelected) {
      setState(() {
        selectedIndex = null;
      });
      widget.onFilterChanged?.call(-1);
      // إرسال event لإلغاء الفلتر في الـ bloc
      widget.onFilterClear?.call(widget.filters[index]);
    } else {
      // إذا كان الفلتر غير محدد، حدده وافتح الـ bottom sheet
      setState(() {
        selectedIndex = index;
      });
      widget.onFilterChanged?.call(index);
      widget.onFilterTap?.call(widget.filters[index]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        vertical: 12.0,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
            child: SizedBox(
              height: 40.0,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                shrinkWrap: true,
                itemCount: widget.filters.length,
                itemBuilder: (context, index) {
                  return FilterCard(
                    label: widget.filters[index].label,
                    isSelected: selectedIndex == index,
                    onTap: () => _onFilterCardTap(index),
                  );
                },
              ),
            ),
          ),
          const SizedBox(width: 8.0),
          IconButton(
            onPressed: () {},
            icon: Icon(
              Icons.tune,
              color: Theme.of(context).colorScheme.onSurface,
              size: 24.0,
            ),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
          ),
        ],
      ),
    );
  }
}

