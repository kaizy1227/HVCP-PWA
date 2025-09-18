import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SERVICES,FULLSERVICES,CATFULLSERVICES } from '../data/dummy-data';
import { wp, hp } from '../utils/responsive';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FullServiceScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      navigation.setOptions({
        title: service.title.toUpperCase(),
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'rgba(74, 35, 6, 0.67)',
        },
      });
    }
  }, [mccID, navigation]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [imageVisible, setImageVisible] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useState(new Animated.Value(-wp('60')))[0];

  const displayedFullServices = FULLSERVICES.filter((fullservice) =>
        fullservice.catfullserviceIds.includes(selectedCategory)
      );

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarVisible ? -wp('60') : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarVisible(!isSidebarVisible);
  };

  const handlePress = (item) => {
    setSelectedImageUrl(item.imageUrl);
    setSelectedTitle(item.title);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
        <Icon name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <FlatList
          data={CATFULLSERVICES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setSelectedCategory(item.id);
              setImageVisible(false);
              toggleSidebar();
            }}>
              <Text style={styles.coursetitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {imageVisible && (
          <Image
            source={require('../images/dichvutronbo.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        )}

        {selectedCategory && (
          <FlatList
            data={displayedFullServices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item)}>
                <Image source={item.imageUrl} style={styles.image} />
                <Text style={{ padding: 10 }}>{item.title}</Text>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        )}
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image source={selectedImageUrl} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedTitle}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setImageVisible(false);
              }}
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
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 20,
    backgroundColor: '#4A2306',
    padding: 10,
    borderRadius: 5,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: wp('60'),
    backgroundColor: '#f0f0f0',
    zIndex: 10,
    paddingTop: 50,
  },
  mainContent: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
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
    margin: 5,
  },
  headerImage: {
    width: '100%',
    height: hp('30'),
    marginBottom: 20,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp('30'),
    height: hp('30'),
    borderRadius: 8,
  },
  modalContent: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 35, 6, 0.67)',
    padding: 20,
  },
  modalImage: {
    width: wp('80%'),
    height: hp('80%'),
    marginBottom: 20,
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

export default FullServiceScreen;