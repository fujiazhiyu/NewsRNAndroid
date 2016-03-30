'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

var ImageAPI = 'http://tnfs.tngou.net/img';
var TITLE_REF = 'title';

export default class NewsItem extends React.Component {
  updateReadSate = () => {
    this.refs[TITLE_REF].setNativeProps({style: {color: '#777777'}});
    this.props.onSelect(this.props.wordsListItem);
  };

  render() {
    return (
      <View {...this.props}>
        <TouchableOpacity
          onPress={this.updateReadSate}>
          <View style={styles.row}>
            <Image source={{ uri: ImageAPI + this.props.wordsListItem.img }} style={styles.cellImage} />
            <View>
              <Text
                ref={TITLE_REF}
                style={this.props.wordsListItem.read ? styles.newsKeywordsRead : styles.newsKeywords}>
                {this.props.wordsListItem.keywords}
              </Text>
              <Text
                style={styles.newsShort}
                numberOfLines={2}>
                {this.props.wordsListItem.title}
              </Text>
              <View style={{height:1.5,  backgroundColor:'#222' }}></View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  newsKeywords: {
    margin:10,
    color:'#234',
    fontSize:16,
  },
  newsKeywordsRead: {
    margin:10,
    fontSize: 16,
    color: '#777777',
  },
  newsShort: {
    margin:10,
    color:'#888',
    fontSize:12,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    margin: 12,
    width: 80,
  },
});
