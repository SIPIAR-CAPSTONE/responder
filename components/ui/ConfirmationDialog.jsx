import { Dialog, Portal } from "react-native-paper";
import React from "react";

import Button from "./Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const ConfirmationDialog = ({
  isVisible,
  title,
  content = "",
  confirmationLabel = "Confirm",
  cancelLabel = "Cancel",
  onPressConfirmation,
  onPressCancel,
  containerStyle = {},
  dismissable = false,
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onPressCancel}
        style={[styles.dialog, containerStyle]}
        dismissable={dismissable}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        {content && (
          <Dialog.Content style={styles.desc}>{content}</Dialog.Content>
        )}

        <Dialog.Actions style={styles.buttonsContainer}>
          <Button label={confirmationLabel} onPress={onPressConfirmation} />
          <Button label={cancelLabel} onPress={onPressCancel} variant="text" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;

const stylesheet = createStyleSheet((theme) => ({
  dialog: {
    paddingTop: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: theme.fontSize.xl,
  },
  buttonsContainer: {
    marginTop: 18,
    flexDirection: "column",
    alignItems: "baseline",
    rowGap: theme.spacing.xxs,
  },
}));
