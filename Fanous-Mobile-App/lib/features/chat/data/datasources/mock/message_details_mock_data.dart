class MessageDetailsMockData {
  MessageDetailsMockData._();

  // Mock messages for different chats
  static List<Map<String, dynamic>> getMockMessagesForChat(String chatId) {
    // Return different messages based on chatId
    final messages = <Map<String, dynamic>>[];

    switch (chatId) {
      case '2': // Malik Faheem Awan
        messages.addAll([
          {
            'id': '1',
            'message': 'Hello, is this item still available?',
            'time': DateTime.now()
                .subtract(const Duration(hours: 2))
                .toIso8601String(),
            'isSent': false,
          },
          {
            'id': '2',
            'message':
                'yes available for details call or what\'s app 0346-77962...',
            'time': DateTime.now()
                .subtract(const Duration(hours: 1, minutes: 50))
                .toIso8601String(),
            'isSent': true,
          },
          {
            'id': '3',
            'message': 'Thank you! I will contact you soon.',
            'time': DateTime.now()
                .subtract(const Duration(hours: 1, minutes: 30))
                .toIso8601String(),
            'isSent': false,
          },
        ]);
        break;
      default:
        // Default messages for other chats
        messages.addAll([
          {
            'id': '1',
            'message': 'Hello!',
            'time': DateTime.now()
                .subtract(const Duration(days: 1))
                .toIso8601String(),
            'isSent': false,
          },
          {
            'id': '2',
            'message': 'Hi there!',
            'time': DateTime.now()
                .subtract(const Duration(days: 1, hours: -1))
                .toIso8601String(),
            'isSent': true,
          },
          {
            'id': '3',
            'message': 'How can I help you?',
            'time': DateTime.now()
                .subtract(const Duration(hours: 12))
                .toIso8601String(),
            'isSent': false,
          },
        ]);
    }

    return messages;
  }
}
