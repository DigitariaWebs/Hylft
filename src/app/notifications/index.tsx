import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";

interface Notification {
  id: string;
  type: "like" | "follow" | "comment" | "mention";
  user: {
    username: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
  postId?: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      username: "iron_legacy",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    action: "liked your post",
    timestamp: "5m ago",
    postId: "5",
    isRead: false,
  },
  {
    id: "2",
    type: "follow",
    user: {
      username: "gym_rat_mike",
      avatar: "https://i.pravatar.cc/150?img=24",
    },
    action: "started following you",
    timestamp: "12m ago",
    isRead: false,
  },
  {
    id: "3",
    type: "comment",
    user: {
      username: "shred_mode",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    action: "commented on your post",
    timestamp: "1h ago",
    postId: "3",
    isRead: true,
  },
  {
    id: "4",
    type: "like",
    user: {
      username: "legs_for_days",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    action: "liked your post",
    timestamp: "3h ago",
    postId: "2",
    isRead: true,
  },
  {
    id: "5",
    type: "mention",
    user: {
      username: "bulk_king",
      avatar: "https://i.pravatar.cc/150?img=22",
    },
    action: "mentioned you in a comment",
    timestamp: "5h ago",
    postId: "1",
    isRead: true,
  },
  {
    id: "6",
    type: "follow",
    user: {
      username: "alex_shred",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    action: "started following you",
    timestamp: "1d ago",
    isRead: true,
  },
];

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

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
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
