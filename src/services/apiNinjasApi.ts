// API Ninjas Exercise API Service
// https://api-ninjas.com/api/exercises

export interface ApiNinjasExercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export interface ApiNinjasResponse {
  exercises: ApiNinjasExercise[];
  hasMore: boolean;
}

const API_NINJAS_BASE = "https://api.api-ninjas.com/v1";

// Get your free API key from: https://api-ninjas.com
const API_KEY = process.env.EXPO_PUBLIC_API_NINJAS_KEY || "";

export async function fetchExercisesApiNinjas(options?: {
  muscle?: string;
  type?: string;
  offset?: number;
}): Promise<ApiNinjasResponse> {
  const { muscle, type, offset = 0 } = options || {};

  try {
    let url = `${API_NINJAS_BASE}/exercises?offset=${offset}`;

    if (muscle) url += `&muscle=${encodeURIComponent(muscle)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch exercises");

    const exercises: ApiNinjasExercise[] = await response.json();

    return {
      exercises,
      hasMore: exercises.length > 0,
    };
  } catch (error) {
    console.error("API Ninjas fetch error:", error);
    return {
      exercises: [],
      hasMore: false,
    };
  }
}

export async function searchExercisesApiNinjas(
  name: string,
): Promise<ApiNinjasExercise[]> {
  if (!name.trim()) return [];

  try {
    const response = await fetch(
      `${API_NINJAS_BASE}/exercises?name=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      },
    );

    if (!response.ok) return [];

    const exercises: ApiNinjasExercise[] = await response.json();
    return exercises;
  } catch (error) {
    console.error("API Ninjas search error:", error);
    return [];
  }
}

export async function getExercisesByMuscleApiNinjas(
  muscle: string,
): Promise<ApiNinjasExercise[]> {
  try {
    const response = await fetch(
      `${API_NINJAS_BASE}/exercises?muscle=${encodeURIComponent(muscle)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      },
    );

    if (!response.ok) return [];

    const exercises: ApiNinjasExercise[] = await response.json();
    return exercises;
  } catch (error) {
    console.error("API Ninjas muscle search error:", error);
    return [];
  }
}

export async function getExercisesByTypeApiNinjas(
  type: string,
): Promise<ApiNinjasExercise[]> {
  try {
    const response = await fetch(
      `${API_NINJAS_BASE}/exercises?type=${encodeURIComponent(type)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      },
    );

    if (!response.ok) return [];

    const exercises: ApiNinjasExercise[] = await response.json();
    return exercises;
  } catch (error) {
    console.error("API Ninjas type search error:", error);
    return [];
  }
}

// Get available muscle groups
export const AVAILABLE_MUSCLES = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "shoulders",
  "traps",
  "triceps",
];

// Get available exercise types
export const AVAILABLE_TYPES = [
  "cardio",
  "powerlifting",
  "stretching",
  "strongman",
  "weightlifting",
];
