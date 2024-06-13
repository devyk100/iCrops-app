import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectResetter} from '../features/LocationSlice';

type dataType = {
  value: number;
  title: string;
};

export default function ({
  data,
  action,
}: {
  data: dataType[];
  action: (payload: any) => any;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState(1);
  const [firstTime, setFirstTime] = useState(true);
  const resetterValue = useSelector(selectResetter);
  useEffect(() => {
    setModalValue(1);
    console.log(resetterValue);
  }, [resetterValue]);
  return (
    <>
      {resetterValue ? null : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            padding: 10,
            borderTopColor: 'red',
            borderTopWidth: 3,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              flex: 1,
              backgroundColor: 'grey',
              height: 40,
              borderRadius: 40,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                color: 'black',
              }}>
              Close
            </Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              width: '65%',
              margin: 10,
            }}>
            {data.map((value: any, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={e => {
                    setModalValue(value.value);
                    setModalVisible(t => !t);
                    action(value.title);
                    setFirstTime(false);
                  }}
                  // key={value.title}
                  style={{
                    padding: 5,
                    margin: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}>
                  {modalValue != value.value ? (
                    <Text style={{color: 'black', fontSize: 18}}>
                      {value.title}
                    </Text>
                  ) : (
                    <Text style={{color: 'blue', fontSize: 18}}>
                      {value.title}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      {/* <TouchableOpacity
                style={{
                  backgroundColor: '#d4d4d4',
                  padding: 10,
                  marginTop: 0,
                }}
                onPress={() => setModalVisible(t => !t)}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {data[modalValue-1]?.title}
                </Text>
              </TouchableOpacity> */}
      <Button
        title={firstTime ? 'Unselected' : data[modalValue - 1]?.title}
        onPress={() => setModalVisible(t => !t)}></Button>
    </>
  );
}
