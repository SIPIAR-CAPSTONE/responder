import {
  Button,
  Dialog,
  Portal,
  RadioButton,
} from "react-native-paper";

const RadioDialog = ({
  hideDialog,
  visible,
  title,
  data,
  selectedValue,
  setSelectedValue,
}) => {

  const RadioButtons = data.map((value, index) => (
    <RadioButton.Item
      key={index}
      label={value}
      value={value}
      position="leading"
      labelStyle={{ textAlign: "left" }}
      rippleColor="rgba(255,255,255,0)"
    />
  ));

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={setSelectedValue}
            value={selectedValue}
          >
            {RadioButtons}
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default RadioDialog;
