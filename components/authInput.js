import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Constant from "../shared/constants.js";


const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${Constant.width / 2};
    padding: 10px;
    background-color: ${props => props.theme.greyColor};
    border: 1px solid ${props => props.theme.darkGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
                       placeholder,
                       value,
                       keyboardType = "default",
                       autoCapitalize = "none",
                       onChange
                   }) => (
    <Container>
        <TextInput
            onChangeText={onChange}
            keyboardType={keyboardType}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            value={value}
        />
    </Container>
);

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad"
    ]),
    autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
    onChange: PropTypes.func.isRequired
};

export default AuthInput;