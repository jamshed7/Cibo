import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import {createAppContainer ,createBottomTabNavigator} from 'react-navigation'

import Featured from './Featured'
import Catalog from './Catalog'
import MeetnEat from './MeetnEat'
import Editorial from './Editorial'

const BottomTabs = createBottomTabNavigator({
    Catalog: {
        screen: Catalog,
    }
    ,
    MeetnEat: {
        screen: MeetnEat
    },
    Editorial: {
        screen: Editorial
    },
},{
    tabBarOptions: {
        
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'blue',
        },
      }
}
)

const AppContainer = createAppContainer(BottomTabs)

export default AppContainer