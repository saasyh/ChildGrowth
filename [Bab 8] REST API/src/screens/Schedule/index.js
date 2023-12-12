import React, {useState} from 'react';
import {ScrollView, StyleSheet,  TouchableOpacity, Text, FlatList, View} from 'react-native';
import {Notification, Message, CalendarAdd} from 'iconsax-react-native';
import {ScheduleList} from '../../../data';
import { fontType, colors } from '../../theme';
import {Scheduled} from '../../components';

export default function Schedule() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.notifContainer}>
           <TouchableOpacity>
             <Notification color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
           <TouchableOpacity>
             <Message color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
        </View>
      </View>
      <ListBlog/>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduledContainer}>
            <TouchableOpacity>
              <CalendarAdd color={colors.black()} variant="Linear" size={30} />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const ListBlog = () => {
  const verticalData = ScheduleList.slice(0);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <Scheduled item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingRight: 10,
  },
  searchButtonContainer: {
    paddingLeft: 10,
  },
  notifContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  scheduledContainer: {
    gap: 15,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.pink(0.30),
    borderRadius: 30,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  searchButton: {},
  icon: {
    margin: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: 'black',
    height: 45,
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    height:52,
    elevation: 0,
    paddingTop:8,
    paddingBottom:4,
    backgroundColor: colors.pink(0.30),
  },
  footer: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height:50,
    elevation: 0,
    paddingTop:4,
    paddingBottom:8,
    borderRadius: 0,
    backgroundColor: colors.pink(0.30),
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
});