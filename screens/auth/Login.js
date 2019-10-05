import React, {useState} from "react";
import styled from "styled-components";
import AuthInput from "../../components/authInput.js";
import AuthButton from "../../components/authButton.js";
import useInput from "../../hook/useInput.js";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {useMutation} from "react-apollo-hooks";
import {LOG_IN} from "./authQuery.js";
import {Alert} from "react-native";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Login = ({navigation}) => {
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const requestSecretMutation = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const {value} = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === "") {
            return Alert.alert("Email can't be empty");
        } else if (!emailRegex.test(value)) {
            return Alert.alert("Email is invalid");
        }
        try {
            setLoading(true);
            const {data: {requestSecret}} = await requestSecretMutation();
            if (requestSecret) {
                Alert.alert("Check your email");
                navigation.navigate("Confirm", {email: value});
            } else {
                Alert.alert("Email is not found");
                navigation.navigate("SignUp", {email: value});
            }
        } catch (e) {
            Alert.alert(e.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...emailInput}
                           placeholder="Email"
                           keyboardType="email-address"
                           returnKeyType='send'
                           onSubmitEditing={handleLogin}
                           autoCorrect={false}
                />
                <AuthButton loading={loading}
                            onPress={handleLogin}
                            text="Log In"/>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;