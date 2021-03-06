import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthScreen from '../screens/AuthScreen';
import { Icon } from 'native-base';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import CheckFirstUseScreen from '../screens/CheckFirstUseScreen';
import HomeScreen from '../screens/HomeScreen';

const RootTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({}) => ({
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon type="FontAwesome5" name="home" style={{ color: focused ? tintColor : '#BDBDBD' }} />
        ),
        title: 'Home',
      }),
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        alignItems: 'center',
        padding: 0,
        opacity: 1,
      },
      activeTintColor: '#242A2D',
      labelStyle: {
        marginBottom: 0,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'System',
      },
      style: {
        padding: 5,
        height: Platform.OS === 'ios' ? 55 : 58,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        flexDirection: 'row',
      },
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    { CheckFirstUseScreen, AuthScreen, RootTabNavigator },
    {
      initialRouteName: 'CheckFirstUseScreen',
    }
  )
);
