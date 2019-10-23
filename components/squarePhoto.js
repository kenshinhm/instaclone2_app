import React from "react";
import {TouchableOpacity, Image} from "react-native";
import {withNavigation} from "react-navigation";
import * as PropTypes from "prop-types";
import Constant from "../shared/constants.js";

const SquarePhoto = withNavigation(
    ({navigation, files = [], id}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", {id})}>
            <Image
                source={{uri: files[0].url}}
                style={{width: Constant.width / 3, height: Constant.height / 6}}
            />
        </TouchableOpacity>
    )
);

SquarePhoto.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired
};

export default SquarePhoto;