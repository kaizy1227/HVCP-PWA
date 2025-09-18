import { image } from "react-native";
class Machine {
  constructor(id, serviceIds, title, imageUrl, affordability) {
    this.id = id;
    this.serviceIds = serviceIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.affordability = affordability;
  }
}

export default Machine;
