import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Picker from './Picker';

export interface ModalPickerProps {
  options: string[];
  defaultValue: string;
}

export const ModalPicker: FunctionComponent<ModalPickerProps> = ({
  defaultValue,
  options,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [visible, setVisible] = useState(false);
  const getIndex = useCallback(
    (val) => {
      const index = options.findIndex((item) => item === val);
      return index >= 0 ? index : 0;
    },
    [options],
  );

  const values = useMemo(() => {
    return options.map((l, v) => ({label: l, value: v}));
  }, [options]);

  // console.log({defaultIndex, options, val: options[defaultIndex]});
  return (
    <View>
      <Pressable onPress={() => setVisible(!visible)}>
        <TextInput
          value={value}
          defaultValue={value}
          pointerEvents="none"
          editable={false}
          style={styles.textInput}
        />
      </Pressable>
      <Modal visible={visible} transparent={true}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        />
        <View style={styles.modal}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 12}}
            onPress={() => setVisible(false)}>
            <Text style={{color: 'rgb(0,122,255)', fontSize: 16}}>Done</Text>
          </TouchableOpacity>
          <View style={styles.pickerContainer}>
            <Picker
              values={values}
              defaultValue={getIndex(value)}
              fontColor="black"
              onValueChange={(val) => {
                setValue(values[val].label);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {flex: 1, justifyContent: 'center', width: '100%'},
  currentValue: {fontSize: 12},
  title: {fontWeight: 'bold', fontSize: 18},
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#0006',
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});
