import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Bmi from './Bmi'
import Page2 from './Page2'
import { createDrawerNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation'

const stack = createSwitchNavigator({
    Page2Screen:{screen:Page2,navigationOptions: { header: null,
        }},
    BmiScreen:{screen:Bmi,navigationOptions: {
        header: null,}},
    });
    
  export default createAppContainer(stack);