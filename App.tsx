/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import {View, TextField, Text, Button, Card, LoaderScreen, Colors, StackAggregator} from 'react-native-ui-lib';
import LandingPage from './app/components/LandingPage';
import DataCollection from './app/components/DataCollection';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>

    <View>

    {/* <LandingPage /> */}
    <DataCollection />
    </View>
    </GestureHandlerRootView>
  );
}
export default App;