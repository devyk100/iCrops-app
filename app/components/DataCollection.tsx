import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Button from './Button';
import {useState} from 'react';
import {} from 'react-native-gesture-handler';
import {Slider} from '@miblanchard/react-native-slider';
import CustomModal from './CustomModal';
import { selectLandCoverType, setLandCoverType } from '../features/DataCollectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import CropInformation from './CropInformation';
import { landData } from '../data';
import FormCameraHandle from './FormCameraHandle';




export default function ({navigation}: {navigation: any}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [distanceToCenter, setDistanceToCenter] = useState(70);
  const dispatch = useDispatch();
  const landCoverType = useSelector(selectLandCoverType);
  return (
    <>
      <ScrollView>
       <FormCameraHandle />
        {/* The Location Section */}
        <View
          style={{
            flexDirection: 'column',
            // marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              backgroundColor: '#888484',
              padding: 5,
              marginHorizontal: 20,
            }}>
            Location
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                flex: 5,
                margin: 5,
              }}>
              Capture Location
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'pink'}}
              thumbColor={isEnabled ? 'violet' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //   width:"100%",
              marginHorizontal: 25,
              marginTop: 5,
            }}>
            <Text
              style={{
                color: 'black',
                flex: 6,
                // padding:5
              }}>
              Accuracy Correction:
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#d4d4d4',
                padding: 10,
                marginTop: 0,
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                }}>
                CLEAR
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                flex: 5,
                margin: 5,
              }}>
              Lat: Lon:
            </Text>
          </View>

          {/* Location Offset section */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Location Offset
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                //   width:"100%",
                marginHorizontal: 25,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: 'black',
                  flex: 6,
                  // padding:5
                }}>
                Bearing to Center:
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#d4d4d4',
                  padding: 10,
                  marginTop: 0,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  CAPTURE
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: 'black',
                  flex: 6,
                  marginHorizontal: 25,
                  marginTop: 10,
                  // padding:5
                }}>
                Distance to Center: {distanceToCenter} meters
              </Text>
              <Slider
                animateTransitions
                maximumValue={150}
                minimumValue={0}
                value={distanceToCenter}
                step={1}
                // @ts-ignore
                onValueChange={value => setDistanceToCenter(value)}
                containerStyle={{
                  marginHorizontal: 20,
                }}
              />
            </View>
          </View>
          {/* The location class section */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Location Class
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                //   width:"100%",
                marginHorizontal: 25,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: 'black',
                  flex: 6,
                  // padding:5
                }}>
                Land Cover Type:
              </Text>
             <CustomModal data={landData} action={(payload) => dispatch(setLandCoverType(payload))}></CustomModal>
             
            </View>

            
          </View>

        {
            landCoverType == "Cropland"? <CropInformation />: null
        }


          <View
            style={{
              marginTop: 15,
              flexDirection: 'column',
              // marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#888484',
                padding: 5,
                marginHorizontal: 20,
              }}>
              Quality Control
            </Text>
            </View>
        </View>
      </ScrollView>
    </>
  );
}
