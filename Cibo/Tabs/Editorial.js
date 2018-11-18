import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
class Editorial extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.textFirst}> Editorial </Text>
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
export default Editorial