import React from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "react-navigation";
import Home from "../screens/tabs/home.js";
import Search from "../screens/tabs/search.js";
import Notifications from "../screens/tabs/notifications.js";
import Profile from "../screens/tabs/profile.js";
import {createStackNavigator} from "react-navigation";
import MessageLink from "../components/messageLink.js";

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: {...customConfig}
        }
    });

const TabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: stackFactory(Home, {
                title: "Home",
                headerRight: <MessageLink/>
            })
        },
        Search: {
            screen: stackFactory(Search, {
                title: "Search"
            })
        },
        Add: {
            screen: View,
            navigationOptions: {
                tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation")
            }
        },
        Notifications: {
            screen: stackFactory(Notifications, {
                title: "Notifications"
            })
        },
        Profile: {
            screen: stackFactory(Profile, {
                title: "Profile"
            })
        }
    }
);


export default TabNavigation;