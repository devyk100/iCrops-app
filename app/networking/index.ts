import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Dirs, FileSystem, } from 'react-native-file-access';
import * as RNFS from "react-native-fs"
import { getBottomIndexCount, getJwt, retrieveAllData, setBottomIndex } from '../localStorage';
import { Alert, ToastAndroid } from 'react-native';
import axiosRetry from 'axios-retry';
import { MessageProp } from '../components/LandingPage';
// import 'dotenv/config'
// const response = await axios.post(
//   'http://10.0.2.2:3000/api/v1/sync',
//   {
//     fileData: fileData
//   }
// );
// export const BACKEND_URL = "http://10.0.2.2:8090/";
export const BACKEND_URL = "http://maps.icrisat.org/";
// export const BACKEND_URL = "http://192.168.0.107:8090/";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 700),
  retryCondition(error) {
    switch (error?.response?.status) {
      //retry only if status is 500 or 501
      case 500:
      case 501:
        return true;
      default:
        return false;
    }
  },
  // onRetry: (retryCount, error, requestConfig) => {
  //   console.log(`retry count: `, retryCount);
  //   if (retryCount == 2) {
  //     requestConfig.url = 'https://postman-echo.com/status/200';
  //   }
  // },
});


const sendData = async (data: any) => {
  const jwt = getJwt();
  const response = await axios.post(
    BACKEND_URL + 'api/v1/sync/',
    {
      ...data,
      noOfImages: data.images.length
    }
    , {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  console.log(response.data.success, " IS THE SUCCESS")
  return response;
}

const sendImage = async (fileName: string, dataId: number) => {
  try {
    console.log(dataId, "IS THE ID")
    const fileData = await RNFS.readFile(fileName, 'base64');
    const jwt = getJwt();
    const response = await axios.post(
      BACKEND_URL + 'api/v1/sync/image/',
      {
        fileData: fileData,
        dataId: dataId
      }
      , {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    return response
  }
  catch (error) {
    console.log("an error occured")
    Alert.alert("And error with " + error + " occured");
    return {
      data: {
        success: false
      }
    } as AxiosResponse<any, any>
  }
}

const sendCompleteRequest = async (dataId: Number) => {
  try {
    const jwt = getJwt();
    const response: AxiosResponse = await axios.post(BACKEND_URL + "api/v1/sync/complete", {
      dataId: dataId
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    if (response.data.success) {
      return true;
    }
    else {
      return false
    }
  }
  catch (error) {
    return false
  }
}

const sendAnEntry = async (data: any, textSetter: (callBack: (message: MessageProp) => MessageProp) => void) => {
  try {
    const response: AxiosResponse = await sendData(data);
    const dataId = response.data.dataId;
    console.log(dataId, "IS THE ID")
    let counter = 1;
    // throw Error();
    if (data.landCoverType == "Cropland")
      if (data.images < 1) {
        Alert.alert("Duplicate unintegral data found, deleting..")
        return true;
      }
    for (let a of data.images) {
      textSetter((value: MessageProp) => {
        return {
          message1: value.message1,
          message2: `Uploading image - ${counter}`,
          show: true
        }
      })
      const responseImage = await sendImage(a, response.data.dataId);
      if (!responseImage.data.success) throw Error("Image upload failed")
      counter++;
    }
    return true;
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const upload = async (setDisabled: () => void, textSetter: (message: (message: MessageProp) => MessageProp) => void) => {
  const dataArray = retrieveAllData()
  let counter = 1;
  for (let a of dataArray) {
    let images = a.images;
    textSetter((value: MessageProp) => {
      return {
        message1: `Uploading entry - ${counter}`,
        message2: "",
        show: true
      }
    })
    counter++;
    console.log(a, 'IS THE DATA')
    let success = await sendAnEntry(a, textSetter);
    if (success) {
      let bottomIndex = getBottomIndexCount();
      if (bottomIndex) {
        setBottomIndex(bottomIndex + 1);
        let deletePromise: Promise<void>[] = []
        console.log(images)
        // for (let filename of images) {
        //   await (RNFS.unlink(filename));
        // }
      }
      else {
        console.log("bottom index error")
      }
    }
    else {
      Alert.alert("get a better internet connection, syncing failed")
      break;
    }
  }
  textSetter((value) => {
    return {
      message1: `SYNC COMPLETED`,
      message2: "",
      show: true
    }
  })
  setTimeout(() => {
    textSetter((value) => {
      return {
        ...value,
        show: false
      }
    })
  }, 2000)
  setDisabled()
  console.log('inside of the networking module');
};
