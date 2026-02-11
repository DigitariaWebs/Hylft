// Centralized mock data for the entire application

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  isPrivate: boolean;
  isFollowing: boolean;
}

export interface Post {
  id: string;
  userId: string;
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
}

export interface Notification {
  id: string;
  type: "like" | "follow" | "comment" | "mention";
  userId: string;
  action: string;
  timestamp: string;
  postId?: string;
  isRead: boolean;
}

// ============================================
// USERS DATA
// ============================================
export const USERS: Record<string, User> = {
  "1": {
    id: "1",
    username: "alex_shred",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "NPC Competitor | Nutrition Coach 🏆",
    followers: 4231,
    following: 234,
    postsCount: 2,
    isPrivate: false,
    isFollowing: false,
  },
  "2": {
    id: "2",
    username: "iron_legacy",
    avatar: "https://i.pravatar.cc/150?img=14",
    bio: "IFBB Pro | Back Specialist 💪",
    followers: 2543,
    following: 487,
    postsCount: 1,
    isPrivate: false,
    isFollowing: false,
  },
  "3": {
    id: "3",
    username: "shred_mode",
    avatar: "https://i.pravatar.cc/150?img=20",
    bio: "Shredded year-round | Cardio & Calisthenics 🔥",
    followers: 3891,
    following: 612,
    postsCount: 3,
    isPrivate: false,
    isFollowing: false,
  },
  "4": {
    id: "4",
    username: "legs_for_days",
    avatar: "https://i.pravatar.cc/150?img=18",
    bio: "Quad specialist | Transformation 💪",
    followers: 2187,
    following: 543,
    postsCount: 1,
    isPrivate: false,
    isFollowing: true,
  },
  "5": {
    id: "5",
    username: "bulk_king",
    avatar: "https://i.pravatar.cc/150?img=22",
    bio: "On a mission to pack on mass 🍗",
    followers: 1654,
    following: 432,
    postsCount: 1,
    isPrivate: false,
    isFollowing: true,
  },
  "6": {
    id: "6",
    username: "gym_rat_mike",
    avatar: "https://i.pravatar.cc/150?img=24",
    bio: "Fitness enthusiast | Gym lover 🏋️",
    followers: 1205,
    following: 342,
    postsCount: 0,
    isPrivate: true,
    isFollowing: false,
  },
  "7": {
    id: "7",
    username: "powerlifter_pro",
    avatar: "https://i.pravatar.cc/150?img=25",
    bio: "Powerlifting champion 🏋️",
    followers: 3421,
    following: 198,
    postsCount: 0,
    isPrivate: false,
    isFollowing: false,
  },
  "8": {
    id: "8",
    username: "fit_journey",
    avatar: "https://i.pravatar.cc/150?img=30",
    bio: "Documenting my fitness journey 📸",
    followers: 876,
    following: 654,
    postsCount: 0,
    isPrivate: false,
    isFollowing: false,
  },
};

// ============================================
// POSTS DATA
// ============================================
export const POSTS: Post[] = [
  {
    id: "1",
    userId: "1",
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
    userId: "2",
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
    userId: "4",
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
    userId: "3",
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
    userId: "5",
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
  {
    id: "6",
    userId: "1",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800",
    likes: 987,
    caption:
      "Arm day pump achieved! 💪 Biceps and triceps superset warfare. These gains aren't gonna make themselves!",
    comments: 64,
    timestamp: "10h ago",
    isLiked: false,
    weight: "50 lbs",
    sets: "4",
    reps: "12",
    duration: "35 min",
  },
  {
    id: "7",
    userId: "3",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    likes: 1876,
    caption:
      "Back and biceps pump day 🦾 Rows are the foundation of a massive back. Current stats: 22 inch arms pumped",
    comments: 142,
    timestamp: "1d ago",
    isLiked: false,
    weight: "405 lbs",
    sets: "4",
    reps: "8-10",
    duration: "60 min",
  },
  {
    id: "8",
    userId: "3",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    likes: 1654,
    caption:
      "Leg day never skipped 🔥 Quad day! Progressive overload at its finest! These wheels are growing like crazy during this bulk phase",
    comments: 98,
    timestamp: "2d ago",
    isLiked: false,
    weight: "765 lbs",
    sets: "5",
    reps: "10-12",
    duration: "90 min",
  },
];

// ============================================
// NOTIFICATIONS DATA
// ============================================
export const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "like",
    userId: "2",
    action: "liked your post",
    timestamp: "5m ago",
    postId: "5",
    isRead: false,
  },
  {
    id: "2",
    type: "follow",
    userId: "6",
    action: "started following you",
    timestamp: "12m ago",
    isRead: false,
  },
  {
    id: "3",
    type: "comment",
    userId: "3",
    action: "commented on your post",
    timestamp: "1h ago",
    postId: "3",
    isRead: true,
  },
  {
    id: "4",
    type: "like",
    userId: "4",
    action: "liked your post",
    timestamp: "3h ago",
    postId: "2",
    isRead: true,
  },
  {
    id: "5",
    type: "mention",
    userId: "5",
    action: "mentioned you in a comment",
    timestamp: "5h ago",
    postId: "1",
    isRead: true,
  },
  {
    id: "6",
    type: "follow",
    userId: "1",
    action: "started following you",
    timestamp: "1d ago",
    isRead: true,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get user by ID
 */
export function getUserById(userId: string): User | undefined {
  return USERS[userId];
}

/**
 * Get all users as an array
 */
export function getAllUsers(): User[] {
  return Object.values(USERS);
}

/**
 * Get posts for a specific user
 */
export function getPostsByUserId(userId: string): Post[] {
  return POSTS.filter((post) => post.userId === userId);
}

/**
 * Get post by ID
 */
export function getPostById(postId: string): Post | undefined {
  return POSTS.find((post) => post.id === postId);
}

/**
 * Get all posts with populated user data
 */
export function getPostsWithUserData() {
  return POSTS.map((post) => ({
    ...post,
    user: USERS[post.userId],
  }));
}

/**
 * Get notifications with populated user data
 */
export function getNotificationsWithUserData() {
  return NOTIFICATIONS.map((notification) => ({
    ...notification,
    user: USERS[notification.userId],
  }));
}

/**
 * Get user profile with posts
 */
export function getUserProfile(userId: string) {
  const user = USERS[userId];
  if (!user) return null;

  const userPosts = getPostsByUserId(userId);

  return {
    ...user,
    posts_data: userPosts.map((post) => ({
      id: post.id,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      caption: post.caption,
    })),
  };
}
