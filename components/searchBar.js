import React from "react";
import {TextInput} from "react-native";
import * as PropTypes from "prop-types";
import Constant from "../shared/constants.js";
import Styles from "../shared/styles.js";

const SearchBar = ({onChange, value, onSubmit}) => (
    <TextInput
        style={{
            width: Constant.width - 40,
            height: 35,
            backgroundColor: Styles.lightGreyColor,
            padding: 10,
            borderRadius: 5,
            textAlign: "center"
        }}
        returnKeyType="search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
        value={value}
        placeholder={"Search"}
        placeholderTextColor={Styles.darkGreyColor}
    />
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;