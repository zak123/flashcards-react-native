import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { DeckDetail } from "../screens/DeckDetail";
import {AddCard} from "../screens/AddCard";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
    DeckDetail: DeckDetail,
    AddCard: AddCard,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '-box' : ''}`
          : 'md-list'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Create Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
});
