import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
class Featured extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.textFirst}> Featured </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textFirst: {
  fontSize: 50,
  textAlign: 'center',
  marginTop: 300,
  },
});
export default Featured