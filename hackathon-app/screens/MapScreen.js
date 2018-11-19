import React from 'react';
import {
  MapView, Constants, Location, Permissions,
} from 'expo';
import {
  View, Platform, Alert, TouchableOpacity, Image,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';
import { EquipmentsData, HospitalData } from './mockData/index';
import styles from './styles/MapScreen';

import restoreAuth from '../services/Auth';

const { Marker } = MapView;

const HOSPITAL = 'hospital';
const EQUIPMENT = 'equipment';

export default class HomeScreen extends React.Component {
  state = {
    location: undefined,
    markerData: HospitalData.concat(EquipmentsData),
  };

  onNavigate = (screen) => {
    this.props.navigation.navigate(screen);
  };

  loadNotifications = async () => {
    const { data: [notification] } = await this.apiClient.get('/notifications');
    if (notification) {
      Alert.alert(
        'Emergency',
        notification.message,
        [
          { text: 'OK', onPress: () => this.onNavigateToFamilyPage(notification) },
        ],
        { cancelable: false },
      );
    }
  };

  _onAuth = ([apiClient]) => {
    this.apiClient = apiClient;
    this.loadNotifications();
  };

  _restoreAuth = async () => {
    const res = await restoreAuth();
    if (res) {
      this._onAuth(res);
    }
  };

  componentWillMount() {
    this._restoreAuth();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location: { ...location.coords, latitudeDelta: 0.1, longitudeDelta: 0.1 } });
  };

  getMarkers = () => {
    const { markerData } = this.state;

    return markerData.map(({
      id, title, description, coordinate,
    }) => (
      <Marker
        key={id}
        title={title}
        description={description}
        coordinate={coordinate}
      />
    ));
  };

  onClickBtns = (type) => {
    let markerData = HospitalData;
    if (type === EQUIPMENT) {
      markerData = EquipmentsData;
    }
    this.setState({ markerData });
  };

  onNavigateToFamilyPage = (notification) => {
    // mark as read
    this.apiClient.patch(`/notifications/${notification.id}`).then(() => {
      // notification.source tell u the member
      this.onNavigate('Member');
    });
  };

  render() {
    const { location } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this._restoreAuth} />
        <MapView style={styles.map} region={location} showsUserLocation>
          {this.getMarkers()}
        </MapView>
        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.mapIconContainer} onPress={() => this.onClickBtns(HOSPITAL)}>
            <Image style={styles.mapIcon} source={require('../assets/images/hospital.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapIconContainer} onPress={() => this.onClickBtns(EQUIPMENT)}>
            <Image style={styles.mapIcon} source={require('../assets/images/equipment.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapIconContainer} onPress={this.loadNotifications}>
            <Image style={styles.mapIcon} source={require('../assets/images/alert.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
