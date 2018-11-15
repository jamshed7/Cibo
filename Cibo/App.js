import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Expo from 'expo'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {SignedIn: false, Name: ""}
  }

  FacebookLogin = async() =>{
    try{
      const {type, token, expires, permissions, declinedPermissions} = await Expo.Facebook.logInWithReadPermissionsAsync('2183243971931078',{
        permissions : ['public_profile'],
        behavior: 'native'
      })

      if(type === 'success'){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        this.setState({
          SignedIn: true,
          Name = response.json().name
        })
    }
      else{
        //oof
      }
    }
    catch({message}){
      alert(`OAuth Login Error : ${message}`)
    }
  }
  
  render(){
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
