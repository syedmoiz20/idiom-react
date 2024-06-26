import GeneratedStoriesList from "../../../components/GeneratedStoriesList";
import StoriesList from "../../../components/StoriesList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Generated" component={GeneratedStoriesList} />
      <Tab.Screen name="Imported" component={StoriesList} />
    </Tab.Navigator>
  );
}
