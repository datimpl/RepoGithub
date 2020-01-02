import React, { useEffect, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import NavigationService from '../utils/NavigationService';

const CheckFirstUseScreen = ({}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    isAuthenticated ? NavigationService.navigate('Home') : NavigationService.navigate('AuthScreen');
  }, [isAuthenticated]);

  return useMemo(
    () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#8FC31F" size="large" />
      </View>
    ),
    []
  );
};

export default CheckFirstUseScreen;
