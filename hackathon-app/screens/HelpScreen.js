import React from 'react';
import {
  TouchableOpacity, Text, View, StyleSheet,
} from 'react-native';

export default class HelpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  sendMessage = () => {
    console.log('message sent');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.mainMessage}>Keep Going...</Text>
          <Text style={styles.mainMessage}>We are recording</Text>
          <Text style={styles.mainMessage}>Send to get help</Text>
          <Text style={styles.subMessage}>* Or go back to cancel</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.sendMessage()}>
          <View>
            <Text style={{ color: 'white', fontSize: 40 }}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 25,
    backgroundColor: '#edf2f4',
  },
  textBox: {
    justifyContent: 'space-between',
    height: 200,
  },
  mainMessage: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2b2d42',

  },
  subMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#8d99ae',

  },
  button: {
    fontSize: 40,
    height: 200,
    width: 200,
    backgroundColor: '#d90429',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
});
