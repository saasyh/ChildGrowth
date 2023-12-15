import {ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import { Woman, Setting2} from 'iconsax-react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import {ProfileData} from '../../../data';
import { fontType, colors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDate} from '../../utils/formatDate';
import ActionSheet from 'react-native-actions-sheet';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  useEffect(() => {
    const user = auth().currentUser;
    const fetchBlogData = () => {
      try {
        if (user) {
          const userId = user.uid;
          const blogCollection = firestore().collection('blog');
          const query = blogCollection.where('authorId', '==', userId);
          const unsubscribeBlog = query.onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBlogData(blogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlog();
          };
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
              fetchBlogData();
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchBlogData();
    fetchProfileData();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  const handleLogout = async () => {
    try {
      closeActionSheet();
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={openActionSheet}>
          <Setting2 color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
          gap: 10,
          paddingVertical: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.profileContainer}>
          <FastImage
            style={profile.pic}
            source={{
              uri: ProfileData.profilePict,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.nameContainer}>
            <View style={{gap: 10, alignItems: 'center', justifyContent: "center", paddingTop: 20,}}>
              <Text style={profile.name}>{ProfileData?.name}</Text>
              <View style={styles.genderContainer}>
                <Woman color={colors.pink()} variant="Linear" size={20} />
                <Text style={profile.info}>
                  {ProfileData.gender}
                </Text>
              </View>
              <TouchableOpacity style={profile.buttonEdit}>
                <Text style={profile.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>   
          </View>      
        </View>
        <View style={{paddingHorizontal: 0, marginTop: 0, marginButtom: 0, gap: 10, width: 400}}>
          <View style={styles.bioHeader}>
            <Text style={styles.textBold}>Biodata</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Nama</Text> 
            <Text style={styles.text2}>{ProfileData.name}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Jenis Kelamin</Text> 
            <Text style={styles.text2}>{ProfileData.gender}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Tempat, Tanggal Lahir</Text>
            <Text style={styles.text2}>{ProfileData.ttl}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Umur</Text>
            <Text style={styles.text2}>{ProfileData.umur}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Berat Badan</Text>
            <Text style={styles.text2}>{ProfileData.bb}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Tinggi Badan</Text>
            <Text style={styles.text2}>{ProfileData.tb}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Lingkar Kepala</Text>
            <Text style={styles.text2}>{ProfileData.lk}</Text>
          </View>
          <View style={styles.bioHeader}>
            <Text style={styles.textBold}>Pengamanan Akun</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>Email</Text>
            <Text style={styles.text2}>{ProfileData.email}</Text>
          </View>
          <View style={styles.bio}>
            <Text style={styles.text1}>No. Telepon</Text>
            <Text style={styles.text2}>{ProfileData.telp}</Text>
          </View>
        </View>
      </ScrollView>
    <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleLogout}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

export default Profile;
const profile = StyleSheet.create({
  pic: {width: 130, height: 130, borderRadius: 100},
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    textTransform:'capitalize'
  },
  info: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  tag: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.5),
  },
  buttonEdit: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.black(0.1),
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'flex-start',
    paddingStart: 5, 
    flexDirection: 'row', 
    flex: 2,
    backgroundColor: colors.white(0.2),
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 2,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius:10,
    backgroundColor: colors.white(0.3),
  },
  bio: {
    flex: 1,
    backgroundColor: colors.pink(0.2),
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginStart: 0,
    color: 'black',
    height: 50,
  },
  bioHeader: {
    flex: 1,
    borderRadius: 300,
    paddingHorizontal: 14,
    paddingVertical: 3,
    marginStart: 0,
    marginEnd: 0,
    color: 'black',
    height: 38,
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
  text1: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    justifyContent:"center",
    paddingLeft: 5,
  },
  text2: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.grey(),
    justifyContent:"center",
    paddingLeft: 5,
  },
  textBold: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraLight'],
    color: colors.black(),
    justifyContent:"center",
    paddingTop: 5,
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    paddingRight: 0,
    gap:5,
  },
  notifContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
});