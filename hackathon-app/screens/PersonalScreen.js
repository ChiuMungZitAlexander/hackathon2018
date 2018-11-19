import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import restoreAuth from '../services/Auth';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Personal',
  };

  state = {
    healthChecks: [],
  };

  loadHealthChecks = async () => {
    const { data: healthChecks } = await this.apiClient.get('/health-checks');
    this.setState({ healthChecks });
  };

  _onAuth = ([apiClient]) => {
    this.apiClient = apiClient;
    this.loadHealthChecks();
  };

  _restoreAuth = async () => {
    const res = await restoreAuth();
    if (res) {
      this._onAuth(res);
    }
  };

  componentWillMount() {
    this._restoreAuth();
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this._restoreAuth} />
        <FlatList
          extraData={this.state}
          data={this.state.healthChecks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.createdAt}</Text>
              <Text>{item.watchdog.name}</Text>
              <Text>{item.result}</Text>
              <Text>{item.isSatisfied}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
// });
