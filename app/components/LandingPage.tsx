import React from 'react';
import {
  Button,
  Colors,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

export default function () {
  console.log('hello');

  return (
    <>
      <View margin-10 padding-10>
        <Button margin-10 backgroundColor={Colors.grey50}>
          <Text uppercase>Collect Data</Text>
        </Button>
        <Button margin-10 backgroundColor={Colors.grey50}>
          <Text uppercase>Sync Data</Text>
        </Button>
      </View>
    </>
  );
}
