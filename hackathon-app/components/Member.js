import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import restoreAuth from '../services/Auth';
import Avatars from '../constants/Avatars';

export class Member extends React.Component {
  state = {
    healthReport: {},
    healthChecks: [],
  };

  loadHealthChecks = async (healthReport) => {
    const { data: healthChecks } = await this.apiClient.get(`/health-reports/${healthReport.id}/health-checks`);
    this.setState({ healthChecks });
  };

  loadHealthReports = async () => {
    const { data: [healthReport] } = await this.apiClient.get(`/members/${this.props.data.id}/health-reports`);
    console.log(healthReport);
    if (healthReport) {
      this.setState({ healthReport });
      this.loadHealthChecks(healthReport);
    }
  };

  _onAuth = ([apiClient]) => {
    this.apiClient = apiClient;
    this.loadHealthReports();
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
    const { data, index } = this.props;
    const { healthReport } = this.state;
    return (
      <View style={index % 2 === 0 ? styles.containerEven : styles.containerOdd}>
        <View style={styles.leftSide}>
          <Image
            style={styles.avatar}
            source={Avatars[data.user.profile.avatar] || Avatars.DefaultAvatar}
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.data}>
            <Text style={styles.textStyle}>{data.user.profile.name}</Text>
            <Text style={styles.textStyle}>
age:
              {data.user.profile.age}
            </Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.textStyle}>{healthReport.state || 'healthy'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    maxWidth: 90,
    height: 90,
  },
  textStyle: {
    fontSize: 20,
  },
  containerEven: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#c5c5c5',
    borderBottomWidth: 2,
    backgroundColor: '#fefefe',
  },
  containerOdd: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#c5c5c5',
    borderBottomWidth: 2,
    backgroundColor: '#8d99ae',
  },
  userInfoBg: {
    height: 120,
    opacity: 0.2,
    position: 'absolute',
    width: '100%',
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  data: {
    marginLeft: 5,
    marginRight: 5,
  },
});
