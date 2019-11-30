import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopNavigator from './TopNavigator'

export default class App extends React.Component {
  render()
  {
    return (
      <View style={{flex:1}}>
        <TopNavigator/>
      </View>
    );
  }
}
