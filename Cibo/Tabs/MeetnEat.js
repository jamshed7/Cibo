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
      <SafeAreaView style = {{flex: 1, backgroundColor: '#03A9F4'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#03A9F4" centerComponent={{ text: "Meet and Eat", style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
      <ScrollView style = {styles.container}>
      <Card isDark style = {{backgroundColor : "#03A9F4", borderRadius : 10, marginTop:10, color:'white'}}>
      <CardImage source = {{uri:'https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=1340&q=80'}} ></CardImage>  
      <CardTitle title = "Good food is all the sweater when shared with great friends" subtitle = "Organize or attend an event or as we call it - Meetn'Eat" ></CardTitle>
      <CardAction separator={true} inColumn={false}>
      <CardButton color = "white" title= "Setup an event" onPress = {() => this.props.navigation.navigate('CreateEvent')}></CardButton>
      <CardButton color = "white" title= "View Events" onPress = {() => this.props.navigation.navigate('AllEvents')}></CardButton>
      </CardAction>
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

const RSVP = t.struct({
    Name: t.String,
    Email: t.String
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
        <SafeAreaView style = {{flex: 1, backgroundColor: '#03A9F4'}}>
        <ScrollView style = {styles.container}>
        <Card isDark style = {{backgroundColor : "#03A9F4", borderRadius : 10, marginTop:10, color:'white'}}>
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
        <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#03A9F4" centerComponent={{ text: "Meet and Eat", style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
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
  
  state = {
    data : []
  };

  componentWillMount(){
    this.fetchEvents()
  }

  fetchEvents = async() =>{
    const response = await fetch('https://cibo-api.herokuapp.com/MeetnEat/ShowAllEvents')
    const json = await response.json()
    this.setState({data:json})
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#03A9F4'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#03A9F4" centerComponent={{ text: 'Local Meet n\' Eats', style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
      <ScrollView style = {styles.container}>
        <FlatList
        data = {this.state.data}
        keyExtractor={(item) => item._id.$oid}
        renderItem={({ item }) => (
          <Card  style = {{backgroundColor : "white", borderRadius : 10, marginTop:10}}>
          <CardTitle title={item['Event Name']} color = '#1976D2'></CardTitle>
          <Divider style={{ backgroundColor: '#111111' }} />
          <CardContent text = {'Post by: ' + item.Organizer} />
          <CardContent text = {'Date and Time: '+ item.Date} />
          <CardContent text = {'Contact: '+ item.Contact} />
          <CardButton color = "#1976D2" title = "Attend Event" onPress={()=>{this.props.navigation.navigate('AttendEvent',{item})}}></CardButton>
        </Card>
        )}
      
        />
    
      </ScrollView>
      </SafeAreaView>
    )
        }
}

class AttendEvent extends React.Component{
  state = {
    SignedUp: false
  }

  SendData = async()=>{
    const FormFields = this.JoinEventField.getValue()
    try {
      console.log(this.props.navigation.state.params.item['Event Name'])
      let response = await fetch('https://cibo-api.herokuapp.com/MeetnEat/JoinEvent?EventName="'+this.props.navigation.state.params.item['Event Name']+'"&Organizer="'+this.props.navigation.state.params.item.Organizer+'"&Date="'+this.props.navigation.state.params.item.Date+'"&Address="'+FormFields.Address+'"&Contact="'+this.props.navigation.state.params.item.Contact+'"&Name="'+FormFields.Name+'"&Email='+FormFields.Email+"'&oid="+this.props.navigation.state.params.item._id.$oid)
      let res = await response.json()
      console.log(res)
      if(res.status === "success"){
        this.setState({
          SignedUp: true
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  render(){
    if(this.state.SignedUp){
      return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#03A9F4'}}>
        <ScrollView style = {styles.container}>
        <Card isDark style = {{backgroundColor : "#03A9F4", borderRadius : 10, marginTop:10, color:'white'}}>
        <CardImage source = {{uri:'https://images.unsplash.com/photo-1535700601052-b90a78c466f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f50a3776b0916ec81eac3ab6fc2d514c&auto=format&fit=crop&w=1340&q=80'}} ></CardImage>  
        <CardTitle title = "Thank You." subtitle = "Gear up for the event. You should be getting a confirmation email soon." ></CardTitle>
        </Card>
        </ScrollView>
        </SafeAreaView> 
        )
    }
    else{
      return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#03A9F4'}}>
        <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#03A9F4" centerComponent={{ text: "Meet and Eat", style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
        <ScrollView style = {styles.container}>
        <Form ref={c => this.JoinEventField = c} type = {RSVP} />
        <Button title = "Confirm MeetnEat" onPress = {this.SendData}></Button>
        </ScrollView>
        </SafeAreaView> 
      )
    }
  }
}

const AppNavigator = createStackNavigator({
  MeetnEat: {
    screen: MeetnEat
  },
  CreateEvent:{
    screen: CreateEvent
  },
  AllEvents:{
    screen: AllEvents
  },
  AttendEvent: {
   screen: AttendEvent 
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1976D2",
    color:'white'
  }
});
export default createAppContainer(AppNavigator)