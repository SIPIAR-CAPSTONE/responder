import { Text, View, Modal, ScrollView } from "react-native";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const SelectItem = ({
  data,
  label,
  placeholder,
  onChange,
  error,
  variant,
  value,
  containerStyle
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value);
  const { styles, theme } = useStyles(stylesheet);

  const onSelect = (value) => {
    setSelected(value);
    setVisible(false);
    onChange(value);
  };

  const hideSelectItem = () => setVisible(false);

  const showSelectItem = () => setVisible(true);

  const renderOptions = useMemo(() => {
    return data?.map((option) => (
      <TouchableRipple
        borderless
        key={option.value}
        style={styles.option}
        onPress={() => onSelect(option.value)}
      >
        <Text style={styles.optionText}>{option.label}</Text>
      </TouchableRipple>
    ));
  }, [data]);

  return (
    <>
      <View style={containerStyle}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableRipple
          borderless
          activeOpacity={0.7}
          onPress={showSelectItem}
          style={[
            styles.button,
            styles.button.variants.variant[variant],
            error && styles.buttonError,
          ]}
        >
          <>
            <Text style={{ color: theme.colors.text2 }}>
              {selected ? selected : placeholder}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={theme.colors.text3}
            />
          </>
        </TouchableRipple>
        {error && (
          <Text variant="bodySmall" style={styles.errorLabel}>
            {error}
          </Text>
        )}
      </View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={hideSelectItem}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        animationType="none"
      >
        <TouchableRipple style={styles.modalOverlay} onPress={hideSelectItem}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.optionLabel}>Select Options...</Text>
              {renderOptions}
            </ScrollView>
          </View>
        </TouchableRipple>
      </Modal>
    </>
  );
};

export default SelectItem;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    height: 50,
    borderRadius: theme.borderRadius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: theme.colors.secondary,

    variants: {
      variant: {
        outlined: {
          borderWidth: 1,
          borderColor: "#e1e2e3",
          backgroundColor: theme.colors.background,
        },
      },
    },
  },
  buttonError: {
    borderWidth: 1.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  errorLabel: {
    paddingStart: 14,
    paddingTop: 4,
    marginBottom: 4,
    color: theme.colors.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.curve,
    width: 350,
    maxWidth: "85%",
    maxHeight: "80%",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 18,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },
  optionLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: theme.fontSize.md,
    color: theme.colors.text3,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  label: {
    color: theme.colors.text,
    fontWeight: "500",
    marginBottom: 8,
  },
}));
