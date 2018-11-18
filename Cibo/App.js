import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import * as Expo from 'expo'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import  AppContainer  from './Tabs/Route'


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
    
    if(this.state.SignedIn){
      return <AppContainer />
    }
    else{
      return (
        <View style={styles.container}>
          <LoginPage FacebookLogin={this.FacebookLogin} />
          </View>
      )
    }
        }
       
      }
    

const LoginPage = props => {
  return (
    <View style = {styles.LoginPage}>
      <Text style = {styles.Title}>Cibo</Text>
      <Image width = '5' height = '5' style = {{marginTop: 15,alignSelf:'center'}} source={require('./assets/LoginEating.png')}/>
      <Text style = {styles.tagline}>Find the best restaurants.{'\n'}Around your campus.{'\n'}Rated by people.</Text>
      <Text style = {styles.LoginDescription}>Use Cibo with Facebook</Text>
      <Button title='Login with Facebook' buttonStyle={styles.LoginButton} onPress={() => props.FacebookLogin()}/>
    </View>
  )
}








const styles = StyleSheet.create({
  Title: {
    fontSize : 45,
    color: '#FFFFFF',
    marginTop: 100,
    textAlign: 'center',
    fontWeight: '700'
  },
  container: {
    flex: 1,
    backgroundColor: "#D81159",
    alignItems: "center",
    justifyContent: "center"
  },
  LoginDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 40,
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: '500'
  },
  LoginPage: {
    flex: 1,
    alignContent:'center',
    marginTop: 10
  },
  tagline:{
    color:'#FFFFFF',
    fontSize: 20,
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    fontWeight: '300'
    
  },
  LoginButton: {
    marginTop: 20,
    borderRadius: 5,
    width: 200,
    height: 60,
    backgroundColor: '#3B5998',
    alignSelf:'center'
  }
})