import React, { Fragment } from 'react';
import AppStack from './AppStack';
import NavigationService from '../utils/NavigationService';

const App = () => {
  return (
    <Fragment>
      <AppStack ref={ref => NavigationService.setTopLevelNavigator(ref)} />
    </Fragment>
  );
};

export default App;
