import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Message,  Location, Clock, Calendar} from 'iconsax-react-native';
import React from 'react';
import { fontType, colors } from '../theme';

const Note = ({item, variant, onPress}) => {
  return (
    <View style={styles.listCard}>
      <View style={styles.cardItem}>
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              gap:30
            }}>
            <View style={{gap: 8, flex:1}}>
              <View style={styles.cardInfo}>
                <Location size={10} variant="Linear" color={colors.brown()} />
                <Text style={styles.cardCategory}>{item.location}</Text>
                <Calendar
                size={10}
                variant="Linear"
                color={colors.brown()}
                />
                <Text style={styles.cardText}>{item.date}</Text>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={styles.cardText}>{item.time}</Text>
              </View>
              <Text style={styles.cardCategory}>{item.doctor}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTitle}>{item.note}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Note;
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