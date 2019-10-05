import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Constant from "../shared/constants.js";


const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${Constant.width / 2};
    padding: 5px;
    background-color: ${props => props.theme.greyColor};
    border: 0.5px solid ${props => props.theme.darkGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
                       placeholder,
                       value,
                       onChange,
                       keyboardType = "default",
                       autoCapitalize = "none",
                       returnKeyType = "done",
                       onSubmitEditing = () => null,
                       autoCorrect = true
                   }) => (
    <Container>
        <TextInput
            onChangeText={onChange}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={autoCorrect}
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
    onChange: PropTypes.func.isRequired,
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool
};

export default AuthInput;