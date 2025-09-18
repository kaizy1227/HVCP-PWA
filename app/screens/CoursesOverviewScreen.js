import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COURSES, SERVICES, TOPICS } from "../data/dummy-data";
import { wp, hp } from '../utils/responsive';

const CoursesOverviewScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = useWindowDimensions();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedAffordability, setSelectedAffordability] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarAnim = useRef(new Animated.Value(0)).current; // Animation value

  const displayedTopics = TOPICS.filter((topic) =>
    topic.courseIds.includes(selectedCategory)
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
    const toValue = sidebarVisible ? -wp('70') : 0; // slide left when hide
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedImageUrl(item.imageUrl);
    setSelectedTitle(item.title);
    setSelectedAffordability(item.affordability);
    setSelectedDuration(item.duration);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
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
              width: isDesktop ? '25%' : wp('70'),
              left: sidebarAnim,
              position: isDesktop ? 'relative' : 'absolute',
              zIndex: 10,
            },
          ]}
        >
          <FlatList
            data={COURSES}
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
                marginLeft: !isDesktop && sidebarVisible ? wp('70') : 0,
                padding: isDesktop ? 30 : 15,
              }}
            >
        {selectedCategory && (
          <FlatList
            data={displayedTopics}
            keyExtractor={(item) => item.id}
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
                  <Text style={{ fontSize: isDesktop ? 16 : 12, color: "#fff" }}>
                    Giá tiền: {item.affordability}
                  </Text>
                  <Text style={{ fontSize: isDesktop ? 16 : 12, color: "#fff" }}>
                    Thời gian: {item.duration}
                  </Text>
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
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
          >
            <Image
              source={selectedImageUrl}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>{selectedTitle}</Text>
            <Text style={styles.modalText}>💰 Giá tiền: {selectedAffordability}</Text>
            <Text style={styles.modalText}>⏱️ Thời gian: {selectedDuration}</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
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
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    backgroundColor: "#4A2306",
    padding: 10,
    borderRadius: 5,
  },
  sidebarAnimated: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#f0f0f0",
    padding: 10,
    zIndex: 15,
  },
  sidebarDesktop: {
    width: "25%",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  coursetitle: {
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 60,
  },
  topicCard: {
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  itemSub: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(74, 35, 6, 0.95)", // nền nâu đậm sang trọng
    paddingTop: 40,
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    width: wp("90"),
    height: hp("90"),
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
  modalText: {
    fontSize: 18,
    color: "#fff8f0",
    marginBottom: 8,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: "#A47148", // nâu cà phê
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
        height: hp("25"),
        borderRadius: 10,
      },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
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
});

export default CoursesOverviewScreen;
