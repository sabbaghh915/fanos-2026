class NotificationMockData {
  static List<Map<String, dynamic>> getNotificationsJson() {
    return [
      {
        "title": "Order Delivered!",
        "description": "Your order #FN-9852 has been delivered.",
        "time": "2 mins ago",
        "isRead": false,
      },
      {
        "title": "Big Sale is Live!",
        "description": "Get up to 50% off.",
        "time": "1 hour ago",
        "isRead": true,
      },
    ];
  }
}
