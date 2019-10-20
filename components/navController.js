import React from "react";
import {useIsLoggedIn} from "../context/authContext.js";
import AuthNavigation from "../navigation/authNavigation.js";
import MainNavigation from "../navigation/mainNavigation.js";

const NavController = () => {
    const isLoggedIn = useIsLoggedIn();
    return isLoggedIn ? <MainNavigation/> : <AuthNavigation/>;
};

export default NavController;