import React, {useState} from "react";
import styled from "styled-components";
import useInput from "../../hook/useInput.js";
import {useLogIn} from "../../context/authContext.js";
import {useMutation} from "react-apollo-hooks";
import {CONFIRM_SECRET} from "./authQuery.js";
import {Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import AuthInput from "../../components/authInput.js";
import AuthButton from "../../components/authButton.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

const Confirm = ({navigation}) => {
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);

    const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: confirmInput.value,
            email: navigation.getParam("email")
        }
    });

    const handleConfirm = async () => {
        const {value} = confirmInput;
        if (value === "" || !value.includes(" ")) {
            return Alert.alert("Invalid secret");
        }
        try {
            setLoading(true);
            const {data: {confirmSecret}} = await confirmSecretMutation();
            if (confirmSecret !== "" || confirmSecret !== false) {
                logIn(confirmSecret);
            } else {
                Alert.alert("Wrong secret!");
            }
        } catch (e) {
            Alert.alert("Can't confirm secret");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...confirmInput}
                           placeholder="Secret"
                           returnKeyType="send"
                           onSubmitEditing={handleConfirm}
                           autoCorrect={false}/>
                <AuthButton loading={loading}
                            onPress={handleConfirm}
                            text="Confirm"/>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Confirm;