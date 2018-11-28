import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import {createAppContainer ,createBottomTabNavigator} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import Featured from './Featured'
import Catalog from './Catalog'
import MeetnEat from './MeetnEat'
import Editorial from './Editorial'

const BottomTabs = createBottomTabNavigator({
    Catalog: {
        screen: Catalog,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-restaurant" size={30} color="white" />
            )
          }
    }
    ,
    MeetnEat: {
        screen: MeetnEat,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-people" size={30} color="white" />
            )
          }
    },
    Editorial: {
        screen: Editorial,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-paper" size={28} color="white" />
            )
          }
    },
},{
    tabBarOptions: {

        activeTintColor: 'white',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#303F9F',
        },
      }
}
)

const AppContainer = createAppContainer(BottomTabs)

export default AppContainer