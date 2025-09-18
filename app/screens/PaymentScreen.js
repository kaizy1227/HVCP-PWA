import { View, Text, Button, StyleSheet, Alert,TouchableOpacity , TextInput,Modal,Linking , ScrollView,Imgae } from "react-native";
import React, { useState } from "react";
import { SERVICES } from "../data/dummy-data";
import { useEffect } from "react";
import CustomDropdown from "../components/CustomDropdown"; // Đảm bảo đường dẫn đúng
//import QRCode from 'react-native-qrcode-svg'; // Thêm thư viện QR Code


const PaymentScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;
  const [customerName, setCustomerName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('cọc'); // Mặc định là "cọc"
  const [qrCodeValue, setQrCodeValue] = useState(null); // Giá trị QR Code
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
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

  const handleSubmit = async () => {
    if (!customerName || !paymentAmount) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const accountNumber = "13474611"; // Thay thế bằng số tài khoản thực
    const bankName = "ACB"; // Thay thế bằng tên ngân hàng thực
    const amount = paymentAmount; // Số tiền thanh toán
    const description = `Thanh toán từ ${encodeURIComponent(customerName)}`; // Nội dung chuyển khoản

     // Tạo URL mã QR
        const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankName}&amount=${amount}&des=${description}`;
        console.log("Generated QR URL:", qrUrl); // In ra để kiểm tra

// Mở liên kết
    Linking.openURL(qrUrl).catch((err) => {
      Alert.alert('Lỗi', 'Không thể mở liên kết.');
      console.error(err);
    });


    try {
      const response = await fetch('https://your-api-endpoint.com/payment', { // Thay đổi endpoint
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          amount: parseFloat(paymentAmount), // Chuyển đổi số tiền thành số thực
          paymentType, // Thêm loại thanh toán
        }),
      });

      if (response.ok) {
        Alert.alert('Thông báo', 'Thanh toán của bạn đã được ghi nhận!');
        // Hiển thị modal với mã QR
                setModalVisible(true);
        //setCustomerName('');
        //setPaymentAmount('');
        //setPaymentType('cọc'); // Reset loại thanh toán
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi thông tin thanh toán!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Tên khách hàng:</Text>
        <TextInput
          style={styles.input}
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Nhập tên khách hàng"
        />

        <Text style={styles.label}>Số tiền thanh toán:</Text>
        <TextInput
          style={styles.input}
          value={paymentAmount}
          onChangeText={setPaymentAmount}
          placeholder="Nhập số tiền"
          keyboardType="numeric" // Chỉ cho phép nhập số
        />
         <CustomDropdown
                   label="Loại thanh toán:"
                   selectedValue={paymentType}
                   onSelect={setPaymentType}
                   options={[
                     { label: "Cọc", value: "cọc" },
                     { label: "Thanh toán đủ", value: "thanh toán đủ" },
                   ]}
                 />

        <Button title="Gửi" onPress={handleSubmit} />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    paddingBottom: 100,
  },

});

export default PaymentScreen;