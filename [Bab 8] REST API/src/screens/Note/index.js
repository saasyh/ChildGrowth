import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet,  TouchableOpacity, Text, FlatList, View, ActivityIndicator, RefreshControl} from 'react-native';
import {Notification, Message, AddSquare} from 'iconsax-react-native';
import {NoteList} from '../../../data';
import {fontType, colors } from '../../theme';
import {Note} from '../../components';
import { useNavigation, useFocusEffect} from "@react-navigation/native";
import axios from 'axios';

const Noted = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        'https://657188b6d61ba6fcc012d9e8.mockapi.io/childgrowth/note',
      );
      setBlogData(response.data);
      setLoading(false)
    } catch (error) {
        console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog()
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>CHILDGROWTH</Text>
        <View style={styles.notifContainer}>
           <TouchableOpacity>
             <Notification color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
           <TouchableOpacity>
             <Message color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      {/* <ListBlog/> */}
      {loading ? (
            <ActivityIndicator size={'large'} color={colors.blue()} />
          ) : (
            blogData.map((item, index) => <Note item={item} key={index} />)
          )}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("AddNote")}>
        <AddSquare color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
}
export default Noted;

const ListBlog = () => {
  const verticalData = NoteList.slice(0);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <Note item={item} key={index} />
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
    justifyContent: 'space-between',
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
  floatingButton: {
    backgroundColor: colors.pink(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.pink(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});