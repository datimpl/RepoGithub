import slice from './slice';
import createOperation from '../../../utils/createOperation';
import { fetchAccessToken } from './service';
import { setHeaders } from '../../../store/axios';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../../utils/NavigationService';

const {
  actions: {
    //login
    startAuth,
    successAuth,
    failAuth,
  },
} = slice;

export const auth = createOperation({
  actions: {
    startAction: startAuth,
    successAction: successAuth,
    failAction: failAuth,
  },
  process: async ({ payload, dispatch }) => {
    try {
      const { access_token } = await fetchAccessToken(payload);
      await setHeaders({ Authorization: `token ${access_token}` });
      await AsyncStorage.setItem('access_token', access_token);
      NavigationService.navigate('Home');
      return access_token;
    } catch (error) {
      return Error(error);
    }
  },
});
