import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Switchbmi from './Switchbmi'

export default class App extends React.Component {
  render()
  {
    return (
      <View style={{flex: 1}}>
        <Switchbmi/>
      </View>
    );
  }
}
