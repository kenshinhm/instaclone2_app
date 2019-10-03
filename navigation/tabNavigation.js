import {View} from "react-native";
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import Home from "../screens/home.js";
import Search from "../screens/search.js";
import Notifications from "../screens/notifications.js";
import Profile from "../screens/profile.js";

const TabNavigation = createBottomTabNavigator({
    Home,
    Search,
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: () => {
                console.log("Add");
            }
        }
    },
    Notifications,
    Profile
});

export default createAppContainer(TabNavigation);