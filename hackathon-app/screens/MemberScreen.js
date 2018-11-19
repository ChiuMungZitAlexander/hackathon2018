import React from 'react';
import {
  FlatList,
  Button,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Member } from '../components/Member';
import restoreAuth from '../services/Auth';


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Member',
    headerRight: <Button onPress={() => navigation.state.params.navigateAddPress()} title="+" />,
  });

  state = {
    clickAdd: false,
    uid: '',
    watchGroup: undefined,
    memberList: [],
  };

  loadMembers = async (watchGroup) => {
    const { data: memberList } = await this.apiClient.get(`/watch-groups/${watchGroup.id}/members`);
    this.setState({ memberList });
  };

  loadGroups = async () => {
    const { data: [watchGroup] } = await this.apiClient.get('/watch-groups');
    if (watchGroup) {
      this.setState({ watchGroup });
      this.loadMembers(watchGroup);
    }
  };

  _onAuth = ([apiClient]) => {
    this.apiClient = apiClient;
    this.loadGroups();
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

  componentDidMount() {
    this.props.navigation.setParams({ navigateAddPress: this.onClickAdd });
  }

  onClickAdd = () => {
    this.setState({ clickAdd: true });
  };

  onClickConfirm = async () => {
    const { uid, watchGroup } = this.state;
    await this.apiClient.post(`/watch-groups/${watchGroup.id}/members`, { user: uid });
    await this.loadMembers(watchGroup);
    this.setState({ clickAdd: false, uid: '' });
  };

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this._restoreAuth} />
        <FlatList
          extraData={this.state}
          data={this.state.memberList}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => <Member data={item} index={index} />}
        />
        {this.state.clickAdd
        && (
          <View>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={uid => this.setState({ uid })}
              value={this.state.uid}
            />
            <View style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20,
            }}
            >
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity style={styles.confirm}  onPress={() =>this.onClickConfirm}>
                  <View>
                    <Text style={{ color: 'white', fontSize: 16 }}>Send</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.cancel} onPress={() => {
                    this.setState({ clickAdd: false });
                  }}>
                  <View>
                    <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  confirm: {    
    width: 90,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#48C0E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    width: 90,
    height: 40,
    borderRadius: 10,
    color: '#f00',
    backgroundColor: '#79939C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
