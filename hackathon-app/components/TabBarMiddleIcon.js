import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={styles.tabbar} />
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#d90429',
    borderColor: 'white',
    borderRadius: 32,
    borderWidth: 3,
    height: 64,
    marginTop: -28,
    width: 64,
  },
});
