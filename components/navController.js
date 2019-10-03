import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {useIsLoggedIn, useLogIn, useLogOut} from "../context/authContext.js";
import AuthNavigation from "../navigation/authNavigation.js";
import TabNavigation from "../navigation/tabNavigation.js";

const NavController = () => {
    const isLoggedIn = true;
    // const isLoggedIn = useIsLoggedIn();
    // const logIn = useLogIn();
    // const logOut = useLogOut();
    return (
        <View style={{flex: 1}}>
            {isLoggedIn ? (<TabNavigation/>) : (<AuthNavigation/>)}
        </View>
    );
};

export default NavController;