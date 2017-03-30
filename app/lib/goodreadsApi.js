import OAuthManager from 'react-native-oauth';
import oauthConfig from '../../config/goodreads';

const application = 'goodreads';
const goodreadsManager = new OAuthManager('reactnativeinit');

goodreadsManager.addProvider({
  [application]: {
    auth_version: '1.0',
    request_token_url: 'http://www.goodreads.com/oauth/request_token?mobile=1',
    authorize_url: 'http://www.goodreads.com/oauth/authorize?mobile=1',
    access_token_url: 'http://www.goodreads.com/oauth/access_token?mobile=1',
    callback_url: () => 'goodreads://oauth', // eslint-disable-line camelcase
    api_url: 'http://www.goodreads.com',
  },
});

goodreadsManager.configure({
  [application]: {
    consumer_key: oauthConfig.consumer_key,
    consumer_secret: oauthConfig.consumer_secret,
  },
});

class GoodreadsApi {

  static headers() {
    return {
      'Content-Type': 'application/xhtml+xml',
    };
  }

  static authorize() {
    return goodreadsManager.authorize(application);
  }

  static deauthorize() {
    return goodreadsManager.deauthorize(application);
  }

  static get(route) {
    return goodreadsManager
      .makeRequest(application, route, {
        headers: GoodreadsApi.headers(),
      });
  }
}

export default GoodreadsApi;
