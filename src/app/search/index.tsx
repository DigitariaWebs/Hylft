import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../../constants/colors";

interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "iron_legacy",
    avatar: "https://i.pravatar.cc/150?img=14",
    bio: "IFBB Pro | Back Specialist",
    isFollowing: false,
  },
  {
    id: "2",
    username: "gym_rat_mike",
    avatar: "https://i.pravatar.cc/150?img=24",
    bio: "Fitness enthusiast | Gym lover",
    isFollowing: true,
  },
  {
    id: "3",
    username: "shred_mode",
    avatar: "https://i.pravatar.cc/150?img=20",
    bio: "Shredded year-round | Cardio & Calisthenics",
    isFollowing: false,
  },
  {
    id: "4",
    username: "legs_for_days",
    avatar: "https://i.pravatar.cc/150?img=18",
    bio: "Quad specialist | Transformation happened in the gym",
    isFollowing: false,
  },
  {
    id: "5",
    username: "bulk_king",
    avatar: "https://i.pravatar.cc/150?img=22",
    bio: "On a mission to pack on mass | Meal prep every Sunday",
    isFollowing: true,
  },
  {
    id: "6",
    username: "alex_shred",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "NPC Competitor | Nutrition Coach",
    isFollowing: false,
  },
  {
    id: "7",
    username: "powerlifter_pro",
    avatar: "https://i.pravatar.cc/150?img=25",
    bio: "Powerlifting champion 🏋️",
    isFollowing: false,
  },
  {
    id: "8",
    username: "fit_journey",
    avatar: "https://i.pravatar.cc/150?img=30",
    bio: "Documenting my fitness journey",
    isFollowing: false,
  },
];

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, users]);

  const handleToggleFollow = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user,
      ),
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.followButton,
          item.isFollowing && styles.followingButton,
        ]}
        onPress={() => handleToggleFollow(item.id)}
      >
        <Text
          style={[
            styles.followButtonText,
            item.isFollowing && styles.followingButtonText,
          ]}
        >
          {item.isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
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
        <Text style={styles.headerTitle}>Find People</Text>
        <View style={styles.spacer} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.foreground.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search people..."
          placeholderTextColor={colors.foreground.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.foreground.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Users List */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="search-outline"
            size={48}
            color={colors.foreground.gray}
          />
          <Text style={styles.emptyText}>No users found</Text>
          <Text style={styles.emptySubtext}>
            Try searching for a different username
          </Text>
        </View>
      )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.background.darker,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: colors.foreground.white,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.background.darker,
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.foreground.white,
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    color: colors.foreground.gray,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary.main,
  },
  followingButton: {
    backgroundColor: colors.background.accent,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.background.dark,
  },
  followingButtonText: {
    color: colors.primary.main,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.foreground.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.foreground.gray,
    textAlign: "center",
  },
});
