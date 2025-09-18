import { View, Text, StyleSheet, FlatList, TouchableOpacity,Modal,ScrollView , Image  } from "react-native";
import React, { useState }  from "react";
import { SERVICES } from "../data/dummy-data";
import { useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MarketingScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;

const categories = [
  { id: '1', title: 'Menu cầm tay' },
  { id: '2', title: 'Tờ rơi' },
  { id: '3', title: 'Thiết kế logo' },
  { id: '4', title: 'Mô hình kem' },
  { id: '5', title: 'Phướn đứng' },
  { id: '6', title: 'Máy pos' },
];

const products = {
    '1': [
      { id: '1a', title: 'Sản phẩm 1a', imageUrl: require("../images/vatlieusetupquan/menu (1).jpg") },
      { id: '1b', title: 'Sản phẩm 1b', imageUrl: require("../images/vatlieusetupquan/menu (2).jpg") },
      { id: '1c', title: 'Sản phẩm 1c', imageUrl: require("../images/vatlieusetupquan/menu (3).jpg") },
      { id: '1d', title: 'Sản phẩm 1d', imageUrl: require("../images/vatlieusetupquan/menu (4).jpg") },
      { id: '1a', title: 'Sản phẩm 1a', imageUrl: require("../images/vatlieusetupquan/menu (5).jpg") },
      { id: '1b', title: 'Sản phẩm 1b', imageUrl: require("../images/vatlieusetupquan/menu (6).jpg") },
      { id: '1c', title: 'Sản phẩm 1c', imageUrl: require("../images/vatlieusetupquan/menu (7).jpg") },
      { id: '1d', title: 'Sản phẩm 1d', imageUrl: require("../images/vatlieusetupquan/menu (8).jpg") },
      { id: '1b', title: 'Sản phẩm 1b', imageUrl: require("../images/vatlieusetupquan/menu (9).jpg") },
      { id: '1c', title: 'Sản phẩm 1c', imageUrl: require("../images/vatlieusetupquan/menu (10).jpg") },
      { id: '1d', title: 'Sản phẩm 1d', imageUrl: require("../images/vatlieusetupquan/menu (11).jpg") },
    ],
    '2': [
      { id: '2a', title: 'Sản phẩm 2a', imageUrl: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/462965199_1001022138706502_4513010186659778649_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7z5umb6e3bUQ7kNvgG1U8-R&_nc_oc=AdkMkKzxvHcHRhflfr--isiWOubfKCjO4zWIC6yapFPsjeVGf00aP-g_IVVJlhrrc-s&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=6y6XJmB0TcYfkMgjU30heA&oh=00_AYGw2LkAOk-AxEb54v7Ioc75-7zRSA9t53jzm-CYMoTRdw&oe=67EFEE90' },
      { id: '2b', title: 'Sản phẩm 2b', imageUrl: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/476837558_1159021729266867_1577023670169095041_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vQ_txiftuugQ7kNvgFgOADx&_nc_oc=Adnp0SjfjDaNGq4LYg_wwQ3f9xuk5WHwoSskAEzgELYfFKiqniUkS7ZSDHMtiv_D1pE&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=w-zvL6fr4nhB3PGM7HuVuQ&oh=00_AYEUM_pbDg4sLsLJ3xSHwdzyrhjPbmsxN1aVPEzUcX0Wfg&oe=67EFF179' },
    ],
    '3': [
      { id: '3a', title: 'Sản phẩm 3a', imageUrl: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/484327409_1117723770369671_980791333287956592_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Clp02Bi-YmMQ7kNvgEiechJ&_nc_oc=AdlrT0wf19SEZoWWo7ZaEe7He5zOtasOYHrH2C1qh18-Pb-GL4IEVg6n_x2Bfd9ov-w&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=ZjnA0hHFLrWG2XpwTQaRDA&oh=00_AYHA_P5cVvhxgodDoqXtArdGhT0G0bjM8FgrCWGZNJSGkw&oe=67EFDEC7' },
      { id: '3b', title: 'Sản phẩm 3b', imageUrl: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/484184983_1117723840369664_1532786553196880461_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=CvH_s3bZ9uMQ7kNvgFbauQT&_nc_oc=Adn_AIfThaPOWhtGzLv1ZtQmnLDM0jgxMOHNkM2GP9tbBhKmkG3f77QBW_6BfX8wWDA&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=BdlcjtcDjHBcdk0H4F3XYw&oh=00_AYFrlWFLVTwQEqtu5Tbjsg9885rRHTpeBjlrtSMCNQX54g&oe=67EFD35D' },
      { id: '3c', title: 'Sản phẩm 3c', imageUrl: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/484226984_1117723987036316_8108888181244957265_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ThU4XcDf4ZAQ7kNvgFI6kBT&_nc_oc=Adk_pQxW1EyjrQX8KfmDA59xm4kJ6xqrQ4cYPABC80aKHOigGAIv5FsXwzgip3laDSM&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=0YoMMPiCX5pwhAAN56iIDQ&oh=00_AYFTwz93MD1Lnd_yozvKQAOFDh17UutcvbBTJ68RcJnNCw&oe=67EFE430' },
      { id: '3d', title: 'Sản phẩm 3d', imageUrl: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/484413114_1117724163702965_7458881851746083154_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FvwwaO4Vby4Q7kNvgEexc_Q&_nc_oc=AdkX9pnaKXNu3DYHyETAlE8KlVYGBO8c_LoAJZu0aXo0jGNq4yYEVM-RmQVegFhIE6g&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=ler7f7u3aCrTp-Ze9JeDCA&oh=00_AYFZB6vKiZyPLoPdHtUOg8ahK3tKvWSBAqZut_HTglgr7w&oe=67EFFDC8' },
    ],

  };

const MarketingImages = [
  { id: '1', imageUrl: 'https://freeimage.host/i/3R6TX8N' },
];

      useEffect(() => {
          const service = SERVICES.find((service) => service.id === mccID);

          if (service) {
              const serviceTitle = service.title.toUpperCase(); //In hoa chữ
              const serviceColor = service.color; // Lấy màu sắc
              const customHeaderColor = 'white';
              navigation.setOptions({
                  title: serviceTitle,

                  headerTintColor: customHeaderColor, // Màu sắc cho tiêu đề
                  headerStyle: {
                      backgroundColor: 'rgba(74, 35, 6, 0.67)', // Màu nền của thanh điều hướng
                      textTransform: 'uppercase',
                  },
              });
          }
      }, [mccID, navigation]);
    const [selectedCategory, setSelectedCategory] = useState(null);
                  const [modalVisible, setModalVisible] = useState(false);
                  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
                  const [selectedTitle, setSelectedTitle] = useState('');

                  const handlePress = (item) => {
                            setSelectedImageUrl(item.imageUrl); // Lưu imageUrl
                            setSelectedTitle(item.title); // Lưu title
                            setModalVisible(true); // Hiển thị modal
                          };
      return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Sidebar Navigation */}
          <View style={{ width: '20%', backgroundColor: '#f0f0f0' }}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedCategory(item.id)}>

                    <Text style={styles.coursetitle}>{item.title}</Text>

                </TouchableOpacity>
              )}
            />
          </View>

          {/* Detail View */}
          <View style={{ width: '80%', padding: 20 }}>
            {selectedCategory && (
              <FlatList
                data={products[selectedCategory]}
                keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                                          <TouchableOpacity
                                              style={styles.gridItem}
                                              onPress={() => handlePress(item)}
                                          >

                                        <Image source={item.imageUrl }  style={styles.image}  />
                                        <Text style={{ padding: 10 }}>{item.title}</Text>
                                      </TouchableOpacity>
                )}
                numColumns={2}
              />
            )}
          </View>
          {/* Modal để hiển thị thông tin */}
                                          <Modal
                                            visible={modalVisible}
                                            animationType="slide"
                                            onRequestClose={() => setModalVisible(false)} // Đóng modal khi nhấn nút quay lại
                                          >
                                            <View style={styles.modalContent}>
                                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                              <Image source={selectedImageUrl} style={styles.modalImage} />
                                              <Text style={styles.modalTitle}>{selectedTitle}</Text>
                                              <TouchableOpacity
                                                onPress={() => {
                                                  setModalVisible(false); // Đóng modal
                                                }}
                                                style={styles.closeButton}>
                                                <Text style={styles.closeButtonText}>Đóng</Text>
                                              </TouchableOpacity>
                                              </ScrollView>
                                            </View>
                                          </Modal>
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Đều khoảng cách giữa các mục
    padding: 10, // Thêm padding để không bị chạm vào viền
  },
  gridItem: {
    flex:1,
    width: '31%', // Đặt chiều rộng để có hai mục trên mỗi dòng
    marginBottom: 20, // Khoảng cách giữa các dòng
    borderRadius: 8,
    backgroundColor: 'white',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa nội dung bên trong
  },
  image: {
      width: wp('30%'),
      height: hp('30%'),
    borderRadius: 8, // Bo góc cho hình ảnh
  },
  title: {
      lineHeight: 28, // 1.6 * 16 (giả định font-size là 16)
      color: '#ffffff',
      backgroundColor: 'rgba(74, 35, 6, 0.67)',
      textAlign: 'center',
      fontSize: 20,
      padding:10,
      textTransform: 'uppercase',

       borderWidth: 2, // Độ dày của viền
       borderColor: '#000080', // Màu sắc của viền
       borderRadius: 5, // Bán kính viền (có thể làm cho viền tròn hơn)
    },
    coursetitle: {
        lineHeight: 28,
        color: '#ffffff',
        backgroundColor: 'rgba(74, 35, 6, 0.67)',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        textTransform: 'uppercase',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 5,
      },
                         modalContent: {
                           flex: 1,
                               width: wp('100%'),
                           justifyContent: 'center',
                           alignItems: 'center',
                           backgroundColor: 'rgba(74, 35, 6, 0.67)',
                           padding: 20, // Thêm padding nếu cần
                         },
                         modalImage: {
                           width: wp('80%'),
                           height: hp('80%'),
                           marginBottom: 20,
                           //padding: 20,
                         },
                         modalTitle: {
                           fontSize: 20,
                           fontWeight: 'bold',
                           color: 'white',
                         },
                         closeButton: {
                           marginTop: 20,
                           padding: 10,
                           backgroundColor: '#007BFF',
                           borderRadius: 5,
                         },
                         closeButtonText: {
                           color: 'white',
                         },
});

export default MarketingScreen;
