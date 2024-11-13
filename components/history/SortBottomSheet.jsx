import { View, TouchableWithoutFeedback } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import { Portal, List, Text } from "react-native-paper";

const SortBottomSheet = forwardRef(function SortBottomSheet(
  {
    snapPoints = 300,
    isVisible = false,
    close,
    data = SORT_OPTIONS,
    selectedOption,
    setSelectedOption,
  },
  ref
) {
  const { styles, theme } = useStyles(stylesheet);

  if (!isVisible) return null;

  const SortOptions = data.map((option) => (
    <List.Item
      key={option.id}
      title={option.title}
      titleStyle={option.value === selectedOption && styles.activeSortOption}
      left={() => (
        <List.Icon
          icon={option.icon}
          color={option.value === selectedOption && theme.colors.primary}
        />
      )}
      onPress={() => setSelectedOption(option.value)}
      style={styles.sortOption}
    />
  ));

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <BottomSheet
            ref={ref}
            snapPoints={[snapPoints]}
            backgroundStyle={styles.sheetContainer}
            onClose={close}
          >
            <BottomSheetView style={styles.sheetContent}>
              <Text variant="titleMedium" style={styles.sortTitle}>
                Sort
              </Text>
              {SortOptions}
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
});

export default SortBottomSheet;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "rgba(1,1,1, 0.2)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    justifyContent: "center",
  },
  sheetContainer: {
    backgroundColor: theme.colors.elevation.level3,
  },
  sheetContent: {
    paddingVertical: theme.spacing.xl,
  },
  sortTitle: {
    paddingHorizontal: theme.spacing.xxxl,
  },
  sortOption: {
    paddingHorizontal: theme.spacing.xxxl,
  },
  activeSortOption: {
    color: theme.colors.primary,
  },
}));

const SORT_OPTIONS = [
  { id: 1, title: "Name", value: "name", icon: "order-alphabetical-ascending" },
  { id: 2, title: "Address", value: "address", icon: "map-marker-minus" },
  { id: 3, title: "Distance", value: "distance", icon: "map-marker-distance" },
  {
    id: 4,
    title: "Time Requested",
    value: "timeRequested",
    icon: "clock-time-ten-outline",
  },
];
