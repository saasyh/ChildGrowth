import React from 'react';
import {ScrollView, StyleSheet,  TouchableOpacity, Text, SearchNormal, View, Image, ImageBackground, TextInput, Button} from 'react-native';
import {Notification, Receipt21, Clock, Message, SearchNormal1, HomeTrendUp, ProfileCircle, People, MenuBoard, CalendarTick, Stickynote} from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

export default function App() {

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
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <View style={styles.searchContainer}>
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <SearchNormal1
                 color={colors.black()}
                 variant="Linear"
                 size={15}
                 style={styles.icon}
              /> 
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input}
            placeholder="Cari"
            variant="Linear"
            placeholderTextColor="grey"
          /> 
        </View>
        <View style={styles.listCategory}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{...category.item, marginLeft: 10}}>
              <Text style={{...category.title, color: colors.pink()}}>
                Popular
              </Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>0-4 Bulan</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>4-8 Bulan</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>8-12 Bulan</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>1-3 Tahun</Text>
            </View>
            <View style={{...category.item, marginRight: 24}}>
              <Text style={category.title}>3-5 Tahun</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      
      <ListBlog />
      <View style={styles.footer}>
          <TouchableOpacity style={styles.searchButton}>
            <HomeTrendUp color={colors.black()} variant="Linear" size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <CalendarTick color={colors.black()} variant="Linear" size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Stickynote color={colors.black()} variant="Linear" size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <People color={colors.black()} variant="Linear" size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <ProfileCircle color={colors.black()} variant="Linear" size={28} />
          </TouchableOpacity>
      </View>
    </View>
  );
}


const ListBlog = () => {
  return (
    <ScrollView>
      <View style={styles.listBlog}><View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2xlk0eoH_MiWbhN5VOSCBSLyOCHFdSIS4A&usqp=CAU',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    BAGAIMANA KONDISI SI KECIL?
                  </Text>
                  <Text style={itemHorizontal.cardText}>
                    KONSULTASIKAN SEKARANG PADA DOKTER!
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        <View style={itemVertical.listCard}>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://yankes.kemkes.go.id/img/bg-img/gambarartikel_1659600431_993087.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Health</Text>
                  <Text style={itemVertical.cardTitle}>
                    Menjaga Kesehatan Anak Dengan Eating Clean
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jan 10, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16734940268318357.webp',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Health</Text>
                  <Text style={itemVertical.cardTitle}>
                    Kenali Penyebab Speech Delay Pada Anak dan Cara Mengatasinya!
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>207</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://www.mooimom.id/media/mamapedia/bpDxMfLq--main-image.JPG',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Food</Text>
                  <Text style={itemVertical.cardTitle}>
                    Resep Mpasi Untuk Anak Tumbuh Gigi
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>1760</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16814387792226037.webp',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Health</Text>
                  <Text style={itemVertical.cardTitle}>Jadwal Imunisasi Dasar Pada Anak</Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>100</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://d24eqpince6acm.cloudfront.net/articles/Mudah%20Dilakukan%20di%20Rumah%2C%205%20Kegiatan%20Motorik%20Halus%20Anak%20Usia%203-4%20Tahun%20yang%20Bisa%20Melatih%20Keterampilan%20dan%20Kreativitas%20-%20image%201.webp',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Lifestyle</Text>
                  <Text style={itemVertical.cardTitle}>
                    Kegiatan Untuk Mengasah Motorik Anak Umur 3-4 Tahun
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://image.popmama.com/content-images/post/20220922/doa-harian-anak-10png-5a81b86082e051abe0171eff35ed195d.png',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Food</Text>
                  <Text style={itemVertical.cardTitle}>
                    Resep Masakan Pencegah Stunting Untuk Si Kecil
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1591186168/attached_image/belajar-merawat-bayi-baru-lahir-bagi-pasangan-muda-0-alodokter.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>Lifestyle</Text>
                  <Text style={itemVertical.cardTitle}>
                    Panduan Cara Merawat Bayi Baru Lahir
                  </Text>
                </View>
                <TouchableOpacity>
                  <Receipt21
                    color={colors.brown()}
                    variant="Linear"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>Jul 25, 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.brown()}
                />
                <Text style={itemVertical.cardText}>89</Text>
              </View>
            </View>
          </View>
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
    // marginRight: 8,
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
    borderRadius: 15,
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

const itemVertical = StyleSheet.create({
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
const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 395,
  },
  cardImage: {
     width: '100%',
     height: 200,
     borderRadius: 0,
   },
   cardContent: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     //padding: 15,
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
   cardText: {https://github.com/saasyh/ChildGrowth.git
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

