import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import BottomNavigator from './BottomNavigator'

export default class App extends React.Component {
  render()
  {
    return (
      <View style={{flex: 1}}>
        <BottomNavigator/>
      </View>
    );
  }
}
