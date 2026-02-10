import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export type PostData = {
  id: string;
  user: {
    username: string;
    avatar: string;
    bio?: string;
  };
  image: string;
  likes: number;
  caption: string;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  // Bodybuilding specific
  weight?: string;
  reps?: string;
  sets?: string;
  duration?: string;
};

type PostProps = {
  post: PostData;
  onLike: (postId: string) => void;
};

const Post = memo(
  ({ post, onLike }: PostProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.user.username}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={theme.foreground.white}
            />
          </TouchableOpacity>
        </View>

        {/* Metrics Info - Above Image */}
        {(post.weight || post.reps || post.sets) && (
          <View style={styles.metricsSection}>
            <View style={styles.metricsContainer}>
              {post.weight && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Weight</Text>
                  <Text style={styles.metricValue}>{post.weight}</Text>
                </View>
              )}
              {post.sets && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Sets</Text>
                  <Text style={styles.metricValue}>{post.sets}</Text>
                </View>
              )}
              {post.reps && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Reps</Text>
                  <Text style={styles.metricValue}>{post.reps}</Text>
                </View>
              )}
              {post.duration && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Duration</Text>
                  <Text style={styles.metricValue}>{post.duration}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Post Image */}
        <Image source={{ uri: post.image }} style={styles.postImage} />

        {/* Post Actions */}
        <View style={styles.actionsContainer}>
          <View style={styles.leftActions}>
            <TouchableOpacity
              onPress={() => onLike(post.id)}
              style={styles.actionButton}
            >
              <Ionicons
                name={post.isLiked ? "trophy" : "trophy-outline"}
                size={28}
                color={post.isLiked ? "#FFD700" : theme.foreground.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="chatbubble-outline"
                size={26}
                color={theme.foreground.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="share-outline"
                size={26}
                color={theme.foreground.white}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="bookmark-outline"
              size={26}
              color={theme.foreground.white}
            />
          </TouchableOpacity>
        </View>

        {/* Post Info */}
        <View style={styles.postInfo}>
          <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
          <Text style={styles.caption}>
            <Text style={styles.username}>{post.user.username} </Text>
            {post.caption}
          </Text>
          {post.comments > 0 && (
            <TouchableOpacity>
              <Text style={styles.viewComments}>
                View all {post.comments} comments
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the post data or like state changes
    return (
      prevProps.post.id === nextProps.post.id &&
      prevProps.post.isLiked === nextProps.post.isLiked &&
      prevProps.post.likes === nextProps.post.likes
    );
  },
);

Post.displayName = "Post";

function createStyles(theme: any) {
  return StyleSheet.create({
    postContainer: {
      marginBottom: 36,
    },
    postHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
    },
    username: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.foreground.white,
    },
    timestamp: {
      fontSize: 12,
      color: theme.foreground.gray,
      marginTop: 2,
    },
    moreButton: {
      padding: 4,
    },
    postImage: {
      width: "100%",
      height: 400,
      backgroundColor: theme.background.darker,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    leftActions: {
      flexDirection: "row",
      gap: 12,
    },
    actionButton: {
      padding: 4,
    },
    metricsSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.background.darker,
    },
    postInfo: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    metadataContainer: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 12,
      flexWrap: "wrap",
    },
    metadataTag: {
      backgroundColor: theme.primary.main,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    metadataLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.background.dark,
    },
    metricsContainer: {
      flexDirection: "row",
      gap: 12,
      flexWrap: "wrap",
    },
    metricItem: {
      flex: 1,
      minWidth: 70,
      alignItems: "center",
      paddingVertical: 6,
    },
    metricLabel: {
      fontSize: 11,
      color: theme.foreground.gray,
      marginBottom: 4,
    },
    metricValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    likes: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.foreground.white,
      marginBottom: 8,
    },
    caption: {
      fontSize: 14,
      color: theme.foreground.white,
      lineHeight: 20,
      marginBottom: 4,
    },
    viewComments: {
      fontSize: 14,
      color: theme.foreground.gray,
      marginTop: 4,
    },
  });
}

export default Post;
