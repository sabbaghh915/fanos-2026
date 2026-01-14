import 'package:fanous/core/theme/app_colors.dart';
import 'package:fanous/core/theme/app_spacing.dart';
import 'package:fanous/core/widgets/app_snack_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DeleteAccountConfirmationDialog extends StatefulWidget {
  const DeleteAccountConfirmationDialog({super.key});

  static Future<void> show(BuildContext context) async {
    return showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const DeleteAccountConfirmationDialog(),
    );
  }

  @override
  State<DeleteAccountConfirmationDialog> createState() =>
      _DeleteAccountConfirmationDialogState();
}

class _DeleteAccountConfirmationDialogState
    extends State<DeleteAccountConfirmationDialog> {
  final _confirmationController = TextEditingController();
  static const String _confirmationText = 'DELETE';
  bool _isLoading = false;

  @override
  void dispose() {
    _confirmationController.dispose();
    super.dispose();
  }

  bool get _isConfirmationValid =>
      _confirmationController.text.trim().toUpperCase() == _confirmationText;

  Future<void> _handleDeleteAccount() async {
    if (!_isConfirmationValid) {
      AppSnackBar.showPrimarySnackBar(
        context,
        'Please type "$_confirmationText" to confirm',
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      await Future.delayed(const Duration(seconds: 1));

      if (!mounted) return;

      AppSnackBar.showPrimarySnackBar(context, 'Account deleted successfully');

      Navigator.of(context).pop();
    } catch (e) {
      if (!mounted) return;

      AppSnackBar.showPrimarySnackBar(
        context,
        'An error occurred while deleting the account',
      );
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.borderRadiusLarge),
      ),
      child: Padding(
        padding: EdgeInsets.all(AppSpacing.lg),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  padding: EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: AppColors.errorContainer,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.warning_amber_rounded,
                    color: AppColors.error,
                    size: AppSpacing.iconSizeXLarge,
                  ),
                ),
              ),
              SizedBox(height: AppSpacing.lg),
              Center(
                child: Text(
                  'Delete account',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppColors.error,
                  ),
                ),
              ),
              SizedBox(height: AppSpacing.md),
              Text(
                'Are you sure you want to delete your account? This action cannot be undone.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: AppSpacing.lg),
              Text(
                'Type "$_confirmationText" to confirm:',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: isDark
                      ? AppColors.textTertiaryDark
                      : AppColors.textTertiaryLight,
                ),
              ),
              SizedBox(height: AppSpacing.sm),
              TextField(
                controller: _confirmationController,
                decoration: InputDecoration(
                  hintText: _confirmationText,
                  prefixIcon: const Icon(Icons.edit_outlined),
                  errorText:
                      _confirmationController.text.isNotEmpty &&
                          !_isConfirmationValid
                      ? 'Confirmation text is incorrect'
                      : null,
                ),
                onChanged: (_) => setState(() {}),
              ),
              SizedBox(height: AppSpacing.lg),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: _isLoading
                        ? null
                        : () {
                            Navigator.of(context).pop();
                          },
                    child: const Text('Cancel'),
                  ),
                  SizedBox(width: AppSpacing.sm),
                  ElevatedButton(
                    onPressed: _isLoading || !_isConfirmationValid
                        ? null
                        : _handleDeleteAccount,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.error,
                      foregroundColor: Colors.white,
                    ),
                    child: _isLoading
                        ? SizedBox(
                            width: 20.0.w,
                            height: 20.0.h,
                            child: const CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Text('Delete'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
