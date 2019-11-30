import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Page1 from './Page1'
import Page2 from './Page2'
import profile from './profile' 
import random from './random'
import Switchbminavi from './Switchbminavi'
import TopNavigation from './TopNavigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

const stackPage1 = createStackNavigator({
  Page1Screen:{screen:Page1,navigationOptions: {header:null}},
});

const stackPage2 = createStackNavigator({
  SwitchbminaviScreen:{screen:Switchbminavi,navigationOptions: {  header: null,}},
});

const stackPage3 = createStackNavigator({
    TopNavigationScreen:{screen:TopNavigation,navigationOptions: {header:null}},
});

const stackPage4 = createStackNavigator({
  randomScreen:{screen:random,navigationOptions: {header:null}},
});

const navigator = createBottomTabNavigator({
    buttomPage1:{screen:stackPage1,navigationOptions: {
    title: 'BMI'}},
    buttomPage2:{screen:stackPage2,navigationOptions: {
    title: 'History'}},
    buttomPage3:{screen:stackPage3,navigationOptions: {
    title: 'Profile'}},
    buttomPage4:{screen:stackPage4,navigationOptions: {
      title: 'Random'}},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == 'buttomPage1') {
          iconName = 'ios-star';
        } 
        else if(routeName == 'buttomPage2'){
          iconName = 'md-time';
        }
        else if(routeName == 'buttomPage3'){
          iconName = 'md-person';
        }
        else if(routeName == 'buttomPage4'){
          iconName = 'ios-egg';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),

    tabBarOptions: {
      showLabel: true,
      activeTintColor: 'white',
      inactiveTintColor: '#000000',
      activeBackgroundColor:'#C4C4C4',
      labelStyle:{fontSize:15},
      tabStyle:{backgroundColor:'#FEC100',opacity:.8}
    }

})


export default createAppContainer(navigator);
