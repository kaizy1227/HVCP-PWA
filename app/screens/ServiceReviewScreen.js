import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity,ScrollView  } from "react-native";
import React, { useState, useEffect } from "react";
import { SERVICES } from "../data/dummy-data";
import CustomDropdown from "../components/CustomDropdown"; // chỉnh lại path nếu cần
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const CustomCheckbox = ({ isChecked = false, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
            <Text style={styles.label}>Điểm danh cuối buổi học: </Text>
          <View style={[styles.checkbox, isChecked && styles.checked]}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
  );
};

const ServiceReviewScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;
  const [name, setName] = useState('');
  const [rating, setRating] = useState('1');
  const [ratingservice, setRatingService] = useState('1');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [issueOption, setIssueOption] = useState('option1');
  const [contactOption, setContactOption] = useState('option1');
  const [lastClassOption, setLastClassOption] = useState('option1');
  const [additionalField1, setAdditionalField1] = useState('');
  const [additionalField2, setAdditionalField2] = useState('');
  const [improveSuggestion, setImproveSuggestion] = useState('');
  const [isChecked, setIsChecked] = useState(false);
useFocusEffect(
  useCallback(() => {
    setName('');
    setRating('');
    setRatingService('');
    setSelectedOption('');
    setIssueOption('');
    setContactOption('');
    setLastClassOption('');
    setAdditionalField1('');
    setAdditionalField2('');
    setImproveSuggestion('');
    setIsChecked(false);
  }, [])
);
  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      navigation.setOptions({
        title: service.title.toUpperCase(),
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'rgba(74, 35, 6, 0.67)' },
      });
    }
  }, [mccID, navigation]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://open-sg.larksuite.com/anycross/trigger/callback/MDQ3NTg0YmRiNzNiYmE2NWUyYzU1ODg5MjIyY2RjNTdl', {
        method: 'POST',
        headers: { "Accept-Encoding": "gzip", },
        body: JSON.stringify({
              name, // Tên học viên
              rating: parseInt(rating), // hoặc Number(rating)
              ratingservice: lastClassOption === 'Đúng, đây là buổi học cuối của tôi' ? parseInt(ratingservice) : null, // Đánh giá dịch vụ nếu là buổi học cuối
              selectedOption, // Mức độ hài lòng
              issueOption, // Gặp vấn đề hay không
              contactOption: issueOption === 'Có' ? contactOption : 'Không', // Có yêu cầu liên hệ lại không (nếu có vấn đề)
              lastClassOption, // Có phải buổi học cuối không
              additionalField1: (selectedOption === 'Bình thường' || selectedOption === 'Không hài lòng' || selectedOption === 'Rất không hài lòng') ? additionalField1 : null, // Lý do không hài lòng
              additionalField2: issueOption === 'Có, tôi có vấn đề cần hỗ trợ'  ? additionalField2 : null, //  Mô tả vấn đề bạn gặp phải
              improveSuggestion: lastClassOption === 'Đúng, đây là buổi học cuối của tôi' ? improveSuggestion : null,
              isChecked, // Đã điểm danh cuối buổi hay chưa
              submittedAt: new Date().toISOString(), // Thêm thời gian gửi nếu cần theo dõi
            }),
          });

      if (response.ok) {
        Alert.alert('Thông báo', 'Đánh giá của bạn đã được ghi nhận. Cảm ơn bạn đã đồng hành cùng chúng tôi!');
            setName('');
            setRating('');
            setRatingService('');
            setSelectedOption('');
            setIssueOption('');
            setContactOption('');
            setLastClassOption('');
            setAdditionalField1('');
            setAdditionalField2('');
            setImproveSuggestion('');
            setIsChecked(false);
      } else {
        Alert.alert('Lỗi', 'Chúng tôi xin lỗi vì sự bất tiện này. Hệ thống gặp sự cố khi gửi dữ liệu.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Chúng tôi xin lỗi vì sự bất tiện này. Hệ thống gặp sự cố khi gửi dữ liệu.');
      console.error(error);
    }
  };

  return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.formContainer}>
      <Text style={styles.label}>Tên học viên:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên của bạn"
      />

      <CustomCheckbox isChecked={isChecked} onToggle={() => setIsChecked(!isChecked)} />

      <CustomDropdown
        label="Bạn cảm nhận như thế nào về buổi học hôm nay? Đánh giá từ 1 đến 5:"
        selectedValue={rating}
        onSelect={setRating}
        options={[1, 2, 3, 4, 5].map(v => ({ label: `${v}`, value: `${v}` }))}
      />

      <CustomDropdown
        label="Bạn có hài lòng với dịch vụ của chúng tôi không:"
        selectedValue={selectedOption}
        onSelect={setSelectedOption}
        options={[
          { label: "Rất hài lòng", value: "Rất hài lòng" },
          { label: "Hài lòng", value: "Hài lòng" },
          { label: "Bình thường", value: "Bình thường" },
          { label: "Không hài lòng", value: "Không hài lòng" },
          { label: "Rất không hài lòng", value: "Rất không hài lòng" },
        ]}
      />

      <CustomDropdown
        label="Bạn có gặp vấn đề gì trong quá trình sử dụng dịch vụ không:"
        selectedValue={issueOption}
        onSelect={setIssueOption}
        options={[
          { label: "Không, tôi không gặp vấn đề gì", value: "Không, tôi không gặp vấn đề gì" },
          { label: "Có, tôi có vấn đề cần hỗ trợ", value: "Có, tôi có vấn đề cần hỗ trợ" },
        ]}
      />

      {(selectedOption === 'Bình thường' || selectedOption === 'Không hài lòng' || selectedOption === 'Rất không hài lòng') && (
        <>
          <Text style={styles.label}>Vui lòng cho chúng tôi biết lý do bạn không hài lòng (nếu có):</Text>
          <TextInput
            style={styles.input}
            value={additionalField1}
            onChangeText={setAdditionalField1}
            placeholder="Nhập lý do tại đây"
          />
        </>
      )}

      {issueOption === 'Có, tôi có vấn đề cần hỗ trợ' && (
        <>
          <Text style={styles.label}>Vui lòng mô tả vấn đề bạn gặp phải:</Text>
          <TextInput
            style={styles.input}
            value={additionalField2}
            onChangeText={setAdditionalField2}
            placeholder="Nhập mô tả vấn đề tại đây"
          />

          <CustomDropdown
            label="Bạn có muốn chúng tôi liên hệ lại để giải quyết không:"
            selectedValue={contactOption}
            onSelect={setContactOption}
            options={[
              { label: "Không", value: "Không" },
              { label: "Có", value: "Có" },
            ]}
          />
        </>
      )}

      <CustomDropdown
        label="Đây có phải là buổi học cuối của bạn:"
        selectedValue={lastClassOption}
        onSelect={setLastClassOption}
        options={[
          { label: "Đúng, đây là buổi học cuối của tôi", value: "Đúng, đây là buổi học cuối của tôi" },
          { label: "Không, đây chưa phải là buổi học cuối của tôi", value: "Không, đây chưa phải là buổi học cuối của tôi" },
        ]}
      />

      {lastClassOption === 'Đúng, đây là buổi học cuối của tôi' && (
        <>
          <CustomDropdown
            label="Bạn cảm thấy như thế nào về dịch vụ mà bạn nhận được? Đánh giá từ 1 đến 5:"
            selectedValue={ratingservice}
            onSelect={setRatingService}
            options={[1, 2, 3, 4, 5].map(v => ({ label: `${v}`, value: `${v}` }))}
          />

           <Text style={styles.label}>Bạn có gợi ý nào để cải thiện dịch vụ của chúng tôi không:</Text>
              <TextInput
                style={styles.input}
                value={improveSuggestion}
                onChangeText={setImproveSuggestion}
                placeholder="Nhập góp ý tại đây"
          />
        </>
      )}

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
checkbox: {
  width: 20,
  height: 20,
  borderWidth: 1.5,
  borderColor: '#555',
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},
checked: {
  backgroundColor: '#2196F3',
},
checkmark: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
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
}
});

export default ServiceReviewScreen;
