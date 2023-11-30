import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../theme';

const ItemHorizontal = ({item}) => {
  return (
    <View style={itemHorizontal.cardItem}>
      <FastImage
        style={itemHorizontal.cardImage}
        source={{
            uri: item.image,
          }}
          resizeMode={FastImage.resizeMode.cover}>
        <View style={itemHorizontal.cardContent}>
          <View style={itemHorizontal.cardInfo}>
            <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
            <Text style={itemHorizontal.cardText}>{item.text}</Text>
          </View>
        </View>
      </FastImage>
    </View>
  );
};

const ListHorizontal = ({data}) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      contentContainerStyle={{paddingHorizontal: 0}}
    />
  );
};

export default ListHorizontal;
const itemHorizontal = StyleSheet.create({
    cardItem: {
      width: 395,
    },
    cardImage: {
       width: '100%',
       height: 200,
       borderRadius: 15,
     },
     cardContent: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingRight: 10,
       paddingLeft: 15,
     },
     cardInfo: {
       justifyContent: 'flex-end',
       height: '100%',
       gap: 10,
       maxWidth: '50%',
       paddingBottom:50,
     },
     cardTitle: {
       fontFamily: fontType['Pjs-ExtraBold'],
       fontSize: 15,
       color: colors.darkModeBlack(),
       fontFamily: fontType['Pjs-ExtraBold'],
       fontWeight: 'bold',
     },
     cardText: {
       fontSize: 15,
       color: colors.darkModeBlack(),
       fontFamily: fontType['Pjs-ExtraBold'],
       fontWeight: 'bold',
     },
     cardIcon: {
       backgroundColor: colors.white(0.33),
       padding: 5,
       borderColor: colors.white(),
       borderWidth: 0.5,
       borderRadius: 5,
     },
     button: {
      backgroundColor: colors.pink(0.33),
      padding: 5,
      borderWidth: 7,
      borderRadius: 5,
    },
  });