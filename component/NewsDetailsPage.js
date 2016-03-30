'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Image,
  ToolbarAndroid,
  WebView,
  Dimensions,
} from 'react-native';

import DetailsToolbar from './DetailsToolBar';
var DETAILS_URL = 'http://www.tngou.net/api/top/show';

export default class NewsDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
      detail: null,
    };
  }

  componentDidMount() {
    this._getNewsDetails();
  }

  _getNewsDetails() {
    var requestURL = DETAILS_URL + '?id=' + this.props.news.id;
    this.setState({
      isLoading: true,
      detail: null,
    });
    fetch(requestURL)
      .then((response) => response.text())
      .catch((error) => {
        this.setState({
          isLoading: false,
          detail: null,
        });
      })
      .then((responseData) => {
        var jsonObject = eval('(' + responseData + ')');
        this.setState({
          isLoading: false,
          detail: jsonObject,
        });
      })
      .done();
  }

  render() {
    // console.warn(this.state.detail);
    var toolbar = <DetailsToolbar details={this.state.detail} navigator={this.props.navigator} style={styles.toolbar}/>
    if(this.state.isLoading) {
      return(
        <View style={[styles.container, styles.center]}>
          <Text>
            正在加载...
          </Text>
          {toolbar}
        </View>
      );
    }else{
      if(this.state.detail) {
        var html = '<!DOCTYPE html><html><head><style type="text/css">img {max-width:'
          + Dimensions.get('window').width * 10/11
          + `px} body {font-family: Monospace, serif;letter-spacing: 2px;padding-left: 15px;padding-right: 20px;padding-bottom: 15px;}
          h3 {border-style: outset;font-family: Arial, SunSans-Regular;letter-spacing: 0.1em;padding-left: 10px;padding-right: 15px;}
          p {line-height: 150%;}</style><title>`
          + this.state.detail.title
          + '</title></head><body><h3>'
          + this.state.detail.title + '</h3>'
          + this.state.detail.message
          + '</body></html>';
        return (
          <View style={styles.container}>
            <WebView
              style={styles.webview_style}
              source={{html: html}}
              startInLoadingState={true}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              automaticallyAdjustContentInsets={true}
              />
            {toolbar}
          </View>
        );
      }else{
        return (
          <View style={[styles.container, styles.center]}>
            <Text>
              加载失败
            </Text>
            {toolbar}
          </View>
        );
      }
    }
  }
};

const styles = StyleSheet.create({
  toolbar: {
    height: 55,
    backgroundColor: '#dc143c',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview_style: {
    flex: 1,
    flexDirection: 'column',
    top: 55,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor:'ghostwhite',
  }
});
