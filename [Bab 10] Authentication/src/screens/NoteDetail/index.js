import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {ArrowLeft, Like1, Receipt21, Message, Share, More} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../utils/formatDate';
import { fontType, colors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';


const NoteDetail = ({route}) => {
  const {blogId} = route.params;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('blog')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setSelectedBlog(blogData);
        } else {
          console.log(`Note with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);

  // const getBlogById = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://657188b6d61ba6fcc012d9e8.mockapi.io/childgrowth/note/${blogId}`,
  //     );
  //     setSelectedBlog(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditNote', {blogId})
  }
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('blog')
        .doc(blogId)
        .delete()
        .then(() => {
          console.log('Note deleted!');
        });
      console.log('Note deleted!');
      closeActionSheet();
      setSelectedBlog(null);
      setLoading(false)
      navigation.navigate('Note');
    } catch (error) {
      console.error(error);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={colors.black()}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Share color={colors.black()} variant="Linear" size={24} />
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={colors.black()}
              variant="Linear"
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={colors.pink()} />
        </View>
      ) : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 15,
          paddingBottom: 54,
        }}>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <Text style={styles.cardText}>{formatDate(selectedBlog?.createdAt)}</Text>
        </View>        
        <Text style={styles.content}>{selectedBlog?.doctor}</Text>
        <Text style={styles.cardTitle}>{selectedBlog?.title}</Text>
        <Text style={styles.content}>{selectedBlog?.content}</Text>
      </ScrollView>
      )}
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
       onPress={navigateEdit}
       >
       <Text
         style={{
           fontFamily: fontType['Pjs-Medium'],
           color: colors.black(),
           fontSize: 18,
         }}>
         Edit
       </Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={{
         justifyContent: 'center',
         alignItems: 'center',
         paddingVertical: 15,
       }}
       onPress={handleDelete}>
       <Text
         style={{
           fontFamily: fontType['Pjs-Medium'],
           color: colors.black(),
           fontSize: 18,
         }}>
         Delete
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
export default NoteDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink(0.10),
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
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: colors.white(),
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 15,
    marginTop: 15,
  },
  info: {
    color: colors.brown(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  cardCategory: {
    color: colors.brown(),
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 25,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.brown(),
  },
  content: {
    color: colors.black(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
    lineHeight: 20,
    marginTop: 15,
  },
});