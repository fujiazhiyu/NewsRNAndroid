'use strict'

import React, {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';


export default class DetailsToolBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      detail: null,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }

  componentDidMount() {
    this._getNewsExtra();
  }

  _getNewsExtra=() => {
    console.warn('props'+this.props.details);
    if(this.props.details) {
      this.setState({
        detail: this.props.details,
        isLoading: false,
      })
    }
  };

  _onPressBackButton=() => {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  };

  _onPressShareButton=() => {

  };

  _onPressCollectButton=() => {

  };

  _onPressCommentButton=() => {

  };

  _onPressPraiseButton=() => {

  };

  render() {
    return (
      <View {...this.props}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this._onPressBackButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.backIcon}
                resizeMode='contain'
                source={require('image!ic_back_white')}/>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1, backgroundColor: '#aaaaaa'}} />
          <TouchableOpacity onPress={this._onPressShareButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconOne}
                resizeMode='contain'
                source={require('image!ic_share_white')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressCollectButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconOne}
                resizeMode='contain'
                source={require('image!ic_collect_white')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressCommentButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconTwo}
                resizeMode='contain'
                source={require('image!ic_comment_white')}/>
              <Text style={styles.countText}>

              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onPressPraiseButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconTwo}
                resizeMode='contain'
                source={require('image!ic_praise_white')}/>
              <Text style={styles.countText}>

              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconOne: {
    width: 35,
    height: 35,
  },
  actionIconTwo: {
    width: 35,
    height: 35,
  },
  actionItem: {
    height: 55,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 18,
    color: 'white',
  },
  backIcon: {
    width: 35,
    height: 35,
    margin: 8,
  }
});
