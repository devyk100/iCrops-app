import {useEffect, useState} from 'react';
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
  Icon,
  Dash,
} from 'react-native-ui-lib';

import correctIcon from '../../assets/correct.png';
import incorrectIcon from '../../assets/incorrect.png';

const LandCoverType = [
  {label: 'Unknown', key: 1, value: 1},
  {label: 'Cropland', key: 2, value: 2},
  {label: 'Forest', key: 3, value: 3},
  {label: 'Grassland', key: 4, value: 4},
  {label: 'Barren', key: 5, value: 5},
  {label: 'Builtup', key: 6, value: 6},
  {label: 'Shrub', key: 7, value: 7},
  // {label: "Unknown", key: 1, value: 1},
];

const WaterSource = [
  {label: 'Unknown', key: 1, value: 1},
  {label: 'Rainfed', key: 2, value: 2},
  {label: 'Irrigated', key: 3, value: 3},
];

const CropIntensity = [
  {label: 'Unknown', key: 1, value: 1},
  {label: 'Single', key: 2, value: 2},
  {label: 'Double', key: 3, value: 3},
  {label: 'Triple', key: 4, value: 4},
  {label: 'Continuous', key: 5, value: 5},
];

const LiveStocks = [
  {label: 'Unknown', key: 1, value: 1},
  {label: 'Cows', key: 2, value: 2},
  {label: 'Buffaloes', key: 3, value: 3},
  {label: 'Goats', key: 4, value: 4},
  {label: 'Sheep', key: 5, value: 5},
];

const Crops = [
  {label: 'Unknown', key: 1, value: 1},
  {label: 'PigeonPea', key: 2, value: 2},
  {label: 'Chickpea', key: 3, value: 3},
  {label: 'Wheat', key: 4, value: 4},
  {label: 'Maize(Corn)', key: 5, value: 5},
  {label: 'Rice', key: 6, value: 6},
  {label: 'Barley', key: 7, value: 7},
  {label: 'SoyaBean', key: 8, value: 8},
  {label: 'Pulses', key: 9, value: 9},
  {label: 'Cotton', key: 10, value: 10},
  {label: 'Potatoe', key: 11, value: 11},
  {label: 'Alfalfa', key: 12, value: 12},
  {label: 'Sorghum', key: 13, value: 13},
  {label: 'Millet', key: 14, value: 14},
  {label: 'Sunflower', key: 15, value: 15},
  {label: 'Rye', key: 16, value: 16},
  {label: 'Rapeseed or Canola', key: 17, value: 17},
  {label: 'Sugarcane', key: 18, value: 18},
  {label: 'Groundnut or Peanut', key: 19, value: 19},
  {label: 'Cassava', key: 20, value: 20},
  {label: 'Sugarbeet', key: 21, value: 21},
  {label: 'Palm', key: 22, value: 22},
  {label: 'Others', key: 23, value: 23},
  {label: 'Plantation', key: 24, value: 24},
  {label: 'Fallow', key: 25, value: 25},
  {label: 'Tef', key: 26, value: 26},
];

import {BackHandler, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function MyPickerComponent({listOfItems}: {listOfItems: any}) {
  const [value, setValue] = useState(1);
  const [placeholder, setPlaceholder] = useState(listOfItems[0].label);
  const [closed, setClosed] = useState(true);
  function onClose() {
    setClosed(false);
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose();
        return true; // Prevent default behavior (e.g., exiting the app)
      },
    );

    return () => backHandler.remove(); // Remove the event listener on unmount
  }, [onClose]);
  return (
    <>
      <Picker
        enableModalBlur
        //   useWheelPicker
        onBlur={() => {
          console.log('closed');
        }}
        useSafeArea
        showSearch
        //   mode={'SINGLE'}
        fieldType={'filter'}
        value={value}
        // editable={closed}
        placeholder={placeholder}
        onChange={value => {
          if (value) {
            setValue(value);
            setPlaceholder(listOfItems[value - 1].label);
          }
        }}>
        {listOfItems.map((value: any) => {
          return (
            <>
              <Picker.Item
                label={value.label}
                key={value.key}
                value={value.value}
              />
            </>
          );
        })}
      </Picker>
      {/* <SegmentedControl segments={[{label: '1st'}, {label: '2nd'}]}/> */}
    </>
  );
}

export default function () {
  const [captureLocation, setCaptureLocation] = useState(false);
  const [distanceToCenter, setDistanceToCenter] = useState(70);

  return (
    <>
      <ScrollView>
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
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Land Cover Type:
            </Text>
            <MyPickerComponent listOfItems={LandCoverType} />
          </View>
        </View>

        {/* Crop information only when selected as crop land */}
        <View>
          <View backgroundColor={Colors.grey40} margin-10 padding-5>
            <Text>Crop Information</Text>
          </View>
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Water Source
            </Text>
            <MyPickerComponent listOfItems={WaterSource} />
          </View>
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Crop Intensity
            </Text>
            <MyPickerComponent listOfItems={CropIntensity} />
          </View>
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Primary Crop
            </Text>
            <MyPickerComponent listOfItems={Crops} />
          </View>
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Secondary Crop
            </Text>
            <MyPickerComponent listOfItems={Crops} />
          </View>
          <View style={{flexDirection: 'row'}} center margin-10 marginT-0>
            <Text grey40 style={{flex: 5}}>
              Live Stock
            </Text>
            <MyPickerComponent listOfItems={LiveStocks} />
          </View>
        </View>

        {/* Quality control of this entry */}
        <View>
          <View backgroundColor={Colors.grey40} margin-10 padding-5>
            <Text>Quality Control</Text>
          </View>
          <View margin-10 marginT-0 center style={{flexDirection: 'row'}}>
            <Text grey40 style={{flex: 5}}>
              Capture a photo of the area
            </Text>
            <Icon size={24} source={correctIcon} />
          </View>
          <View margin-10 marginT-0 center style={{flexDirection: 'row'}}>
            <Text grey40 style={{flex: 5}}>
              Collect sufficient GPS points
            </Text>
            <Icon size={24} source={incorrectIcon} />
          </View>
          <View margin-10 marginT-0 center style={{flexDirection: 'row'}}>
            <Text grey40 style={{flex: 5}}>
              Capture bearing to center of area
            </Text>
            <Icon size={24} source={correctIcon} />
          </View>
          <View margin-10 marginT-0 center style={{flexDirection: 'row'}}>
            <Text grey40 style={{flex: 5}}>
              Set distance to center of area
            </Text>
            <Icon size={24} source={incorrectIcon} />
          </View>
          <View margin-10 marginT-0 center style={{flexDirection: 'row'}}>
            <Text grey40 style={{flex: 5}}>
              Set land cover mass
            </Text>
            <Icon size={24} source={incorrectIcon} />
          </View>
          <Dash vertical/>
          <Button backgroundColor={Colors.grey50} margin-15 borderRadius={0}>
            <Text uppercase>Save</Text>
          </Button>
          <Button backgroundColor={Colors.grey50} marginT-5 margin-15 borderRadius={0}>
            <Text uppercase>Cancel</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
