import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Receipt21, Clock, Message} from 'iconsax-react-native';
import React from 'react';
import { fontType, colors } from '../theme';
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

const ItemSmall = ({item, variant, onPress}) => {
  return (
  <TouchableOpacity style={styles.listCard} onPress={() => navigation.navigate('BlogDetail', {blogId: item.id})}>
      <View style={styles.cardItem}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri: item.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              gap:30
            }}>
            <View style={{gap: 5, flex:1}}>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
              <Receipt21
                color={colors.brown()}
                variant={variant}
                //variant="Linear"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardInfo}>
            <Clock size={10} variant="Linear" color={colors.brown()} />
            <Text style={styles.cardText}>{item.createdAt}</Text>
            <Message
              size={10}
              variant="Linear"
              color={colors.brown()}
            />
            <Text style={styles.cardText}>{item.totalComments}</Text>
          </View>
        </View>
      </View> 
    </TouchableOpacity>
  );
};

export default ItemSmall;
const styles = StyleSheet.create({
    listCard: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 15,
      },
      cardItem: {
        backgroundColor: colors.pink(0.30),
        flexDirection: 'row',
        borderRadius: 10,
      },
      cardCategory: {
        color: colors.brown(),
        fontSize: 10,
        fontFamily: fontType['Pjs-SemiBold'],
      },
      cardTitle: {
        fontSize: 13,
        fontFamily: fontType['Pjs-Bold'],
        color: colors.black(),
      },
      cardText: {
        fontSize: 10,
        fontFamily: fontType['Pjs-Medium'],
        color: colors.brown(),
      },
      cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
      },
      cardInfo: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
      },
      cardContent: {
        gap: 10,
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 15,
        flex: 1,
        paddingVertical: 10,
      },
  });