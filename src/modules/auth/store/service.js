import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../../../constant';
import qs from 'query-string';

export const fetchAccessToken = async ({ code, state }) => {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';

  try {
    const { data } = await axios.post(GITHUB_OAUTH_ENDPOINT, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      state,
    });

    return qs.parse(data);
  } catch (error) {
    return Error(error);
  }
};
