import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import profile from './profile'
import edit from './edit'
import Change from './changepwd'
import { createDrawerNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation'

const stack = createSwitchNavigator({
    profileScreen:{screen:profile,navigationOptions: {
      title: 'profile'}},
    editScreen:{screen:edit,navigationOptions: {
        title: 'edit'}},
    ChangeScreen:{screen:Change,navigationOptions: {
        title: 'Change'}},
    });
    
  export default createAppContainer(stack);