'use strict';

import React, {
  View,
  Text,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
  Navigator,
  ScrollView,
  BackAndroid,
  ViewPagerAndroid,
  Image,
  ListView,
} from 'react-native';

import NewsItem from './NewsItem';
import Log from '../Log';

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var _navigator ;
var PAGES = 5;
var imageUrls = [
  'https://img.alicdn.com/bao/uploaded/i3/TB1vkdZKFXXXXaAXVXXXXXXXXXX_!!0-item_pic.jpg',
  'https://img.alicdn.com/bao/uploaded/i5/TB1CGo3KXXXXXb6XpXXYXGcGpXX_M2.SS2',
  'https://img.alicdn.com/bao/uploaded/i1/TB1jkifKVXXXXXhXXXXXXXXXXXX_!!0-item_pic.jpg',
  'https://img.alicdn.com/bao/uploaded/i2/TB1GCgoKVXXXXcaXpXXXXXXXXXX_!!0-item_pic.jpg',
  'https://img.alicdn.com/bao/uploaded/i1/TB1D6A7KVXXXXaQXVXXXXXXXXXX_!!0-item_pic.jpg',
]
var HotWordsListAPI = 'http://www.tngou.net/api/top/list';
var ImageAPI = 'http://tnfs.tngou.net/img';

export default class NewsListPage extends React.Component{
  constructor(props){
    super(props);
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource: ds,
      isLoading: true,
      page: 1,
      rows: 20,
    };
  }

  componentWillMount() {
    Log.setLogAble(true);
  }

  componentDidMount() {
    this._getData(this.props.theme);
  }

  componentWillReceiveProps(nextProps) {
    this._getData(nextProps.theme);
  }

  _getData(theme){
    var PAGE = this.state.page;
    var ROWS = this.state.rows;
    var promiseObject;
    var wordsLists = [];
    if(theme){
      promiseObject = fetch(HotWordsListAPI+'?id='+theme.id+'&page='+this.state.page+'&rows='+this.state.rows)
    }else{
      promiseObject = fetch(HotWordsListAPI)
    }
    promiseObject.then((response) => response.text())
      .then((responseText) => {
        var jsonObject = eval("(" + responseText + ")");
        wordsLists = jsonObject.tngou;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(wordsLists),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
          isLoading: false,
        })
      }).done;
    //由于Promise是异步的，所以返回的wordsLists不是在Promise中获取的值。
    // return wordsLists;
  }

  renderRow = (wordsListItem : Object, sectionID: number | String, rowID: number | String) => {
    return (
      <NewsItem
        onSelect={this.selectNews}
        wordsListItem={wordsListItem}
        />
    );
  };

  selectNews=(news: Object) => {
    news.read = true;
    this.props.navigator.push({
      title: news.title,
      name: 'news',
      news: news,
    });
  };

  render(){
    var pages = [];
    for (var i = 0; i < PAGES; i++) {
      pages.push(
        <View key={i} style={{ flex: 1, alignItems: 'stretch' }} collapsable={false}>
          <Image
            style={{ flex:1 }}
            source={{uri: imageUrls[i%PAGES] }}
          />
       </View>
      );
    }
    return (
      <ScrollView>
        <View>
          <ViewPagerAndroid
            style={styles.viewPager}
            initialPage={0}
            onPageScroll={this.onPageScroll}
            onPageSelected={this.onPageSelected}
            ref={viewPager => { this.viewPager = viewPager; }}>
            {pages}
          </ViewPagerAndroid>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  viewPager:{
    height : 200,
  },
});
