import React from 'react'
import { View,ScrollView, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import { Header,Card, ListItem, Button,SearchBar} from 'react-native-elements'

class Catalog extends React.Component {
  constructor(props){
    super(props)
    const width = Dimensions.get('screen').width
  }
  render() {
    return (
      <View style = {styles.container}>
        <ScrollView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34314c",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Catalog