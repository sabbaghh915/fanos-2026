enum DateFilterPeriod {
  today,
  thisWeek,
  thisMonth,
  last3Months,
  last6Months,
  lastYear,
  all,
}

extension DateFilterPeriodExtension on DateFilterPeriod {
  String get label {
    switch (this) {
      case DateFilterPeriod.today:
        return 'Today';
      case DateFilterPeriod.thisWeek:
        return 'This Week';
      case DateFilterPeriod.thisMonth:
        return 'This Month';
      case DateFilterPeriod.last3Months:
        return 'Last 3 Months';
      case DateFilterPeriod.last6Months:
        return 'Last 6 Months';
      case DateFilterPeriod.lastYear:
        return 'Last Year';
      case DateFilterPeriod.all:
        return 'All';
    }
  }
}

