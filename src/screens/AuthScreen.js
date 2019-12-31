import React, { Fragment, useState, useMemo, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { CLIENT_ID } from '../constant';
import queryString from 'query-string';

const AuthScreen = () => {
  const [stateRandom, setStateRandom] = useState(Math.random().toString());
  const [urlNav, setUrlNav] = useState('');
  const loginUrl = useMemo(
    () =>
      `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=repogithub://welcome&scope=user%20repo&state=${stateRandom}`,
    [stateRandom]
  );

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, [handleOpenURL]);

  const handleOpenURL = useCallback(
    async ({ url }) => {
      if (url && url.substring(0, 11) === 'repogithub://') {
        const [, queryStringFromUrl] = url.match(/\?(.*)/);
        const { state, code } = queryString.parse(queryStringFromUrl);
        //   const { auth, getUser, navigation, locale } = this.props;

        console.log('url', url);

        if (stateRandom === state) {
          //   this.setState({
          //     code,
          //     showLoader: true,
          //     loaderText: t('Preparing GitPoint...', locale),
          //   });

          setStateRandom(Math.random().toString());
        }
      }
    },
    [stateRandom]
  );

  return (
    <Fragment>
      <WebView
        source={{ uri: loginUrl }}
        onNavigationStateChange={handleOpenURL}
        renderLoading={() => (
          <View style={styles.loadingWeb}>
            <ActivityIndicator color="#8FC31F" />
          </View>
        )}
        startInLoadingState
        javaScriptEnabled
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loadingWeb: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFill,
  },
});

export default AuthScreen;
