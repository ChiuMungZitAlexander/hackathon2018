import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import styles from './styles/LogInScreen';
import { signIn, signOut } from '../services/Auth';

export default class LogInScreen extends React.Component {
  state = {
    user: 'tao_wang@epam.com',
    password: 'p@$$w0rd',
  };

  _onAuth = ([apiClient]) => {
    this.apiClient = apiClient;
    this.props.navigation.goBack();
  };

  _signIn = async (username, password) => {
    const res = await signIn(username, password);
    if (res) {
      this._onAuth(res);
    }
  };

  onClickLogin = async () => {
    const { user, password } = this.state;
    await signOut();
    await this._signIn(user, password);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email or Mobile Num"
          onChangeText={user => this.setState({ user })}
          value={this.state.user}
          placeholderTextColor="black"
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.onClickLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
