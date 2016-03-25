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
      <View style={{flexDirection: 'column'}}>
        <Image style={{height: 150, width:300}} source={NewsImageSource}/>
        <TouchableOpacity
          onPress={() => this.props.onSelectItem(null)}>
          <View style={styles.firstPageStyle}>
            <Image source={require('../icons/home.png')} style={{height: 50, width: 50, marginLeft:10}}/>
            <Text style={{fontSize: 25,justifyContent: 'center', marginLeft: 20}}>首页</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderRow = (theme: Object, sectionID: number | String, rowID: number | String) => {
    var imageSource = require('../icons/ic_menu_white.png');
    return(
      <View>
      <TouchableOpacity
        onPress={() => this.props.onSelectItem(theme)}
        activeOpacity={0.5} >
        <View
          style={styles.navigationListView}>
          <Image source = {imageSource} style={styles.listImage} />
          <Text style={styles.listItem}>{theme.name}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  };

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}} {...this.props}>
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
  background_icon: {
    width: 300,
    height: 200,
    // opacity: 0.5,
  },
  navigationListView: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  firstPageStyle: {
    flexDirection: 'row',
    height:50,
    width:300,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  listItem: {
    fontSize: 20,
    marginLeft: 20,
    fontStyle: 'normal',
  },
  listImage: {
    width: 20,
    height: 20,
    margin: 3,
    backgroundColor: '#aaaaaa'
  },
});

module.exports = ThemeList;
