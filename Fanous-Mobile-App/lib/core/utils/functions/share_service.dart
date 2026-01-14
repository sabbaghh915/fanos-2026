// import 'package:share_plus/share_plus.dart';

// class ShareService {
//   static Future<void> shareApp({String? message, String? subject}) async {
//     try {
//       // default message
//       final defaultMessage =
//           message ??
//           'Hello! Try the amazing Fanous app for buying and selling. '
//               'Download it now from the store:';

//       // app link
//       const appLink =
//           'https://play.google.com/store/apps/details?id=com.example.fanous';

//       final shareText = '$defaultMessage\n$appLink';

//       await SharePlus.instance.share(
//         ShareParams(
//           text: shareText,
//           subject:
//               subject ?? 'Try the amazing Fanous app for buying and selling',
//         ),
//       );
//     } catch (e) {
//       rethrow;
//     }
//   }
// }
