import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { COURSES,TOPICS } from "../data/dummy-data";
//import TopicGridTile from "../components/TopicGridTile";
import { useEffect } from "react";

const TopicScreen = ({ route, navigation  }) => {
  const {courseId} = route.params;

  function renderTopicItem(itemData) {
    return (
      <TopicGridTile
        title={itemData.item.title}
        duration={itemData.item.duration}
        imageUrl={itemData.item.imageUrl}
        ingredients={itemData.item.ingredients}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
      />
    );
  }
  useEffect(() => {
      const course = COURSES.find((course) => course.id === courseId);

      if (course) {
          const courseTitle = course.title.toUpperCase(); //In hoa chữ
          const courseColor = course.color; // Lấy màu sắc
          const customHeaderColor = 'white';
          navigation.setOptions({
              title: courseTitle,

              headerTintColor: customHeaderColor, // Màu sắc cho tiêu đề
              headerStyle: {
                  backgroundColor: 'rgba(74, 35, 6, 0.67)', // Màu nền của thanh điều hướng
                  textTransform: 'uppercase',
              },
          });
      }
  }, [courseId, navigation]);
  const displayedTopics = TOPICS.filter((topicItem) => {
    return topicItem.courseIds && topicItem.courseIds.indexOf(courseId) >= 0;
  });

  return (
    <FlatList
      data={displayedTopics}
      keyExtractor={(item) => item.id}
      renderItem={renderTopicItem}
      numColumns={1}
    />
  );
};
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

export default TopicScreen;