import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Icon } from 'expo';

import restoreAuth from '../services/Auth';

import Avatars from '../constants/Avatars';
import Bill from '../assets/images/language.png';
import Cart from '../assets/images/shopping-cart.png';
import User from '../assets/images/man-user.png';
import Family from '../assets/images/multiple-users-silhouette.png';


export default class ProfileScreen extends React.Component {
  state = {
    name: 'your name',
    age: 0,
    avatar: undefined,
    gender: 'male',
    introduce: 'No introduce',
  };

  static navigationOptions = {
    title: 'User Profile',
  };

  onNavigate = (screen) => {
    this.props.navigation.navigate(screen);
  };

  _onAuth = ([apiClient, profile]) => {
    this.setState({ ...profile });
  };

  _restoreAuth = async () => {
    const res = await restoreAuth();

    if (res) {
      this._onAuth(res);
    } else {
      this.onNavigate('Login');
    }
  };

  componentWillMount() {
    this._restoreAuth();
  }

  renderGender = (gender) => {
    switch (gender) {
      case 'male':
        return (
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-male' : 'md-male'}
            style={{ color: 'blue' }}
          />
        );
      case 'female':
        return (
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-female' : 'md-female'}
            style={{ color: 'pink' }}
          />
        );
      default:
        return (
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-sad' : 'md-sad'}
          />
        );
    }
  };

  render() {
    const {
      name, gender, age, avatar, introduce,
    } = this.state;

    return (
      <View>
        <NavigationEvents onDidFocus={this._restoreAuth} />
        <TouchableOpacity style={styles.userInfo} onPress={() => this.onNavigate('Login')}>
          <ImageBackground style={styles.userInfoBg} source={Avatars[avatar] || Avatars.DefaultAvatar} resizeMode="cover" />
          <View style={styles.avatarContainer}>
            <Image
              source={Avatars[avatar] || Avatars.DefaultAvatar}
              style={styles.avatar}
            />
          </View>
          <View>
            <View style={styles.basicInfo}>
              <Text style={styles.infoName}>{name.length > 15 ? `${name.substr(0, 12)}...` : name}</Text>
              <Text style={styles.infoTag}>
                {this.renderGender(gender)}
                {' '}
                {age}
              </Text>
            </View>
            <View>
              <Text style={styles.infoIntroduce}>{introduce}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.userButtons}>
          <TouchableOpacity onPress={() => this.onNavigate('Personal')} style={styles.userButtonContainer}>
            <Image
              style={styles.userButton}
              source={User}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onNavigate('Member')} style={styles.userButtonContainer}>
            <Image
              style={styles.userButton}
              source={Family}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Pressed course')} style={styles.userButtonContainer}>
            <Image
              style={styles.userButton}
              source={Bill}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Pressed shop')} style={styles.userButtonContainer}>
            <Image
              style={styles.userButton}
              source={Cart}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    backgroundColor: '#ef233c',
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    overflow: 'hidden',
    padding: 20,
    position: 'relative',
  },
  userInfoBg: {
    height: 120,
    opacity: 0.2,
    position: 'absolute',
    width: '100%',
  },
  avatarContainer: {
    backgroundColor: 'white',
    borderRadius: 32,
    height: 64,
    marginRight: 20,
    width: 64,
  },
  avatar: {
    height: 64,
    width: 64,
  },
  infoName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  basicInfo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  infoTag: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    display: 'flex',
    height: 18,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
  infoIntroduce: {
    color: '#dddddd',
    fontStyle: 'italic',
  },
  userButtons: {
    height: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
  userButtonContainer: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: '#edf2f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userButton: {
    height: '60%',
    width: '60%',
  },
});
