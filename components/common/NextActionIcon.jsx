import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const NextActionIcon = ({ styles, ...props }) => {
  const theme = useTheme();

  return (
    <Ionicons
      name="chevron-forward"
      size={20}
      color={theme.colors.text}
      style={styles}
      {...props}
    />
  );
};

export default NextActionIcon;
