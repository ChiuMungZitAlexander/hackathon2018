import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TabBarMiddleIcon from '../components/TabBarMiddleIcon';

import HelpScreen from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MemberScreen from '../screens/MemberScreen';
import PersonalScreen from '../screens/PersonalScreen';
import MapScreen from '../screens/MapScreen';
import LogInScreen from '../screens/LogInScreen';

const HomeStack = createStackNavigator({
  Home: MapScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const HelpStack = createStackNavigator({
  Help: HelpScreen,
});

HelpStack.navigationOptions = {
  tabBarLabel: 'SOS',
  tabBarIcon: <TabBarMiddleIcon />,
};

const ProfileStack = createStackNavigator(
  {
    Profile: { screen: ProfileScreen },
    Personal: { screen: PersonalScreen },
    Member: { screen: MemberScreen },
    Login: { screen: LogInScreen },
  },
);

ProfileStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Profile',
  tabBarVisible: navigation.state.index === 0,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
});

export default createBottomTabNavigator({
  HomeStack,
  HelpStack,
  ProfileStack,
});
