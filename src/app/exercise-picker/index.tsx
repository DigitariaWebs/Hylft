import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Theme } from "../../constants/themes";
import { useActiveWorkout } from "../../contexts/ActiveWorkoutContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
    fetchExercises,
    searchExercises,
    WgerExerciseInfo,
    WgerSearchSuggestion,
} from "../../services/wgerApi";

// ─── Types ────────────────────────────────────────────────────────────────────

const WGER_BASE = "https://wger.de";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExercisePicker() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addExerciseToWorkout } = useActiveWorkout();
  const styles = createStyles(theme);

  // ── state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [exercises, setExercises] = useState<WgerExerciseInfo[]>([]);
  const [searchResults, setSearchResults] = useState<WgerSearchSuggestion[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSearchMode = searchQuery.trim().length > 0;

  // ── initial + category-change load ──
  const loadExercises = useCallback(
    async (reset = false) => {
      const targetPage = reset ? 1 : page;
      if (!reset && !hasMore) return;

      reset ? setLoading(true) : setLoadingMore(true);

      try {
        const result = await fetchExercises({
          page: targetPage,
          limit: 20,
        });

        setExercises((prev) =>
          reset ? result.exercises : [...prev, ...result.exercises],
        );
        setHasMore(result.hasMore);
        setPage(reset ? 2 : targetPage + 1);
      } catch {
        // silently ignore network errors — show whatever is cached
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [page, hasMore],
  );

  useEffect(() => {
    if (!isSearchMode) {
      loadExercises(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── search debounce ──
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchExercises(searchQuery);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  // ── helpers ──
  const getExerciseImage = (ex: WgerExerciseInfo): string | null => {
    const main = ex.images.find((img) => img.is_main) ?? ex.images[0];
    if (!main) return null;
    return main.image.startsWith("http")
      ? main.image
      : `${WGER_BASE}${main.image}`;
  };

  // ── render rows ──
  const renderExerciseRow = useCallback(
    ({ item }: { item: WgerExerciseInfo }) => {
      const imageUri = getExerciseImage(item);
      const muscles = item.muscles.map((m) => m.name).join(", ") || "—";
      const equipment =
        item.equipment.map((e) => e.name).join(", ") || "Bodyweight";

      return (
        <TouchableOpacity
          style={styles.exerciseRow}
          onPress={() => {
            addExerciseToWorkout(item);
            router.back();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.exerciseThumbnailContainer}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.exerciseThumbnail}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={styles.exerciseThumbnailPlaceholder}>
                <Ionicons
                  name="barbell-outline"
                  size={28}
                  color={theme.foreground.gray}
                />
              </View>
            )}
          </View>

          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.exerciseMeta} numberOfLines={1}>
              {item.category?.name ?? ""} · {muscles}
            </Text>
            <Text style={styles.exerciseEquipment} numberOfLines={1}>
              {equipment}
            </Text>
          </View>

          <Ionicons
            name="add-circle-outline"
            size={26}
            color={theme.primary.main}
          />
        </TouchableOpacity>
      );
    },
    [styles, theme, addExerciseToWorkout, router],
  );

  const renderSearchRow = useCallback(
    ({ item }: { item: WgerSearchSuggestion }) => {
      const imageUri = item.data.image
        ? item.data.image.startsWith("http")
          ? item.data.image
          : `${WGER_BASE}${item.data.image}`
        : null;

      return (
        <TouchableOpacity
          style={styles.exerciseRow}
          onPress={() => {
            addExerciseToWorkout(item);
            router.back();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.exerciseThumbnailContainer}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.exerciseThumbnail}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={styles.exerciseThumbnailPlaceholder}>
                <Ionicons
                  name="barbell-outline"
                  size={28}
                  color={theme.foreground.gray}
                />
              </View>
            )}
          </View>

          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName} numberOfLines={1}>
              {item.data.name}
            </Text>
            <Text style={styles.exerciseMeta} numberOfLines={1}>
              {item.data.category}
            </Text>
          </View>

          <Ionicons
            name="add-circle-outline"
            size={26}
            color={theme.primary.main}
          />
        </TouchableOpacity>
      );
    },
    [styles, theme, addExerciseToWorkout, router],
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <ActivityIndicator
        size="small"
        color={theme.primary.main}
        style={{ marginVertical: 16 }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.foreground.white}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Add Exercise</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={theme.foreground.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises…"
          placeholderTextColor={theme.foreground.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.foreground.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      {loading && (exercises.length === 0 || isSearchMode) ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary.main} />
        </View>
      ) : isSearchMode ? (
        searchResults.length === 0 && !loading ? (
          <View style={styles.centered}>
            <Ionicons
              name="search-outline"
              size={48}
              color={theme.foreground.gray}
            />
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => `search-${item.data.id}-${index}`}
            renderItem={renderSearchRow}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        )
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => `exercise-${item.uuid}-${index}`}
          renderItem={renderExerciseRow}
          contentContainerStyle={styles.listContent}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (!loadingMore && hasMore) loadExercises(false);
          }}
          ListFooterComponent={renderFooter}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.dark,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background.darker,
      borderRadius: 12,
      marginHorizontal: 20,
      marginBottom: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: theme.foreground.white,
      fontSize: 16,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    exerciseRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.background.darker,
      gap: 12,
    },
    exerciseThumbnailContainer: {
      width: 60,
      height: 60,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.background.darker,
    },
    exerciseThumbnail: {
      width: 60,
      height: 60,
    },
    exerciseThumbnailPlaceholder: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background.accent,
      borderRadius: 12,
    },
    exerciseInfo: {
      flex: 1,
      gap: 2,
    },
    exerciseName: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    exerciseMeta: {
      fontSize: 12,
      color: theme.foreground.gray,
    },
    exerciseEquipment: {
      fontSize: 11,
      color: theme.primary.main,
      fontWeight: "600",
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    emptyText: {
      fontSize: 16,
      color: theme.foreground.gray,
    },
  });
