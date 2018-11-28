import React from "react";
import {Image,SafeAreaView,View,ScrollView,Text,StyleSheet,FlatList,Dimensions,Linking} from "react-native"
import {Header,ListItem,Button,SearchBar,Divider} from "react-native-elements"
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage} from "react-native-material-cards"
import {createStackNavigator, createAppContainer} from 'react-navigation'
import SearchInput, { createFilter } from 'react-native-search-filter'
const KEYS = ['name', 'vicinity']

class Catalog extends React.Component {
  static navigationOptions = {
    header: null,
    }
  constructor(props) {
    super(props);
    const width = Dimensions.get("screen").width;
  }

  state = {
    Restaurants: [],
    term: '',
  };

  OnChangeSearchText(term) {
    this.setState({ term: term })
  }

  fetchData = async () => {
    try {
      let response = await fetch(
        "https://cibo-api.herokuapp.com/Catalog/GetAllRestaurants"
      );
      let json = await response.json();
      this.setState({
        Restaurants: json,
      });
    } catch (error) {}
  };

  componentWillMount() {
    this.fetchData();
  }

  searchResult = e => {
    let text = e.toLowerCase();
    let Restaurants = this.state.Restaurants;
    let Results = Restaurants.filter(item => {
      return item.name.toLowerCase().match(text);
    });
    if (!text) {
      this.setState({
        Restaurants: Restaurants
      });
    } else if (Array.isArray(Results)) {
      this.setState({
        data: Results
      });
    }
  };

  render() {
    let ScreenWidth = Dimensions.get("screen").width;
    const filtered = this.state.Restaurants.filter(createFilter(this.state.term, KEYS))
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#D32F2F" }}>
        <SearchBar
          searchIcon={{ size: 24 }}
          onChangeText={(term) => { this.OnChangeSearchText(term) }}
          placeholder="Search Cibo here."
          containerStyle={{
            width: ScreenWidth,
            backgroundColor: "#D32F2F",
            height: 50,
            borderBottomColor: "#D32F2F",
            borderTopColor: "#D32F2F"
          }}
        />
        <ScrollView style={styles.container}>
          {filtered.map(item => {
            return (
              <Card
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <Divider style={{ backgroundColor: "#FFFFFF" }} />
              <CardTitle title={item.name} color="#1976D2" />
              <CardContent text={"Address: " + item.vicinity} />
              <CardContent text={"Rating: " + item.rating} />
              <CardContent text={"Price Level (1-3): " + item.price_level} />
              <CardButton title="Explore Restaurant" onPress={()=>this.props.navigation.navigate('Featured',{item})} color='#D32F2F'/>
            </Card>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Featured extends React.Component{
  constructor(props){
      super(props)
    }
  
  
  render(){
    let URI = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+this.props.navigation.state.params.item.photos[0].photo_reference+'&sensor=false&key=AIzaSyCrocPk4wsWjNUBgS0zU3UqS5TDGcWYbl8'
    console.log('https://m.uber.com/?action=setPickup&client_id=iBpczuPTW81ck_QPRHBVN_BmaT0-OfhT&pickup=my_location&dropoff[formatted_address]='+encodeURI(this.props.navigation.state.params.item.vicinity+', TX, USA'))
    let ImageWidth = Dimensions.get('screen').width
    return(
      <ScrollView style = {{flex:1, backgroundColor:'#ffffff'}}>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#D32F2F" centerComponent={{ text: this.props.navigation.state.params.item.name, style: {fontSize:20,fontWeight:'400',color: '#fff' }}}/>
      <Card style = {{backgroundColor:"#D32F2F"}}>
        <CardImage source = {{uri: URI}} />
      </Card>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#512DA8" centerComponent={{ text: 'Ratings by Google: ' + this.props.navigation.state.params.item.rating, style: {fontSize:20,fontWeight:'300',color: '#fff',margin:0}}}/>
      <Header outerContainerStyles = {{ borderBottomWidth:0}} backgroundColor = "#3F51B5" centerComponent={{ text:this.props.navigation.state.params.item.vicinity, style: {fontSize:18,fontWeight:'300',color: '#fff'}}}/>
      <Header outerContainerStyles = {{ borderBottomWidth:0,height:90}} backgroundColor = "#448AFF" centerComponent={ <Button title = "Get a ride with Uber" onPress = {()=>{Linking.openURL("https://m.uber.com/ul/?client_id=eFrzgz_2Du2KYUXIi3MKaNOWtxo3i77K&action=setPickup"+'&pickup=my_location&dropoff[latitude]='+this.props.navigation.state.params.item.geometry.location.lat+'&dropoff[longitude]='+this.props.navigation.state.params.item.geometry.location.lng+'&dropoff[formatted_address]='+this.props.navigation.state.params.item.vicinity)}} buttonStyle={styles.UberButton}/>}/>
    </ScrollView>
    )
  }
}


const StackNavigator = createStackNavigator({
  Catalog:{
    screen:Catalog
  },
  Featured:{
    screen:Featured
  }  
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  UberButton: {
    borderRadius: 5,
    width: 200,
    height: 60,
    backgroundColor: 'black',
    alignSelf:'center'
  }
});
export default createAppContainer(StackNavigator)
