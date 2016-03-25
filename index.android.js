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

import Log from './Log'
import MainScreenPage from './component/MainScreenPage';
import NewsDetailsPage from './component/NewsDetailsPage';

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

    if(router.name == 'home'){
      return (
        <View style={styles.navigator_style}>
          <MainScreenPage {...router.params} navigator={navigator} />
        </View>
      );
    }else if(router.name == 'news'){
      return (
        <View style={styles.navigator_style}>
          <NewsDetailsPage
            {...router.params}
            navigator={navigator}
            news={router.news} />
        </View>
      );
    }
  }

  render() {
    Log.log('yufujia');
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
