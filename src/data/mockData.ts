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
  images: string[]; // Support multiple images (1-4)
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

export interface Reply {
  id: string;
  commentId: string;
  userId: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Reply[];
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
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800",
      "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
      "https://images.unsplash.com/photo-1593476123561-9516f2097158?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    ],
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
// COMMENTS DATA
// ============================================
export const COMMENTS: Comment[] = [
  // Post 1 comments
  {
    id: "c1",
    postId: "1",
    userId: "2",
    text: "Bro those numbers are insane! 💪 What's your training split looking like?",
    timestamp: "2h ago",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: "r1",
        commentId: "c1",
        userId: "1",
        text: "Push/pull/legs split! Been working great for me 🔥",
        timestamp: "1h ago",
        likes: 5,
        isLiked: false,
      },
      {
        id: "r2",
        commentId: "c1",
        userId: "2",
        text: "That's solid bro! Gonna give it a try",
        timestamp: "45m ago",
        likes: 2,
        isLiked: false,
      },
    ],
  },
  {
    id: "c2",
    postId: "1",
    userId: "4",
    text: "Chest day is the best day! Keep crushing it 🔥",
    timestamp: "2h ago",
    likes: 8,
    isLiked: true,
    replies: [
      {
        id: "r3",
        commentId: "c2",
        userId: "1",
        text: "Chest and tris is my favorite combo!",
        timestamp: "1h ago",
        likes: 3,
        isLiked: true,
      },
    ],
  },
  {
    id: "c3",
    postId: "1",
    userId: "5",
    text: "315 for reps is no joke! Respect 🙌",
    timestamp: "1h ago",
    likes: 12,
    isLiked: false,
  },
  // Post 2 comments
  {
    id: "c4",
    postId: "2",
    userId: "1",
    text: "Back workouts hit different! Your form is perfect 👌",
    timestamp: "4h ago",
    likes: 22,
    isLiked: false,
  },
  {
    id: "c5",
    postId: "2",
    userId: "3",
    text: "22 inch arms?! That's legendary status bro 💯",
    timestamp: "3h ago",
    likes: 34,
    isLiked: true,
    replies: [
      {
        id: "r4",
        commentId: "c5",
        userId: "2",
        text: "Took years of dedicated arm work but worth it!",
        timestamp: "2h ago",
        likes: 8,
        isLiked: false,
      },
      {
        id: "r5",
        commentId: "c5",
        userId: "3",
        text: "What exercises do you recommend?",
        timestamp: "1h ago",
        likes: 1,
        isLiked: false,
      },
      {
        id: "r6",
        commentId: "c5",
        userId: "2",
        text: "Barbell curls, cable curls, and close grip benches!",
        timestamp: "30m ago",
        likes: 4,
        isLiked: false,
      },
    ],
  },
  {
    id: "c6",
    postId: "2",
    userId: "5",
    text: "Can you share your back routine? Need to add some width",
    timestamp: "2h ago",
    likes: 18,
    isLiked: false,
  },
  {
    id: "c7",
    postId: "2",
    userId: "4",
    text: "405 lbs rowing?! Absolute unit 🔥",
    timestamp: "1h ago",
    likes: 25,
    isLiked: false,
  },
  // Post 3 comments
  {
    id: "c8",
    postId: "3",
    userId: "2",
    text: "Leg day = best day! Those quads are looking massive 🦵",
    timestamp: "5h ago",
    likes: 19,
    isLiked: false,
  },
  {
    id: "c9",
    postId: "3",
    userId: "1",
    text: "765 lbs? That's superhuman strength! 💪",
    timestamp: "4h ago",
    likes: 28,
    isLiked: true,
  },
  // Post 4 comments
  {
    id: "c10",
    postId: "4",
    userId: "2",
    text: "Those delts are looking 3D already! Stage ready 🏆",
    timestamp: "6h ago",
    likes: 31,
    isLiked: false,
  },
  {
    id: "c11",
    postId: "4",
    userId: "5",
    text: "Dropsets for shoulders are brutal but so effective!",
    timestamp: "5h ago",
    likes: 14,
    isLiked: false,
  },
  {
    id: "c12",
    postId: "4",
    userId: "1",
    text: "Your shoulder development is goals! What's the secret?",
    timestamp: "4h ago",
    likes: 21,
    isLiked: true,
  },
  // Post 5 comments
  {
    id: "c13",
    postId: "5",
    userId: "3",
    text: "5500 calories?! Living the dream 😅🍗",
    timestamp: "7h ago",
    likes: 42,
    isLiked: true,
  },
  {
    id: "c14",
    postId: "5",
    userId: "4",
    text: "Bulk season is the best season! Enjoy those gains",
    timestamp: "6h ago",
    likes: 16,
    isLiked: false,
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
 * Get comments for a specific post
 */
export function getCommentsByPostId(postId: string): Comment[] {
  return COMMENTS.filter((comment) => comment.postId === postId);
}

/**
 * Get comments with populated user data
 */
export function getCommentsWithUserData(postId: string) {
  return getCommentsByPostId(postId).map((comment) => ({
    ...comment,
    user: USERS[comment.userId],
    replies: (comment.replies || []).map((reply) => ({
      ...reply,
      user: USERS[reply.userId],
    })),
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
      images: post.images,
      likes: post.likes,
      comments: post.comments,
      caption: post.caption,
    })),
  };
}
