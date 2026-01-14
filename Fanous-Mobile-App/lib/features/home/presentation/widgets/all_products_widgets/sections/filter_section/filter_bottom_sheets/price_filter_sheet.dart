import 'package:fanous/core/theme/app_colors.dart';
import 'package:flutter/material.dart';

class PriceFilterSheet extends StatefulWidget {
  final Function(double?, double?)? onApply;

  const PriceFilterSheet({
    super.key,
    this.onApply,
  });

  @override
  State<PriceFilterSheet> createState() => _PriceFilterSheetState();
}

class _PriceFilterSheetState extends State<PriceFilterSheet> {
  final double _minValue = 0;
  final double _maxValue = 1000000;
  RangeValues _currentRange = const RangeValues(0, 1000000);

  late TextEditingController _minController;
  late TextEditingController _maxController;

  @override
  void initState() {
    super.initState();
    _minController = TextEditingController(text: _currentRange.start.toInt().toString());
    _maxController = TextEditingController(text: _currentRange.end.toInt().toString());
  }

  @override
  void dispose() {
    _minController.dispose();
    _maxController.dispose();
    super.dispose();
  }

  void _onMinChanged(String val) {
    final parsed = double.tryParse(val);
    if (parsed != null && parsed >= _minValue && parsed <= _currentRange.end) {
      setState(() {
        _currentRange = RangeValues(parsed, _currentRange.end);
      });
    }
  }

  void _onMaxChanged(String val) {
    final parsed = double.tryParse(val);
    if (parsed != null && parsed <= _maxValue && parsed >= _currentRange.start) {
      setState(() {
        _currentRange = RangeValues(_currentRange.start, parsed);
      });
    }
  }

  void _syncControllers() {
    if (_minController.text != _currentRange.start.toInt().toString()) {
      _minController.text = _currentRange.start.toInt().toString();
    }
    if (_maxController.text != _currentRange.end.toInt().toString()) {
      _maxController.text = _currentRange.end.toInt().toString();
    }
  }

  @override
  Widget build(BuildContext context) {
    // تصغير طول البوتوم شيت
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    _syncControllers();
    
    return Container(
      height: MediaQuery.of(context).size.height * 0.37,
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // مؤشر صغير في الأعلى
          Container(
            width: 40,
            height: 5,
            margin: const EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
              color: colorScheme.outline.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Price',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: AppColors.secondary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: Icon(Icons.close, color: AppColors.secondary),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          // حقول الإدخال
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _minController,
                    keyboardType: TextInputType.number,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: colorScheme.onSurface,
                      fontWeight: FontWeight.bold,
                    ),
                    decoration: InputDecoration(
                      labelText: "Min",
                      fillColor: theme.cardColor,
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(6),
                        borderSide: BorderSide(color: AppColors.secondary),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(6),
                        borderSide: BorderSide(color: AppColors.secondary),
                      ),
                      labelStyle: TextStyle(
                        color: AppColors.secondary,
                      ),
                      contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    onChanged: (val) {
                      _onMinChanged(val);
                    },
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: TextField(
                    controller: _maxController,
                    keyboardType: TextInputType.number,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: colorScheme.onSurface,
                      fontWeight: FontWeight.bold,
                    ),
                    decoration: InputDecoration(
                      labelText: "Max",
                      fillColor: theme.cardColor,
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(6),
                        borderSide: BorderSide(color: AppColors.secondary),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(6),
                        borderSide: BorderSide(color: AppColors.secondary),
                      ),
                      labelStyle: TextStyle(
                        color: AppColors.secondary,
                      ),
                      contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    ),
                    onChanged: (val) {
                      _onMaxChanged(val);
                    },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 5),
          // مؤشر للسعر
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: RangeSlider(
              values: _currentRange,
              min: _minValue,
              max: _maxValue,
              divisions: 100,
              activeColor: AppColors.secondary,
              inactiveColor: theme.cardColor,
              labels: RangeLabels(
                _currentRange.start.toInt().toString(),
                _currentRange.end.toInt().toString(),
              ),
              onChanged: (RangeValues values) {
                setState(() {
                  // لا تسمح بأن يكون نهاية المدى أصغر من البداية
                  if (values.end >= values.start &&
                      values.start >= _minValue &&
                      values.end <= _maxValue) {
                    _currentRange = values;
                  }
                });
              },
            ),
          ),
          // عرض القيم المختارة
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 28.0, vertical: 2),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Min: ${_currentRange.start.toInt()}',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: colorScheme.onSurface,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Max: ${_currentRange.end.toInt()}',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: colorScheme.onSurface,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
          _buildConfirmButton(context),
        ],
      ),
    );
  }

  Widget _buildConfirmButton(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.cardColor,
        border: Border(
          top: BorderSide(
            color: colorScheme.outline.withOpacity(0.2),
            width: 0.5,
          ),
        ),
      ),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          onPressed: () {
            widget.onApply?.call(_currentRange.start, _currentRange.end);
            Navigator.pop(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: colorScheme.surfaceVariant,
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text(
            'Confirm',
            style: theme.textTheme.titleMedium?.copyWith(
              color: colorScheme.onSurface,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}

