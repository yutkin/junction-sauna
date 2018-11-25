import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';

import SaunaScreen from '../screens/SaunaScreen';
import BookSaunaScreen from '../screens/BookSaunaScreen';

const SaunaStack = createStackNavigator({
  Sauna: SaunaScreen,
  BookSauna: BookSaunaScreen
});

SaunaStack.navigationOptions = {
  tabBarLabel: 'Sauna',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  SaunaStack,
  ProfileStack,
}, {
  initialRouteName: 'SaunaStack'
});
