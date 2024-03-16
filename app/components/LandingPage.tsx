import React, {FC, ReactNode, useState} from 'react';
import {
  Button,
  Colors,
  ExpandableSection,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

function Expandable({txt, children}: {txt: string; children: ReactNode}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <ExpandableSection
      expanded={expanded}
      sectionHeader={
        <View margin-10 marginT-0 backgroundColor={Colors.grey30} padding-10>
          <Text grey10 text65 white>
            {txt}
          </Text>
        </View>
      }
      onPress={() => setExpanded(t => !t)}
      children={children}></ExpandableSection>
  );
}

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
        <View marginT-20>
          <Expandable txt="Water Source">
            <View margin-15 marginT-0>
              <Text>Nothing here yet</Text>
            </View>
          </Expandable>
          <Expandable txt="Crop Type">
            <View margin-15 marginT-0>
              <Text>Nothing here yet</Text>
            </View>
          </Expandable>
          <Expandable txt="Land Cover">
            <View margin-15 marginT-0>
              <Text>Nothing here yet</Text>
            </View>
          </Expandable>
          <View marginT-40>
          <Expandable txt="Sync Status">
            <View margin-15 marginT-0>
              <Text>0                Synced</Text>
              <Text>0                Not Synced</Text>
            </View>
          </Expandable>
          </View>
        </View>
      </View>
    </>
  );
}
