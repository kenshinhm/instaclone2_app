import React from "react";
import styled from "styled-components";
import AuthInput from "../../components/authInput.js";
import AuthButton from "../../components/authButton.js";
import useInput from "../../hook/useInput.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Login = () => {
    const emailInput = useInput("");
    return (
        <View>
            <AuthInput {...emailInput}
                       placeholder="Email"
                       keyboardType="email-address"/>
            <AuthButton onPress={() => null}
                        text="Log In"/>
        </View>
    );
};

export default Login;