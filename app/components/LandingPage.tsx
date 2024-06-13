import {
  Pressable,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Button from './Button';
import {ScrollView} from 'react-native-gesture-handler';
import SmallDrawer from './SmallDrawer';
import {useDispatch, useSelector} from 'react-redux';
import {selectWaterSourceType} from '../features/DataCollectionSlice';
import {useEffect, useState} from 'react';
import {getBottomIndexCount, getJwt, storage} from '../localStorage';
import {useMMKVListener, useMMKVString} from 'react-native-mmkv';
import {BACKEND_URL, upload} from '../networking';
import axios from 'axios';
import {
  selectUiData,
  setWaterSourceCropTypeLandCover,
} from '../features/UISlice';
// import { TouchableOpacity } from "react-native-gesture-handler";
export interface MessageProp {
  show: boolean;
  message1: string;
  message2: string;
}

export default function HomeScreen({navigation}: {navigation: any}) {
  const [email, setEmail] = useMMKVString('user.email');
  const [jwt, setJwt] = useMMKVString('user.jwt');
  const dispatch = useDispatch();
  // at any saving of the  data, and not the initial one.
  useMMKVListener(key => {
    const keys = storage.getAllKeys();
    setUnsynced(storage.getNumber('counter') || 0);
    let obj = [];
    for (let a of keys) {
      obj.push(storage.getString(a));
    }
    setData(obj);
    console.log(`Value for "${key}" changed!`);
  });
  const waterSource = useSelector(selectWaterSourceType);
  console.log(waterSource);
  const [data, setData] = useState<any>([]);
  const [unsynced, setUnsynced] = useState<any>(0);
  const [synced, setSynced] = useState<Number>(-1);
  const uiData = useSelector(selectUiData);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [logMessage, setLogMessage] = useState<MessageProp>({
    message1: '',
    message2: '',
    show: false,
  });
  // at first mount
  useEffect(() => {
    const count = storage.getNumber('counter');
    const jwt = getJwt();
    const bottomIndex = storage.getNumber('bottomIndex');
    async function syncSetter() {
      const response = await axios.post(
        BACKEND_URL + 'api/v1/sync/synced/',
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log(response.data.synced, 'IS THE SYNCED AMOUNT');
      setSynced(response.data.synced);
    }
    syncSetter();
    dispatch(setWaterSourceCropTypeLandCover());
    if (typeof count == 'number' && typeof bottomIndex == 'number') {
      console.log('bottomIndex', bottomIndex);
      console.log('counter', count);
      const result = count - bottomIndex + 1;
      setUnsynced(result || 0);
    } else {
      console.log('setting unsynced failed FAILED');
    }
  }, [data]);
  useEffect(() => {
    const keys = storage.getAllKeys();
    let obj = [];
    for (let a of keys) {
      obj.push(storage.getString(a));
    }
    setData(obj);
  }, []);
  // put this inside of the form
  return (
    <ScrollView style={{flex: 1, flexDirection: 'column', marginTop: 10}}>
      <Button handler={() => navigation.navigate('datacollection')}>
        COLLECT DATA
      </Button>
      <Button
        handler={() => {
          if (disabled) return;
          setDisabled(true);
          upload(() => setDisabled(false), setLogMessage);
          // dispatch(setWaterSourceCropTypeLandCover());
        }}>
        SYNC DATA
      </Button>
      <SmallDrawer
        style={{
          backgroundColor: '#888484',
          width: '90%',
          padding: 10,
        }}
        title={'Sync Data'}
        data={[
          {
            value: synced,
            title: 'Synced',
          },
          {
            value: unsynced,
            title: 'Not Synced',
          },
        ]}></SmallDrawer>

      {logMessage.show ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            padding: 5,
            borderWidth: 1,
            marginTop: 4,
            borderColor: 'green',
            borderRadius: 10,
            marginHorizontal: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'black',
              }}>
              {logMessage.message1}
            </Text>
            <Text
              style={{
                color: 'black',
                paddingHorizontal: 5,
                padding: 5,
              }}>
              - {logMessage.message2}
            </Text>
          </View>
          {logMessage.message1 != 'SYNC COMPLETED' ? (
            <ActivityIndicator size={'large'} color={'red'} />
          ) : null}
        </View>
      ) : null}

      <SmallDrawer
        style={{
          backgroundColor: '#888484',
          width: '90%',
          padding: 10,
          marginTop: 30,
        }}
        title="Water Source"
        data={uiData.waterSource}></SmallDrawer>
      <SmallDrawer
        style={{
          backgroundColor: '#888484',
          width: '90%',
          padding: 10,
          marginTop: 3,
        }}
        title="Crop Type"
        data={uiData.cropType}></SmallDrawer>
      <SmallDrawer
        style={{
          backgroundColor: '#888484',
          width: '90%',
          padding: 10,
          marginTop: 3,
        }}
        title="Land Cover Type"
        data={uiData.landCover}></SmallDrawer>
    </ScrollView>
  );
}
