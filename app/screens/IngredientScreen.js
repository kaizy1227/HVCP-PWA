import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { wp, hp } from '../utils/responsive';
import { SERVICES } from "../data/dummy-data";

const IngredientScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;

  const IngredientImages = [
    { id: '1', imageUrl: 'https://hocviencaphe.vn/wp-content/uploads/2020/12/IMG_20201005_133901-min.jpg' },
  ];

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      const serviceTitle = service.title.toUpperCase();
      navigation.setOptions({
        title: serviceTitle,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'rgba(74, 35, 6, 0.67)',
        },
      });
    }
  }, [mccID, navigation]);

  const renderIngredientItem = ({ item }) => {
    return (
      <View style={styles.gridItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.imageText}>Hình ảnh nguyên liệu</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={IngredientImages}
      keyExtractor={(item) => item.id}
      renderItem={renderIngredientItem}
      numColumns={1}
      contentContainerStyle={styles.container}
    />
  );
};

const { width, height } = Dimensions.get('window'); // Lấy kích thước màn hình

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  gridItem: {
    flex: 1,
    width: wp('100%'), // Chiều rộng 100%
    height: height < 600 ? hp('30') : hp('50'), // Chiều cao thay đổi theo kích thước màn hình
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(74, 35, 6, 0.67)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('100%'), // Điều chỉnh chiều cao
    borderRadius: 8,
    resizeMode: 'cover', // Sử dụng 'cover' để hiển thị đầy đủ
  },
  imageText: {
    padding: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default IngredientScreen;