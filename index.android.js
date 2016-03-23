/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  WebView,
  Navigator,
  BackAndroid,
} from 'react-native';

import MainScreenPage from './component/MainScreenPage';
import MainListScreen from './component/MainListScreen';
import NewsListPage from './component/NewsListPage';

var _navigator;

class NewsRNAndroid extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var navigator = _navigator;
    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
        }
        return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  renderScene(router, navigator) {
    _navigator = navigator;
    var Component = null;

    switch(router.name){
      case 'home':
        Component = MainScreenPage;
        break;
      case 'newsDetails':
        Component = NewsDetailsPage;
      default:
        Component = MainScreenPage;
    }

    return (
      <View style={styles.navigator_style}>
        <Component {...router.params} navigator={navigator} />
      </View>
    );
  }

  render() {
    var initialRoute = {name: 'home'}
    return (
      <Navigator
        style={styles.navigator_style}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.renderScene}
        />
    );
  }
}


const styles = StyleSheet.create({
    navigator_style:{
       flex: 1,
       flexDirection: 'column',
    }
});

AppRegistry.registerComponent('NewsRNAndroid', () => NewsRNAndroid);
