'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';

var NewsImageSource = require('../icons/news.png');
var defaultThemes = ['民生热点','娱乐热点','财经热点','体育热点','教育热点','社会热点'];

class ThemeList extends React.Component{

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource( {rowHasChanged: (r1, r2) => r1 !== r2} );
    this.state = {
      dataSource: ds,
    };
  }

  componentDidMount() {
    this.getThemes();
  }

  getThemes() {
    // var themes = [];
    fetch('http://www.tngou.net/api/top/classify')
      .then((response) => response.text())
      .then((responseText) => {
        var  jsonObject = eval("(" + responseText + ")");
        var themes = jsonObject.tngou;
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(themes),
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(defaultThemes),
        });
      }).done;
  }

  renderHeader = () => {
    return (
      <View style={{flexDirection: 'column', backgroundColor: 'crimson'}}>
        <View style={{flexDirection: 'column', height: 120}}>
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.outterContainer}>
              <Image source={require('image!default_head')}
                style={{width: 50, height: 50, marginLeft: 30, margin :15, borderRadius: 25, borderWidth: 5}}/>
              <Text style={styles.menuText}>请登录</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.outterContainer}>
            <TouchableOpacity>
              <View style={[styles.innerContainer,{marginRight: 20}]}>
                <Image source={require('image!ic_favorites_white')}
                  style={{width: 30, height: 30}}/>
                <Text style={styles.menuText}>我的收藏</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.innerContainer, {marginLeft: 20}]}>
                <Image source={require('image!ic_praise_white')}
                  style={{width: 20, height: 20, marginTop: 3, marginRight: 5}}/>
                <Text style={styles.menuText}>我赞过的</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.onSelectItem(null)}
          activeOpacity={0.8}>
          <View style={styles.firstPageStyle}>
            <Image source={require('image!home')} style={styles.firstPageImage}/>
            <Text style={styles.firstPageText}>首页</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderRow = (theme: Object, sectionID: number | String, rowID: number | String) => {
    var imageSource = require('image!ic_menu_white');
    return(
      <View>
        <TouchableOpacity
          onPress={() => this.props.onSelectItem(theme)}
          activeOpacity={0.8} >
          <View style={styles.navigationListView}>
            <View style={{height: 50, width: 50, backgroundColor: 'gainsboro', alignItems: 'center', justifyContent: 'center'}}>
              <Image source = {imageSource} style={styles.listImage} />
            </View>
            <View >
              <Text style={styles.listItem}>{theme.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}} {...this.props}>
        <ListView
          renderHeader = {this.renderHeader}
          dataSource = {this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

};

const styles = StyleSheet.create({
  firstPageImage: {
    height: 50,
    width: 50,
    // marginLeft:10,
  },
  firstPageText: {
    fontSize: 20,
    justifyContent: 'center',
    marginLeft: 40,
    color: 'crimson',
  },
  menuText:{
    fontSize: 16,
    color: 'white',
  },
  innerContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  outterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationListView: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'mintcream',
    // paddingLeft: 20,
  },
  firstPageStyle: {
    flexDirection: 'row',
    height:50,
    width:300,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  listItem: {
    fontSize: 18,
    marginLeft: 40,
    fontStyle: 'normal',
  },
  listImage: {
    width: 25,
    height: 25,
    margin: 3,
    // backgroundColor: 'honeydew'
  },
});

module.exports = ThemeList;
