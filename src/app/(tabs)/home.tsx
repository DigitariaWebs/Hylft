import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import Post, { PostData } from "../../components/ui/Post";
import { colors } from "../../constants/colors";

// Mock data for posts
const MOCK_POSTS: PostData[] = [
  {
    id: "1",
    user: {
      username: "alex_shred",
      avatar: "https://i.pravatar.cc/150?img=12",
      bio: "NPC Competitor | Nutrition Coach",
    },
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
    likes: 1240,
    caption:
      "Heavy chest day! Feeling the mind-muscle connection 🔥 This volume is insane, 3 more weeks into my competition prep!",
    comments: 87,
    timestamp: "3h ago",
    isLiked: false,
    weight: "315 lbs",
    sets: "5",
    reps: "6",
    duration: "45 min",
  },
  {
    id: "2",
    user: {
      username: "iron_legacy",
      avatar: "https://i.pravatar.cc/150?img=14",
      bio: "IFBB Pro | Back Specialist",
    },
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    likes: 2156,
    caption:
      "Back and biceps pump! Rows are the foundation of a massive back. 🦾 Current stats: 22 inch arms pumped",
    comments: 156,
    timestamp: "5h ago",
    isLiked: true,
    weight: "405 lbs",
    sets: "4",
    reps: "8-10",
    duration: "60 min",
  },
  {
    id: "3",
    user: {
      username: "legs_for_days",
      avatar: "https://i.pravatar.cc/150?img=18",
      bio: "Quad specialist | Transformation happened in the gym 💪",
    },
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    likes: 1876,
    caption:
      "Quad day 🔥 Progressive overload at its finest! These wheels are growing like crazy during this bulk phase",
    comments: 124,
    timestamp: "6h ago",
    isLiked: false,
    weight: "765 lbs",
    sets: "5",
    reps: "10-12",
    duration: "90 min",
  },
  {
    id: "4",
    user: {
      username: "shred_mode",
      avatar: "https://i.pravatar.cc/150?img=20",
      bio: "Shredded year-round | Cardio & Calisthenics",
    },
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    likes: 2543,
    caption:
      "Dropset delts 💥 This shoulder workout left me DESTROYED! Striving for that round, 3D shoulder look for stage",
    comments: 198,
    timestamp: "7h ago",
    isLiked: true,
    weight: "60 lbs",
    sets: "6",
    reps: "12-15",
    duration: "45 min",
  },
  {
    id: "5",
    user: {
      username: "bulk_king",
      avatar: "https://i.pravatar.cc/150?img=22",
      bio: "On a mission to pack on mass | Meal prep every Sunday",
    },
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
    likes: 1654,
    caption:
      "Consuming 5500 calories today 🍗 Bulking season is HERE! Focusing on heavy compound movements and progressive overload. Goal: 225 lbs at 8% bodyfat",
    comments: 92,
    timestamp: "8h ago",
    isLiked: false,
    weight: "495 lbs",
    sets: "5",
    reps: "3-5",
    duration: "75 min",
  },
];

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>(MOCK_POSTS);
  const [refreshing, setRefreshing] = useState(false);

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
        <Image
          source={require("../../../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.darker,
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
});
