import axios from 'axios';
import {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TextInputComponent,
  TextInputProps,
  View,
} from 'react-native';
import {BACKEND_URL} from '../networking';
import {useMMKVString} from 'react-native-mmkv';
import {setJwtEmail} from '../localStorage';
// import "dotenv/config"

export default function () {
  const backendUrl = BACKEND_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const submit = useCallback(async () => {
    // console.log(email, "is the email", password, "is the password here", backendUrl)
    const response = await axios.post(BACKEND_URL+"api/v1/user/login/", {
      email,
      password,
    });
    console.log(response)
    if (response.data.success){
      // console.log("GOT THE RESPONSE", response.data)
      setJwtEmail(response.data.jwt, response.data.email);
    }
      else {
      Alert.alert('Login failed, check the password and email id');
    }
  }, [email, password]);
  return (
    <>
      <ScrollView
        style={{
          flexDirection: 'column',
          // alignItems: "center",
          // justifyContent: "center"
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              padding: 20,
              color:"black",
              fontWeight: "600"
            }}>
            Login to iCrops App
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Email ID
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              // borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              color: "black",
              fontSize: 18,
              paddingLeft: 8
            }}
            value={email}
            onChangeText={setEmail}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              flex: 1,
              textAlign: 'left',
              width: '80%',
            }}>
            Password
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              // borderBlockColor: 'grey',
              borderWidth: 1,
              width: '80%',
              borderRadius: 10,
              fontSize: 18,
              color: "black",
              paddingLeft: 8
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <Button onPress={() => submit()} title="Submit"></Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
