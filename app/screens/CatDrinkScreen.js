import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { SERVICES, CATDRINKS, DRINKS } from "../data/dummy-data";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CatDrinkScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = useWindowDimensions();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarAnim = useRef(new Animated.Value(0)).current; // Animation value

  const displayedDrinks = DRINKS.filter((drink) =>
        drink.catdrinkIds.includes(selectedCategory)
      );

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        title: service.title.toUpperCase(),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "rgba(74, 35, 6, 0.67)",
        },
      });
    }
  }, [seID, navigation]);

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -wp('70%') : 0; // slide left when hide
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedImageUrl(item.imageUrl);
    setSelectedTitle(item.title);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? 'row' : 'column' }}>
      {/* Toggle Button */}
      {!isDesktop && (
        <TouchableOpacity
          onPress={toggleSidebar}
          style={styles.toggleButton}
        >
          <Text style={{ color: 'white' }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Animated Sidebar */}
      {(!isDesktop || sidebarVisible) && (
        <Animated.View
          style={[
            styles.sidebar,
            {
              width: isDesktop ? '25%' : wp('70%'),
              left: sidebarAnim,
              position: isDesktop ? 'relative' : 'absolute',
              zIndex: 10,
            },
          ]}
        >
          <FlatList
            data={CATDRINKS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item.id);
                  if (!isDesktop) toggleSidebar(); // auto close on mobile
                }}
              >
                <Text style={styles.coursetitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          marginLeft: !isDesktop && sidebarVisible ? wp('70%') : 0,
          padding: isDesktop ? 30 : 15,
        }}
      >
        {selectedCategory && (
          <FlatList
            data={displayedDrinks}
            keyExtractor={(item) => item.id}
            numColumns={isDesktop ? 2 : isTablet ? 3 : 3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handlePress(item)}
              >
                <Image
                  source={item.imageUrl}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{ padding: isDesktop ? 20 : 10 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
              source={selectedImageUrl}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>{selectedTitle}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    backgroundColor: "#4A2306",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    margin: 10,
  },
  sidebar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    height: "100%",
  },
  coursetitle: {
    lineHeight: 28,
    color: "#ffffff",
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    textTransform: "uppercase",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: hp("25%"),
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(74, 35, 6, 0.95)",
    paddingTop: 40,
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    width: wp("90%"),
    height: hp("90%"),
    borderRadius: 12,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: "#A47148",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CatDrinkScreen;
