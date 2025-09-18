import { image } from "react-native";
class Drink {
  constructor(
    id,
    catdrinkIds,
    title,
    imageUrl,
  ) {
    this.id = id;
    this.catdrinkIds = catdrinkIds;
    this.title = title;
    this.imageUrl = imageUrl;
  }
}

export default Drink;
