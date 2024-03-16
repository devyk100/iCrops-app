import {useState} from 'react';
import {
  Button,
  Switch,
  Colors,
  Text,
  View,
  Slider,
  ChipsInput,
  Picker,
  SegmentedControl,
  Stepper,
  WheelPicker,
} from 'react-native-ui-lib';

export default function () {
  const [captureLocation, setCaptureLocation] = useState(false);
  const [distanceToCenter, setDistanceToCenter] = useState(70);
  return (
    <>
      <View>
        <Button marginT-30 margin-10 backgroundColor={Colors.grey50}>
          <Text uppercase>Take Photo</Text>
        </Button>
        <View marginT-10>
          <View backgroundColor={Colors.grey40} padding-5 margin-10>
            <Text>Location</Text>
          </View>
          <View margin-10 marginT-0 style={{flexDirection: 'row'}}>
            <Text style={{flex: 5}}>Capture Location</Text>
            <Switch
              onColor={'green'}
              value={captureLocation}
              onValueChange={() => {
                console.log('value changed');
                setCaptureLocation(t => !t);
              }}
            />
          </View>
          <View
            margin-10
            marginT-0
            style={{
              flexDirection: 'row',
            }}
            center>
            <Text grey40 flex>
              Accuracy Correction
            </Text>
            <Button backgroundColor={Colors.grey50} borderRadius={0}>
              <Text uppercase>Clear</Text>
            </Button>
          </View>
          <View margin-10 marginT-0>
            <Text grey40>Lat: Long:</Text>
          </View>
        </View>

        {/* The location offset starts */}
        <View>
          <View margin-10 padding-5 backgroundColor={Colors.grey40}>
            <Text>Location Offset</Text>
          </View>
          <View>
            <View center style={{flexDirection: 'row'}} margin-10 marginT-0>
              <Text grey40 flex>
                Bearing to Center:
              </Text>
              <Button borderRadius={0} backgroundColor={Colors.grey50}>
                <Text uppercase>Capture</Text>
              </Button>
            </View>
          </View>
          <View margin-10 marginT-0>
            <Text grey40>Distance to Center: {distanceToCenter} Meters</Text>
            <Slider
              value={70}
              minimumValue={0}
              maximumValue={150}
              step={1}
              onValueChange={value => setDistanceToCenter(value)}
            />
          </View>
        </View>

        {/* Location Class section ahead */}
        <View>
          <View backgroundColor={Colors.grey40} margin-10 padding-5>
            <Text>Location Class</Text>
          </View>
          <View style={{flexDirection: 'row'}} margin-10 marginT-0>
            <Text grey40>Land Cover Type:</Text>
            {/* <WheelPicker
              items={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no'},
                {label: 'Maybe', value: 'maybe'},
              ]}
              initialValue={'yes'}
              onChange={() => console.log('changed')}
            /> */}
          </View>
        </View>
      </View>
    </>
  );
}
