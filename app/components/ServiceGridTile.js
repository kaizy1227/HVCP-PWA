import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const ServiceGridTile = ({ title, imageUrl, onPress }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#a97c50" }} // ripple màu cà phê
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <View style={styles.container}>
          <Image source={ imageUrl } style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    borderRadius: 15,
    backgroundColor: "#FFF7F0", // nền nhẹ nhàng
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  pressable: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  image: {
    width: wp("35%"),
    height: hp("20%"),
    borderRadius: 20,
    marginTop: 15,
  },
  titleContainer: {
    marginTop: 15,
    backgroundColor: "#A47148", // màu nâu cà phê đậm
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    textTransform: "uppercase",
  },
});
