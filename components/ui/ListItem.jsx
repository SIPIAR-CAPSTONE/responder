import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const ListItem = ({
  title,
  titleSize = 16,
  titleWeight = "bold",
  subTitle,
  subTitleSize = 10,
  desc,
  descSize = 12,
  renderIcon,
  renderActionIcon,
  size = "small",
  onPress,
  contentContainerStyle,
  roundness,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const sizeStyle = {
    large: {
      height: 90,
      paddingHorizontal: 12,
      paddingVertical: 14,
      borderRadius: 12,
    },
    medium: {
      height: 60,
      paddingHorizontal: 10,
      paddingVertical: 14,
      borderRadius: 10,
    },
    small: {
      height: 50,
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderRadius: 8,
    },
  };

  const ROUNDNESS_STYLE =
    roundness != null ? roundness : sizeStyle[size].borderRadius;

  return (
    <TouchableRipple
      borderless
      onPress={onPress ? onPress : null}
      style={{ borderRadius: ROUNDNESS_STYLE }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.secondary,
            borderRadius: ROUNDNESS_STYLE,
            paddingHorizontal: sizeStyle[size].paddingHorizontal,
            paddingVertical: sizeStyle[size].paddingVertical,
            columnGap: sizeStyle[size].paddingHorizontal,
            height: sizeStyle[size].height,
          },
          contentContainerStyle,
        ]}
      >
        {/* Right Side: Leading Icon */}
        {renderIcon && <View>{renderIcon()}</View>}
        {/* Center to last Side: Text content */}
        <View style={styles.content}>
          {/* Title and subtitle */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { fontSize: titleSize, fontWeight: titleWeight },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subTitle && (
              <Text
                style={[
                  styles.subTitle,
                  {
                    color: theme.colors.text3,
                    fontSize: subTitleSize,
                  },
                ]}
              >
                {subTitle}
              </Text>
            )}
          </View>
          {/* Description */}
          {desc && (
            <Text
              numberOfLines={2}
              style={[
                styles.desc,
                {
                  color: theme.colors.text2,
                  fontSize: descSize,
                },
              ]}
            >
              {desc}
            </Text>
          )}
        </View>
        {/* Left Side: action icon */}
        {renderActionIcon && (
          <View style={styles.actionIcon}>{renderActionIcon()}</View>
        )}
      </View>
    </TouchableRipple>
  );
};

export default ListItem;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  actionIcon: {
    alignSelf: "center",
  },
}));
