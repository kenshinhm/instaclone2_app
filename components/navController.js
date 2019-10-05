import React from "react";
import {View} from "react-native";
import {useIsLoggedIn} from "../context/authContext.js";
import AuthNavigation from "../navigation/authNavigation.js";
import MainNavigation from "../navigation/mainNavigation.js";

const NavController = () => {
    const isLoggedIn = useIsLoggedIn();
    // const logIn = useLogIn();
    // const logOut = useLogOut();
    return (
        <View style={{flex: 1}}>
            {isLoggedIn ? (<MainNavigation/>) : (<AuthNavigation/>)}
        </View>
    );
};

export default NavController;