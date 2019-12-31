/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import App from './src/app/index.js';

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
