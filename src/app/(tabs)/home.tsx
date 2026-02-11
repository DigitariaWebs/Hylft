import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Post, { PostData } from "../../components/ui/Post";
import { Theme } from "../../constants/themes";
import { useTheme } from "../../contexts/ThemeContext";
import { getPostsWithUserData } from "../../data/mockData";

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.dark,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.background.darker,
    },
    logo: {
      width: 120,
      height: 40,
    },
    headerIcons: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    iconButton: {
      padding: 8,
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.primary.main,
    },
  });
}

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Example: 3 unread messages

  // Initialize posts with like state
  const [posts, setPosts] = useState<PostData[]>(
    () =>
      getPostsWithUserData().map((post) => ({
        id: post.id,
        user: {
          id: post.user.id,
          username: post.user.username,
          avatar: post.user.avatar,
          bio: post.user.bio,
        },
        images: post.images,
        likes: post.likes,
        caption: post.caption,
        comments: post.comments,
        timestamp: post.timestamp,
        isLiked: post.isLiked,
        weight: post.weight,
        reps: post.reps,
        sets: post.sets,
        duration: post.duration,
      })) as PostData[],
  );

  const styles = createStyles(theme);

  const handleLike = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderPost = useCallback(
    ({ item }: { item: PostData }) => <Post post={item} onLike={handleLike} />,
    [handleLike],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={theme.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.navigate("/search" as any)}
          >
            <Ionicons name="search" size={24} color={theme.foreground.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.navigate("/notifications" as any)}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.foreground.gray}
            />
            {unreadCount > 0 && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Feed */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary.main}
            colors={[theme.primary.main]}
          />
        }
      />
    </View>
  );
}
