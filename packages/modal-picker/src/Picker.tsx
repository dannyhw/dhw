import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from 'react-native-reanimated';
import {useValue, translateZ} from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

import GestureHandler from './GestureHandler';
import {VISIBLE_ITEMS, ITEM_HEIGHT} from './Constants';

const styles = StyleSheet.create({
  selectedMask: {height: ITEM_HEIGHT},
  greyMask: {height: ITEM_HEIGHT * 2, backgroundColor: 'grey'},
  selectedContainer: {
    borderColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
  },
  container: {
    width: '100%',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

interface PickerProps {
  defaultValue: number;
  values: {value: number; label: string}[];
  fontColor: string;
  onValueChange: (s: number) => void;
}

const Picker = ({
  values,
  defaultValue,
  fontColor = 'black',
  onValueChange,
}: PickerProps) => {
  const translateY = useValue(0);
  const maskElement = (
    <Animated.View style={{transform: [{translateY}]}}>
      {values.map((v, i) => {
        const y = interpolate(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          },
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [
                  {perspective},
                  {rotateX},
                  translateZ(perspective, z),
                ],
              },
            ]}>
            <Text style={styles.label}>{v.label}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
  return (
    <View style={styles.container}>
      <MaskedView {...{maskElement}}>
        <View style={styles.greyMask} />
        <View style={[styles.selectedMask, {backgroundColor: fontColor}]} />
        <View style={styles.greyMask} />
      </MaskedView>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.selectedContainer} />
      </View>
      <GestureHandler
        max={values.length}
        value={translateY}
        {...{defaultValue}}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default Picker;
