import React from 'react'
import { SafeAreaView,View,ScrollView, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import { Header,Card, ListItem, Button,SearchBar} from 'react-native-elements'
import {createStackNavigator, createAppContainer } from 'react-navigation'

class Catalog extends React.Component {
  constructor(props){
    super(props)
    const width = Dimensions.get('screen').width
  }

  state = {
    Restaurants : []
  }

  fetchData = async() =>{
    try{
      let response = await fetch('https://cibo-api.herokuapp.com/Catalog/GetAllRestaurants')
      let json = await response.json()
      this.setState({
        Restaurants : json
      })
    }
    catch(error){

    }
  }

  componentWillMount(){
    this.fetchData()
  }

  searchResult = (e) =>{
    let text = e.toLowerCase()
    let Restaurants = this.state.Restaurants
    let Results = Restaurants.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if(!text){
      this.setState({
        Restaurants: Restaurants
      })
    }
    else if(Array.isArray(Results)) {
      this.setState({
        data: Results
      })
  }
}


  render() {
    let ScreenWidth = Dimensions.get('screen').width
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#D32F2F'}}>
        <SearchBar searchIcon={{ size: 24 }} onChangeText = {this.searchResult.bind(this)} placeholder='Search Cibo here.' containerStyle = {{width:ScreenWidth, backgroundColor:'#D32F2F',height:50,borderBottomColor:'#D32F2F',borderTopColor:'#D32F2F'}} />
        <ScrollView style = {styles.container}>
        <FlatList
        data = {this.state.Restaurants}
        keyExtractor={(item) => item._id.$oid}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
        />
        </ScrollView>
        </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
export default Catalog