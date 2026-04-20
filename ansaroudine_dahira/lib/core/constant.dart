enum UserRole {
  ADMIN,
  MEMBER;

  String get value => name;
}

enum UserStatus {
  ACTIVE,
  INACTIVE;

  String get value => name;
}

enum EventStatus {
  UPCOMING,
  ONGOING,
  COMPLETED;

  String get value => name;
}

enum NotificationType {
  INFO,
  SUCCESS,
  WARNING,
  ERROR;

  String get value => name;
}

enum DocumentCategory {
  ADMIN,
  MEMBER,
  EVENT,
  OTHER;

  String get value => name;
}

enum MessageType {
  DIRECT,
  BROADCAST,
  SUPPORT;

  String get value => name;
}
