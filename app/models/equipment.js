import { image } from "react-native";
class Equipment {
  constructor(id, machineIds, title, imageUrl, affordability) {
    this.id = id;
    this.machineIds = machineIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.affordability = affordability;
  }
}

export default Equipment;
