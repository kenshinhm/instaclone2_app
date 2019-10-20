import React from "react";
import {Ionicons} from "@expo/vector-icons";
import * as PropTypes from "prop-types";
import Styles from "../shared/styles.js";

const NavIcon = ({
    focused = true,
    name,
    color = Styles.blackColor,
    size = 30
}) => (
    <Ionicons
        name={name}
        color={focused ? color : Styles.darkGreyColor}
        size={size}/>
);

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool,
};

export default NavIcon;