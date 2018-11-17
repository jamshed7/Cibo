import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as Expo from 'expo'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {SignedIn: false, Name: ""}
  }

  FacebookLogin = async() =>{
    try{
      const {type, token, expires, permissions, declinedPermissions} = await Expo.Facebook.logInWithReadPermissionsAsync('2183243971931078',{
        permissions : ['public_profile','email'],
        behavior: 'native'
      })

      if(type === 'success'){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        this.setState({
          SignedIn: true
        })
    }
      else{
        //oof
        alert("Oof")
      }
    }
    catch({message}){
      alert(`OAuth Login Error : ${message}`)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.SignedIn ? (
          <LoggedInPage />
        ) : (
          <LoginPage FacebookLogin={this.FacebookLogin} />
        )}
      </View>
    )
        }
      }

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.Title}>Cibo</Text>
      <Text style={styles.header}>Use Cibo with Facebook</Text>
      <Button title="Sign in with Facebook" onPress={() => props.FacebookLogin()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  Title: {
    fontSize : 75,
    color: '#4FB0C6'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  }
})