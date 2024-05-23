import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Dirs, FileSystem } from 'react-native-file-access';
import { getBottomIndexCount, getJwt, retrieveAllData, setBottomIndex } from '../localStorage';
import { Alert, ToastAndroid } from 'react-native';
// import 'dotenv/config'
// const response = await axios.post(
//   'http://10.0.2.2:3000/api/v1/sync',
//   {
//     fileData: fileData
//   }
// );
export const BACKEND_URL = "http://10.0.2.2:8080/";
// export const BACKEND_URL = "https://icrops-backend.yashk.dev/";

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
    const fileData = await FileSystem.readFile(fileName, 'base64');
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

const completeEntry = async (dataId: Number) => {
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

const sendAnEntry = async (data: any) => {
  try {
    const response: AxiosResponse = await sendData(data);
    const dataId = response.data.dataId;
    console.log(dataId, "IS THE ID")
    let counter = 1;
    // throw Error();
    for (let a of data.images) {
      ToastAndroid.showWithGravity(`Uploading image - ${counter}`, ToastAndroid.BOTTOM, ToastAndroid.CENTER)
      const responseImage = await sendImage(a, response.data.dataId);
      if (!responseImage.data.success) throw Error("Image upload failed")
      counter++;
    }
    const result = await completeEntry(dataId);
    if (result) return true;
    else return false;
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const upload = async (setDisabled: () => void) => {
  const dataArray = retrieveAllData()
  let counter = 1;
  for (let a of dataArray) {
    ToastAndroid.showWithGravity(`Uploading entry - ${counter}`, ToastAndroid.BOTTOM, ToastAndroid.CENTER)
    counter++;
    let success = await sendAnEntry(a);
    if (success) {
      let bottomIndex = getBottomIndexCount();
      if (bottomIndex) setBottomIndex(bottomIndex + 1);
      else {
        console.log("bottom index error")
      }
    }
    else {
      Alert.alert("get a better internet connection, syncing failed")
      break;
    }
  }
  ToastAndroid.showWithGravity(`SYNC COMPLETED`, ToastAndroid.BOTTOM, ToastAndroid.CENTER)
  setDisabled()
  console.log('inside of the networking module');
};
