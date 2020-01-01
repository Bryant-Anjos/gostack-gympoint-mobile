import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import SignIn from './pages/SignIn'

import CheckIn from './pages/CheckIn'
import HelpOrders from './pages/HelpOrders'

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
            HelpOrders,
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
