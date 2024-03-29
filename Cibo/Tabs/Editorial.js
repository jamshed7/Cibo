import React from 'react'
import {ActivityIndicator,SafeAreaView,View,ScrollView, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import { Header, ListItem, Button } from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {createStackNavigator, createAppContainer} from 'react-navigation'


class Editorial extends React.Component {
  
  static navigationOptions = {
    header: null,
    }



  state = {
    data : [],
    loading: true
  };

  componentWillMount(){
    this.fetchArticles()
  }

  fetchArticles = async() =>{
    const response = await fetch('https://cibo-api.herokuapp.com/Editorials/GetEditorialFeed')
    const json = await response.json()
    this.setState({data:json,loading:false})
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#303F9F'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#303F9F" centerComponent={{ text: 'Editorial', style: {fontSize: 30, fontWeight:'300',color: '#fff' }}}/>
      <ScrollView style = {styles.container}>
      <ActivityIndicator style={{opacity: this.state.loading ? 1.0 : 0.0}} animating={true} size="small" color = 'white'/>
        <FlatList
        data = {this.state.data}
        keyExtractor={(item) => item._id.$oid}
        renderItem={({ item }) => (
          <Card style = {{backgroundColor : "#303F9F", borderRadius : 10, marginTop:10}}>
            <CardImage source={{uri: item.ImageLink}} title={item.Title} style = {{fontWeight:'200', color:'orange',backgroundColor:'rgba(52, 52, 52, 0.8)'}}/>
            <CardButton onPress={() => this.props.navigation.navigate('Article',{item})} title={Math.ceil(item.Body.length/256) + ' min read by The Cibo Team'} color = "white" />
          </Card>
        )}
      
        />
    
      </ScrollView>
      </SafeAreaView>
    );
  }
}

class Article extends React.Component {
  

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    headerTitleStyle: {
      color: 'white'
    }
    }
  

  render() {
    return (
      <ScrollView style = {{flex:1, backgroundColor:'#ffffff'}}>
        <Card style = {{backgroundColor : "#ffffff", borderRadius : 10, margin:0,color:'white'}}>
            <CardImage source={{uri: this.props.navigation.state.params.item.ImageLink}} style = {{fontWeight:'200', color:'orange',backgroundColor:'rgba(52, 52, 52, 0.8)'}}/>
            <CardTitle  title={this.props.navigation.state.params.item.Title} subtitle = "By the Cibo Team" />
            <CardContent text={this.props.navigation.state.params.item.Body}/>
        </Card>
      </ScrollView>
    );
  }
}



const AppNavigator = createStackNavigator({
  Editorial: {
    screen: Editorial
  },
  Article:{
    screen: Article
  }
})

const styles = StyleSheet.create({
  Title: {
    fontSize : 30,
    color: '#FFFFFF',
    marginTop: 50,
    textAlign: 'center',
    fontWeight: '700'
  },
  container: {
    flex: 1,
    backgroundColor: "#536DFE",
  },
  ArticleListing: {
    height: (Dimensions.get('window') - 50)/2
  }
});
export default createAppContainer(AppNavigator)