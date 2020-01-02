import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './pages/SignIn'

import CheckIn from './pages/CheckIn'

import HelpOrders from './pages/HelpOrders'
import HelpOrdersCreate from './pages/HelpOrders/Create'
import HelpOrdersShow from './pages/HelpOrders/Show'

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIn,
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  HelpOrdersCreate,
                  HelpOrdersShow,
                },
                {
                  headerMode: 'none',
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
              },
            },
          },
          {
            tabBarOptions: {
              style: {
                paddingBottom: 15,
              },
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: '#999',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  )
