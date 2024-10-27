import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const SectionHeader = ({ title }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.sectionHeader}>
      <Text variant="titleSmall" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const stylesheet = createStyleSheet((theme) => ({
  sectionHeader: {
    paddingVertical: theme.spacing.xs,
    marginVertical: theme.spacing.base,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.base,
  },
  title: {
    color: theme.colors.text2,
  },
}));
