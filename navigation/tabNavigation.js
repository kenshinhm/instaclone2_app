import React from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "react-navigation";
import Home from "../screens/tabs/home.js";
import Notifications from "../screens/tabs/notifications.js";
import Profile from "../screens/tabs/profile.js";
import {createStackNavigator} from "react-navigation";
import MessageLink from "../components/messageLink.js";
import NavIcon from "../components/navIcon.js";
import {Platform} from "react-native";
import {stackStyles} from "./config.js";
import Search from "../screens/tabs/search/searchContainer.js";
import Detail from "../screens/photo/detail.js";
import Styles from "../shared/styles.js";
import UserDetail from "../screens/user/userDetail.js";

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: {
                ...customConfig,
            }
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: "Photo"
            }
        },
        UserDetail: {
            screen: UserDetail,
            navigationOptions: ({navigation}) => ({
                title: navigation.getParam("username")
            })
        }
    }, {
        defaultNavigationOptions: {
            headerBackTitle: null,
            headerTintColor: Styles.blackColor,
            headerStyle: {...stackStyles}
        },
        headerLayoutPreset: "center",
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
                headerBackTitle: null
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
                        size={30}
                        name={Platform.OS === "ios" ?
                            "ios-add-circle-outline"
                            :
                            "md-add-circle-outline"}/>
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
        initialRouteName: "Profile",
        tabBarOptions: {
            showLabel: false,
            style: {
                backgroundColor: "#FAFAFA"
            }
        }
    }
);


export default TabNavigation;