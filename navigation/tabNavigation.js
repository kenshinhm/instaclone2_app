import React from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "react-navigation";
import Home from "../screens/tabs/home.js";
import Search from "../screens/tabs/search.js";
import Notifications from "../screens/tabs/notifications.js";
import Profile from "../screens/tabs/profile.js";
import {createStackNavigator} from "react-navigation";
import MessageLink from "../components/messageLink.js";
import NavIcon from "../components/navIcon.js";
import {Platform} from "react-native";

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: {
                ...customConfig,
                headerStyle: {backgroundColor: "#EFEEEF"}
            }
        },
    }, {
        headerLayoutPreset: "center"
    });

const TabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: stackFactory(Home, {
                title: "Home",
                headerRight: <MessageLink/>,
                headerTitle: <NavIcon name="logo-instagram" size={36}/>
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-home" : "md-home"}/>
                ),
            }
        },
        Search: {
            screen: stackFactory(Search, {
                title: "Search"
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-search" : "md-search"}/>
                ),
            }
        },
        Add: {
            screen: View,
            navigationOptions: {
                tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation"),
                tabBarIcon: ({focused}) => (
                    <NavIcon
                        focused={focused}
                        size={26}
                        name={Platform.OS === "ios" ? "ios-add" : "md-add"}/>
                ),
            }
        },
        Notifications: {
            screen: stackFactory(Notifications, {
                title: "Notifications"
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={
                            Platform.OS === "ios"
                                ? focused
                                ? "ios-heart" : "ios-heart-empty"
                                : focused
                                ? "md-heart" : "md-heart-empty"
                        }/>
                ),
            }
        },
        Profile: {
            screen: stackFactory(Profile, {
                title: "Profile"
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-person" : "md-person"}/>
                ),
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            tabStyle: {
                backgroundColor: "#EFEEEF"
            }
        }
    }
);


export default TabNavigation;