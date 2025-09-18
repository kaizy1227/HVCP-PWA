import { View, Text, FlatList,Dimensions,Image  } from "react-native";
import React from "react";
import { SERVICES } from "../data/dummy-data";
import { ServiceGridTile } from "../components/ServiceGridTile";

function ServicesScreen({ navigation }) {
  function renderServiceItem(itemData) {
    function pressHandler() {
    serviceId = itemData.item.id;
    if (serviceId === 's1') {
            navigation.navigate("Khóa Học Pha Chế", {
            serviceId:  itemData.item.id,
    });
    } else if (serviceId === 's3') {
            navigation.navigate("Máy Pha Chế", {
            serviceId:  itemData.item.id,
    });
    } else if (serviceId === 's2') {
                navigation.navigate("Danh Mục Đồ Uống", {
                serviceId:  itemData.item.id,
        });

    } else if (serviceId === 's4') {
                     navigation.navigate("Nguyên Liệu Pha Chế", {
                     serviceId:  itemData.item.id,
             });


    } else if (serviceId === 's5') {
                         navigation.navigate("Trọn Bộ Dịch Vụ", {
                         serviceId:  itemData.item.id,
                 });


    } else if (serviceId === 's7') {
                             navigation.navigate("Marketing", {
                             serviceId:  itemData.item.id,
                     });
    } else if (serviceId === 's9') {
                                 navigation.navigate("Form Đánh Giá Dịch Vụ", {
                                 serviceId:  itemData.item.id,
                         });
    } else if (serviceId === 's10') {
                                     navigation.navigate("Thanh Toán Dịch Vụ", {
                                     serviceId:  itemData.item.id,
                             });
}
}


    return (
      <ServiceGridTile
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={SERVICES}
      keyExtractor={(item) => item.id}
      renderItem={renderServiceItem}
      numColumns={2}
    />
  );


}
export default ServicesScreen;