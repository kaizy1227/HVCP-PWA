import { image } from "react-native";
class Course {
  constructor(
    id,
    serviceIds,
    title,
    affordability, //giá tiền
    complexity, //độ kh
    imageUrl,
    duration, //thời gian
    ingredients, //thành phần
    steps, //các bước
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.serviceIds = serviceIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Course;
