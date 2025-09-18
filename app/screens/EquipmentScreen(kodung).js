import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { MACHINES, EQUIPMENTS } from "../data/dummy-data";
//import EquipmentGridTile from "../components/EquipmentGridTile";
import { useEffect } from "react";

const EquipmentScreen = ({ route, navigation }) => {
  const equipID = route.params.machineId;


function renderEquipmentItem(itemData) {
    //function pressHandler(){
    //    navigation.navigate("Máy Pha Chế",{
    //        machineId:itemData.item.id,
    //    });
    //}
    return (
          <EquipmentGridTile
            title={itemData.item.title}
            imageUrl={itemData.item.imageUrl}
            affordability={itemData.item.affordability}
            //onPress={pressHandler}
          />
        );
      }
      useEffect(() => {
          const machine = MACHINES.find((machine) => machine.id === equipID);

          if (machine) {
              const machineTitle = machine.title.toUpperCase(); //In hoa chữ
              const machineColor = machine.color; // Lấy màu sắc
              const customHeaderColor = 'white';
              navigation.setOptions({
                  title: machineTitle,

                  headerTintColor: customHeaderColor, // Màu sắc cho tiêu đề
                  headerStyle: {
                      backgroundColor: 'rgba(74, 35, 6, 0.67)', // Màu nền của thanh điều hướng
                      textTransform: 'uppercase',
                  },
              });
          }
      }, [equipID, navigation]);
      const displayedEquipments = EQUIPMENTS.filter((equipmentItem) => {
        return equipmentItem.machineIds && equipmentItem.machineIds.indexOf(equipID) >= 0;
      });

      return (
        <FlatList
          data={displayedEquipments}
          keyExtractor={(item) => item.id}
          renderItem={renderEquipmentItem}
          numColumns={1}
        />
      );


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    lineHeight: 24, // 1.6 * 16 (giả định font-size là 16)
    color: '#f1f1f1',
    backgroundColor: 'rgba(74, 35, 6, 0.67)',
    textAlign: 'center',
    fontSize: 18,
    opacity: 1,
    padding:10,
    alignSelf: 'center',
    textTransform: 'uppercase',
    transform: [{ translateY: 200 }], // Chỉ hỗ trợ các transform nhất định
  },
});

export default EquipmentScreen;
