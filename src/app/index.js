import React from 'react';
import AppStack from './AppStack';
import NavigationService from '../utils/NavigationService';
import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <AppStack ref={ref => NavigationService.setTopLevelNavigator(ref)} />
    </Provider>
  );
};

export default App;
