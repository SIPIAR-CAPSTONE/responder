import { View, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import StatusBar from "./StatusBar";

const SuccessConfirmation = ({
  open,
  setOpen,
  onDelayEnd = () => {},
  title = "Success",
  desc,
  delay = 2000,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const runOnDelayEnd = () => {
    setTimeout(() => {
      onDelayEnd();
      setOpen(false);
    }, delay);
  };

  return (
    <Modal
      onShow={() => runOnDelayEnd()}
      onDismiss={() => setOpen(false)}
      visible={open}
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        <Ionicons
          name="checkmark-circle"
          size={100}
          color={theme.colors.primary}
        />
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.desc}>
          {desc}
        </Text>
      </View>

      <StatusBar />
    </Modal>
  );
};

export default SuccessConfirmation;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 220,
    rowGap: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
  desc: {
    textAlign: "center",
    color: theme.colors.text2,
  },
}));
