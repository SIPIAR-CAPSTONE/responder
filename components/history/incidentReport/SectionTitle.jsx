import { useStyles } from "../../../hooks/useStyles";
import { Text } from "react-native-paper";

export default function SectionTitle({ title }) {
  const { styles } = useStyles(stylesheet);

  return <Text variant="titleMedium" style={styles.title}>{title}</Text>;
}

const stylesheet = (theme) => ({
  title: {
    fontWeight: "bold",
    marginTop: theme.spacing.xs,
  },
});
