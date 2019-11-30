import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import SwitchNavigator from './components/SwitchNavigator'

export default class App extends React.Component {
  render()
  {
    return (
      <View style={{flex: 1,marginTop:StatusBar.currentHeight}}>
        <SwitchNavigator/>
      </View>
    );
  }
}
