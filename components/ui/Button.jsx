import { Button as NPButton } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const Button = ({
  label = "",
  onPress,
  isLoading,
  variant = "contained",
  style: customStyle,
  marginVertical,
  labelStyle,
  ...buttonProps
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <NPButton
      mode={variant}
      onPress={onPress}
      labelStyle={[styles.buttonLabel, labelStyle]}
      style={[
        styles.button,
        { marginVertical },
        styles.variant[variant],
        customStyle,
      ]}
      contentStyle={styles.buttonContent}
      disabled={isLoading}
      loading={isLoading}
      {...buttonProps}
    >
      {label}
    </NPButton>
  );
};

export default Button;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    borderRadius: theme.borderRadius.base,
    width: "100%",
  },
  buttonLabel: {
    fontSize: theme.fontSize.base,
  },
  buttonContent: {
    padding: theme.spacing.xxxs,
  },

  variant: {
    contained: {},
    outlined: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
      backgroundColor: theme.colors.background,
    },
    text: {
      backgroundColor: "transparent",
    },
  },
}));
