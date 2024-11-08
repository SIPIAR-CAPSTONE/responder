import { Text } from "react-native-paper";

import { useStyles, createStyleSheet } from "../../../hooks/useStyles";

const ResendCountdown = ({ time }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Text variant="labelMedium" style={styles.timerContainer}>
      Resend Token in{" "}
      <Text variant="labelLarge" style={styles.time}>
        {time}
      </Text>{" "}
      Sec
    </Text>
  );
};

export default ResendCountdown;

const stylesheet = createStyleSheet((theme) => ({
  timerContainer: {
    textAlign: "center",
  },
  time: {
    color: theme.colors.primary,
  },
}));
