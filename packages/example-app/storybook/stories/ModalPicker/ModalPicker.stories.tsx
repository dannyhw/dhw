import {ModalPicker} from '@dhw/modal-picker';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {View} from 'react-native';

const BufferView = (story: Function) => (
  <View style={{padding: 16}}>{story()}</View>
);

storiesOf('Modal Picker', module)
  .addDecorator(BufferView)
  .add('hello world', () => (
    <ModalPicker
      defaultValue={'Yet More text'}
      options={[
        'This is a test',
        "I'm testing this",
        'Longer text in here',
        'Some other text',
        'Yet More text',
      ]}
    />
  ));
