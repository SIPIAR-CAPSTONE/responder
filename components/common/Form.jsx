import { ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const Form = ({
  style,
  contentContainerStyle,
  removeDefaultPaddingHorizontal,
  children,
  ...props
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView
      style={[
        styles.form,
        removeDefaultPaddingHorizontal && { paddingHorizontal: 0 },
        style,
      ]}
      contentContainerStyle={[styles.formContent, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default Form;

const stylesheet = createStyleSheet((theme) => ({
  form: {
    paddingHorizontal: theme.spacing.base,
  },
  formContent: {
    rowGap: theme.spacing.base,
    paddingBottom: 70,
  },
}));
