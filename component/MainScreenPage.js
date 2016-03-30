'use strict';

import React, {
  View,
  Text,
  DrawerLayoutAndroid,
  StyleSheet,
  ListView,
  Image,
  ToolbarAndroid,
} from 'react-native';

import NewsListPage from './NewsListPage';
import ThemeList from './ThemeList';

var DRAWER_REF = 'DrawerLayout';
var toolbarActions = [
  {title: '提醒', icon: require('image!ic_message_white'), show: 'always'},
  {title: '夜间模式', show: 'never'},
  {title: '设置选项', show: 'never'},
];

class MainScreenPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      theme: null,
    };
  }

  componentWillMount() {
    // console.warn(this.render);
  }

  onRefresh() {
    this.render;
  }

  onSelectTheme = (theme) => {
    this.refs[DRAWER_REF].closeDrawer();
    this.setState({theme: theme});
  };

  _navigationView = () => {
    return (
      <ThemeList
        onSelectItem={this.onSelectTheme}
      />
    );
  };

  render() {
    var title = this.state.theme ? this.state.theme.name : '首页';

    return (
      <DrawerLayoutAndroid
        ref={DRAWER_REF}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._navigationView}>
        <View style={styles.container}>
          <ToolbarAndroid
            navIcon={require('image!ic_menu_white')}
            title={title}
            titleColor="white"
            style={styles.toolbar}
            actions={toolbarActions}
            onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
            onActionSelected={this.onActionSelected} />
          <NewsListPage theme={this.state.theme} navigator={this.props.navigator}/>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#dc143c',
    height: 56,
  },
});

module.exports = MainScreenPage;
