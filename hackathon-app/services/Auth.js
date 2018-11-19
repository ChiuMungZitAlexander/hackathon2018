import { AsyncStorage } from 'react-native';

import ApiClient from './ApiClient';

const AUTH_STORE_KEY = 'auth';


export async function signIn(username, password, rememberMe = true) {
  const auth = { username, password };
  const apiClient = ApiClient({ auth });
  try {
    const { data } = await apiClient.get('/me');
    if (rememberMe) {
      await AsyncStorage.setItem(AUTH_STORE_KEY, JSON.stringify(auth));
    }
    return [apiClient, data];
  } catch (ex) {
    throw ex;
  }
}

export const signOut = () => AsyncStorage.removeItem(AUTH_STORE_KEY);

export default async function () {
  try {
    const value = await AsyncStorage.getItem(AUTH_STORE_KEY);
    if (value !== null) {
      const { username, password } = JSON.parse(value);
      return signIn(username, password, false);
    }
  } catch (ex) {
    throw ex;
  }
}
