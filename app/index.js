import { Text, View, Image } from "react-native";
import ServicesScreen from "./screens/ServicesScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesOverviewScreen from "./screens/CoursesOverviewScreen";
import MachineScreen from "./screens/MachineScreen";
import CatDrinkScreen from "./screens/CatDrinkScreen";
import IngredientScreen from "./screens/IngredientScreen";
import FullServiceScreen from "./screens/FullServiceScreen";
import MarketingScreen from "./screens/MarketingScreen";
import ServiceReviewScreen from "./screens/ServiceReviewScreen";
import PaymentScreen from "./screens/PaymentScreen";

const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#f6f6f6" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#f6f6f6" },
          }}
        >
          <Stack.Screen
            options={{
              headerTitle: () => (
                            <View style={{ alignItems: 'center' }}>
                              <Image
                                source={{ uri: 'https://hocviencaphe.vn/wp-content/uploads/2019/07/logo310x95-min.png' }}
                                style={{ width: 300, height: 55 }}
                                resizeMode="contain"
                              />
                            </View>
                          ),
                        }}
            name="Học Viện Cà Phê"
            component={ServicesScreen}
          />
          <Stack.Screen name="Khóa Học Pha Chế" component={CoursesOverviewScreen} />
          <Stack.Screen name="Máy Pha Chế" component={MachineScreen} />
          <Stack.Screen name="Danh Mục Đồ Uống" component={CatDrinkScreen} />
          <Stack.Screen name="Nguyên Liệu Pha Chế" component={IngredientScreen} />
          <Stack.Screen name="Trọn Bộ Dịch Vụ" component={FullServiceScreen} />
          <Stack.Screen name="Marketing" component={MarketingScreen} />
          <Stack.Screen name="Form Đánh Giá Dịch Vụ" component={ServiceReviewScreen} />
          <Stack.Screen name="Thanh Toán Dịch Vụ" component={PaymentScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
