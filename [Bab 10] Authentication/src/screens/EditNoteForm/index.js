import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const EditNoteForm = ({route}) => {
const {blogId} = route.params;
  const [blogData, setBlogData] = useState({
    doctor: "",
    title: "",
    content: "",
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('blog')
      .doc(blogId)
      .onSnapshot(documentSnapshot => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setBlogData({
            doctor: blogData.doctor,
            title: blogData.title,
            content: blogData.content,
          });
          setLoading(false);
        } else {
          console.log(`Note with ID ${blogId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [blogId]);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await firestore().collection('blog').doc(blogId).update({
        doctor: blogData.doctor,
        title: blogData.title,
        content: blogData.content,
      });
      setLoading(false);
      console.log('Note Updated!');
      navigation.navigate('NoteDetail', {blogId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Edit blog</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Nama Dokter"
            value={blogData.doctor}
            onChangeText={text => handleChange('doctor', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>    
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Judul"
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.borderDashed, {minHeight: 250}]}>
          <TextInput
            placeholder="Catatan"
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Ubah</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.pink()} />
        </View>
      )}
    </View>
  );
};

export default EditNoteForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white(),
    },
    header: {
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      elevation: 0,
      paddingTop: 8,
      paddingBottom: 4,
      backgroundColor: colors.pink(0.30),
    },
    title: {
      fontFamily: fontType["Pjs-Bold"],
      fontSize: 16,
      color: colors.black(),
    },
    bottomBar: {
      backgroundColor: colors.white(),
      alignItems: "flex-end",
      paddingHorizontal: 24,
      paddingVertical: 10,
      shadowColor: colors.black(),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.black(0.4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.pink(),
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      fontSize: 14,
      fontFamily: fontType["Pjs-SemiBold"],
      color: colors.white(),
    },
  });
  const textInput = StyleSheet.create({
    borderDashed: {
      borderStyle: "dashed",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      borderColor: colors.grey(0.4),
    },
    title: {
      fontSize: 16,
      fontFamily: fontType["Pjs-SemiBold"],
      color: colors.black(),
      padding: 0,
    },
    content: {
      fontSize: 12,
      fontFamily: fontType["Pjs-Regular"],
      color: colors.black(),
      padding: 0,
    },
  });
  const category = StyleSheet.create({
    title: {
      fontSize: 12,
      fontFamily: fontType["Pjs-Regular"],
      color: colors.grey(0.6),
    },
    container: {
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
    item: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 25,
    },
    name: {
      fontSize: 10,
      fontFamily: fontType["Pjs-Medium"],
    },
  });