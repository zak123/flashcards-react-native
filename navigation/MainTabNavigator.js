import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeck from '../screens/AddDeck';
import DeckDetail from "../screens/DeckDetail";
import AddCard from "../screens/AddCard";
import StartQuiz from '../screens/StartQuiz';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
    DeckDetail: DeckDetail,
    AddCard: AddCard,
    StartQuiz: StartQuiz,
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
  AddDeck: AddDeck,

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
