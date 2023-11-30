import React, {useState, useRef} from 'react';
import {TouchableWithoutFeedback, ScrollView, StyleSheet,  TouchableOpacity, Text, FlatList, View, TextInput, Animated} from 'react-native';
import {Notification, Message, SearchNormal1} from 'iconsax-react-native';
import {BlogList, CategoryList} from '../../../data';
import { fontType, colors } from '../../theme';
import { ListHorizontal, ItemSmall} from '../../components';
import { useNavigation } from "@react-navigation/native";

const scrollY = useRef(new Animated.Value(0)).current;
const diffClampY = Animated.diffClamp(scrollY, 0, 142);
const recentY = diffClampY.interpolate({
    inputRange: [0, 142],
    outputRange: [0, -142],
    extrapolate: 'clamp',
  });

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CHILDGROWTH</Text>
        <View style={styles.notifContainer}>
           <TouchableOpacity style={styles.searchButton}>
             <Notification color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
           <TouchableOpacity style={styles.searchButton}>
             <Message color={colors.black()} variant="Linear" size={24} />
           </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchPage")}>
        <View style={styles.searchContainer}>
          <View style={styles.bar}>
              <SearchNormal1 size={18} color={colors.grey(0.5)} variant="Linear" />
              <Text style={styles.placeholder}>Search</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.listCategory, {transform: [{translateY: recentY}]}]}>
        <FlatListCategory/>
      </Animated.View>
      <ListBlog/>
    </View>
  );
}

const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.pink() : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={CategoryList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 1);
  const verticalData = BlogList.slice(1);
  return (
    <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{paddingTop: 60}}>
      <View style={styles.listBlog}>
      <ListHorizontal data={horizontalData} />
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </Animated.ScrollView>
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
    position: 'absolute',
    backgroundColor: colors.white(),
    zIndex: 999,
    top: 100,
    left: 0,
    right: 0,
    elevation: 1000,
    paddingTop: 7,
    paddingBottom: 5,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  bar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    borderRadius: 10,
    flex: 1,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.5),
    lineHeight: 18,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.15),
    marginHorizontal:5
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
})