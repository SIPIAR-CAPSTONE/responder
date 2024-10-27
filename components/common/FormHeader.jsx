import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const FormHeader = ({
  title,
  titleStyle,
  titleSize = "base",
  date,
  id,
  desc,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const TITLE_SIZE_STYLE = {
    base: theme.fontSize.md,
    large: theme.fontSize.xxxl,
  };

  return (
    <View style={[styles.header, { rowGap: theme.spacing.xxxs }]}>
      <Text
        style={[
          styles.title,
          { fontSize: TITLE_SIZE_STYLE[titleSize] },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {date && <Text style={styles.date}>{date}</Text>}
      {id && <Text style={styles.id}>{id}</Text>}
      {desc && <Text style={styles.desc}>{desc}</Text>}
    </View>
  );
};

export default FormHeader;

const stylesheet = createStyleSheet((theme) => ({
  header: {
    marginVertical: theme.spacing.md,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    textAlign: "center",
    color: theme.colors.text2,
    fontSize: theme.fontSize.sm,
  },
  id: {
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: theme.fontSize.base,
  },
  desc: {
    textAlign: "center",
    color: theme.colors.text2,
    fontSize: theme.fontSize.sm,
  }
}));
