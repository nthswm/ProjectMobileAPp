import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import signup from './signup'
import signin from './signin'
import Home from './Home'
//import test from './test'
import Bottomnav from './Bottomnav'
import { createDrawerNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation'

const stack = createSwitchNavigator({
  HomeScreen:{screen:Home,navigationOptions: {
    title: 'Home'}},
  signinScreen:{screen:signin,navigationOptions: {
    title: 'signin'}},
  signupScreen:{screen:signup,navigationOptions: {
    title: 'signup'}},
  //testScreen:{screen:test,navigationOptions: {
  //    title: 'test'}},
  BottomnavScreen:{screen:Bottomnav,navigationOptions: {
      title: 'Bottomnav'}},
  });
  

export default createAppContainer(stack);
