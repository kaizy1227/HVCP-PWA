import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

const screenHeight = Dimensions.get("window").height;

const CustomDropdown = ({ label, options, selectedValue, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => setIsVisible(!isVisible);

  const handleSelect = (value) => {
    onSelect(value);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text style={styles.dropdownText}>
          {options.find((opt) => opt.value === selectedValue)?.label || "Chọn"}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.3}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        style={styles.modal}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem,
                  selectedValue === item.value && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedValue === item.value && styles.selectedOptionText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ maxHeight: screenHeight * 0.4 }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  dropdownButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dropdownContainer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 15,
    paddingBottom: 30,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOption: {
    backgroundColor: "#e6f0ff",
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#1a73e8",
  },
});

export default CustomDropdown;
