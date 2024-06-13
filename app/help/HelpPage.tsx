import React from 'react';
import {ScrollView, Text, View} from 'react-native';

const helpTexts = [
  'Collect Data on areas greater than 90 by 90 meter if you are unable to find a pure area of 90 by 90 meters and a second crop is present, please document it using the secondary crop field and season.',
  'If you are not at the center of the area. Capture the bearing and distance to the center of the field.',
  'Try to space your data collection by over 1 KM unless nearby samples units are of differetn classes.',
  'Two or three photos of each location with one covering the entire field and another with a close up of the crop. Please take your photos in landscape view from where you record the position.',
  'Cropland is defined as all cultivated plants harvested for food, feed, and fiber including plantations (e.g., orchards, vineyards, coffee, tea, rubber).',
  'Cropland intensity is the number of cropping cycles in a 12 month period.',
  'Irrigation is defined as artificial application of any amount of water to overcome crop water stress. Irrigated areas are those areas which are irrigated one or more times during the crop growing season.',
  'If the area has access to internet connection, you can use the mark location from maps feature, the location coordinates can be chosen from the map',
  "If there's a crop that isn't present in the list of crops, then the option of adding miscellaneous crop can be used",
];

function HelpPage() {
  return (
    <ScrollView>
      {helpTexts.map((value, id) => {
        return (
          <View
            key={id}
            style={{
              padding: 5,
              backgroundColor: '#d4d4d4',
            }}>
            <Text
              style={{
                fontSize: 18,
                margin: 2,
                padding: 7,
                color: 'black',
                borderBlockColor: 'grey',
                borderWidth: 0.5,
                backgroundColor: 'white',
              }}>
              {value}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default HelpPage;
