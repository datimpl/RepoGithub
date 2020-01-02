import React, { Fragment, useState, useMemo, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { CLIENT_ID } from '../constant';
import queryString from 'query-string';
import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { auth, getUser } from '../modules/auth';
import NavigationService from '../utils/NavigationService';

const AuthScreen = ({ auth, getUser, navigation }) => {
  const dispatch = useDispatch();
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
      if (url && url.includes('repogithub://')) {
        const [, queryStringFromUrl] = url.match(/\?(.*)/);
        const { state, code } = queryString.parse(queryStringFromUrl);

        if (stateRandom === state) {
          auth(code, state).then(() => {
            getUser().then(() => {
              NavigationService.navigate('Home');
            });
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth, getUser, stateRandom]
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

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
  hasInitialUser: state.auth.hasInitialUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth,
      getUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
