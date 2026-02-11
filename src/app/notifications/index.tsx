import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { getNotificationsWithUserData } from "../../data/mockData";

interface NotificationWithUser {
  id: string;
  type: "like" | "follow" | "comment" | "mention";
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
  postId?: string;
  isRead: boolean;
}

export default function Notifications() {
  const router = useRouter();
  const notificationsData = useMemo(
    () => getNotificationsWithUserData() as NotificationWithUser[],
    [],
  );
  const [notifications, setNotifications] =
    useState<NotificationWithUser[]>(notificationsData);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  function getIconName(type: string): keyof typeof Ionicons.glyphMap {
    switch (type) {
      case "like":
        return "heart";
      case "follow":
        return "person-add";
      case "comment":
        return "chatbubble";
      case "mention":
        return "at";
      default:
        return "notifications";
    }
  }

  function getIconColor(type: string): string {
    switch (type) {
      case "like":
        return "#FF6B6B";
      case "follow":
        return colors.primary.main;
      case "comment":
        return "#4ECDC4";
      case "mention":
        return "#FFD700";
      default:
        return colors.foreground.gray;
    }
  }

  const renderNotification = ({ item }: { item: NotificationWithUser }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.notificationItemUnread,
      ]}
      onPress={() => handleMarkAsRead(item.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.user.avatar }}
        style={styles.avatarContainer}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.action}>{item.action}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(item.type)}
          size={18}
          color={getIconColor(item.type)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.foreground.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.spacer} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={colors.foreground.gray}
            />
            <Text style={{ color: colors.foreground.gray, marginTop: 12 }}>
              No notifications yet
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.darker,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.foreground.white,
  },
  spacer: {
    width: 28,
  },
  unreadBanner: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
  },
  unreadText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background.dark,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.background.darker,
  },
  notificationItemUnread: {
    backgroundColor: colors.background.accent,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    flexShrink: 0,
  },
  avatar: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.background.dark,
  },
  contentContainer: {
    flex: 1,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.foreground.white,
    marginBottom: 4,
  },
  action: {
    fontSize: 13,
    color: colors.foreground.gray,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 11,
    color: colors.foreground.gray,
  },
  iconContainer: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: colors.background.dark,
    borderRadius: 8,
  },
});
