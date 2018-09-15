import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
  render() {
    let pic = {
      uri: 'http://cibo-cdn.s3.us-east-2.amazonaws.com/hdr/chipotle-arlington-tx-main.jpg'
    }
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height/4;
    return (
      <View style={styles.container}>
        <Image source={pic} style={{width: width, height: height}}/>
        <Text style = {{fontSize : 30, fontWeight : 'bold', marginTop : 10, color : 'gold'}}>Chipotle<Text style = {{fontSize : 30, fontWeight : '200', marginTop : 10, color : 'white'}}> Mexican Grill</Text></Text>
        <Text style = {{fontSize : 15,marginTop : 10, color : 'white'}}>1390 S Cooper St #100, Arlington, TX 76013</Text>
        <Text style =  {{fontSize : 15,marginTop : 25, color : 'gold'}}>Description<Text style = {{fontSize : 15, fontWeight : '100', marginTop : 25, color : 'white'}}>: Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.</Text></Text>
        <TouchableOpacity style={styles.cibotag}><Text style = {{fontSize : 15, fontWeight : '100',color : 'gold', alignSelf : 'center'}}>#Burritos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cibotag}><Text style = {{fontSize : 15, fontWeight : '100',color : 'gold', alignSelf : 'center'}}>#FastFood</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cibotag}><Text style = {{fontSize : 15, fontWeight : '100',color : 'gold', alignSelf : 'center'}}>#Cheap</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cibotag}><Text style = {{fontSize : 15, fontWeight : '100',color : 'gold', alignSelf : 'center'}}>#BuildYourOwn</Text></TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
   cibotag:{
     marginTop : 10,
     marginLeft: 5,
     marginRight: 5,
     opacity: 10,
     borderRadius: 5,
   } 
});
