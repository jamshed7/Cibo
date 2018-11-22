import React from 'react'
import {SafeAreaView,View,ScrollView, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import {Divider,Header, ListItem, Button } from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import t from 'tcomb-form-native'


class MeetnEat extends React.Component {
  static navigationOptions = {
    header: null,
    }

  render() {
    return (
      <SafeAreaView style = {{flex: 1, backgroundColor: '#008c9e'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#008c9e" centerComponent={{ text: "Meet and Eat", style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
      <ScrollView style = {styles.container}>
      <Card isDark style = {{backgroundColor : "#008c9e", borderRadius : 10, marginTop:10, color:'white'}}>
      <CardImage source = {{uri:'https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=1340&q=80'}} ></CardImage>  
      <CardTitle title = "Good food is all the sweater when shared with great friends" subtitle = "Organize an event or as we call it - Meetn'Eat" ></CardTitle>
      <CardButton color = "white" title= "Setup an event" onPress = {() => this.props.navigation.navigate('CreateEvent')}></CardButton>
      </Card>
      <Text style = {{alignSelf:'center',color:'white',fontSize:40,fontWeight:'200'}}>Or</Text>
      <Card isDark style = {{backgroundColor : "#008c9e", borderRadius : 10, marginTop:10, color:'white'}}>
      <CardImage source = {{uri:'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2509062230c1f470a9d5b87310fee627&auto=format&fit=crop&w=1350&q=80'}} ></CardImage>  
      <CardTitle title = "Very few things in life are as good as food and friends." subtitle = "Find a local MeetnEat - find food and friends." ></CardTitle>
      <CardButton color = "white" title= "View Events" onPress = {() => this.props.navigation.navigate('CreateEvent')}></CardButton>
      </Card>
      

      </ScrollView>
      </SafeAreaView> 
    );
  }
}

const Form = t.form.Form
const EventDetails = t.struct({
    EventName : t.String,
    Organizer: t.String,
    Date: t.String,
    Address: t.String,
    Contact: t.String
  })
  


class CreateEvent extends React.Component{
  state = {
    Created : false
  }
  SendData = async()=>{
    const FormFields = this.CreateEventField.getValue()
    try {
      let response = await fetch('https://cibo-api.herokuapp.com/MeetnEat/AddEvent?EventName="'+FormFields.EventName+'"&Name="'+FormFields.Organizer+'"&Date="'+FormFields.Date+'"&Address="'+FormFields.Address+'"&Contact="'+FormFields.Contact+'"')
      let res = await response.json()
      if(res.status === "success"){
        this.setState({
          Created: true
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if(this.state.Created){
      return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#008c9e'}}>
        <ScrollView style = {styles.container}>
        <Card isDark style = {{backgroundColor : "#008c9e", borderRadius : 10, marginTop:10, color:'white'}}>
        <CardImage source = {{uri:'https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=1340&q=80'}} ></CardImage>  
        <CardTitle title = "Thank You." subtitle = "We hope you have a great MeetnEat." ></CardTitle>
        </Card>
        </ScrollView>
        </SafeAreaView> 
      )
    }
    else{
      return (
        <SafeAreaView style = {{flex: 1, backgroundColor: '#008c9e'}}>
        <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#008c9e" centerComponent={{ text: "Meet and Eat", style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
        <ScrollView style = {styles.container}>
        <Form ref={c => this.CreateEventField = c} type = {EventDetails} />
        <Button title = "Confirm MeetnEat" onPress = {this.SendData}></Button>
        </ScrollView>
        </SafeAreaView> 
      )
    }
  }
}

class AllEvents extends React.Component{
  static navigationOptions = {
    header: null,
    }

  state = {
    data : []
  };

  componentWillMount(){
    this.fetchArticles()
  }

  fetchArticles = async() =>{
    const response = await fetch('https://cibo-api.herokuapp.com/MeetnEat/ShowAllEvents')
    const json = await response.json()
    this.setState({data:json})
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#353866'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#353866" centerComponent={{ text: 'The Cibo Editorial', style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
      <ScrollView style = {styles.container}>
        <FlatList
        data = {this.state.data}
        keyExtractor={(item) => item._id.$oid}
        renderItem={({ item }) => (
          <Card>
            
          </Card>
        )}
      
        />
    
      </ScrollView>
      </SafeAreaView>
    )
        }
}

const AppNavigator = createStackNavigator({
  MeetnEat: {
    screen: MeetnEat
  },
  CreateEvent:{
    screen: CreateEvent
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005f6b",
    color:'white'
  }
});
export default createAppContainer(AppNavigator)