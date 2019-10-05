import React from "react";
import styled from "styled-components";
import constants from "../../shared/constants.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const SignUpBtn = styled.View`
    background-color: ${props => props.theme.blueColor};
    padding: 10px;
    border-radius: 4px;
    width: ${constants.width / 2};
    margin: 0 50px 25px;
`;
const SignUpBtnText = styled.Text`
    color: white;
    text-align: center;
    font-weight: 600;
`;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
    font-weight: 600;
`;


const AuthHome = ({navigation}) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")}/>
        <Touchable onPress={() => navigation.navigate("SignUp")}>
            <SignUpBtn>
                <SignUpBtnText>Create New Account</SignUpBtnText>
            </SignUpBtn>
        </Touchable>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);

export default AuthHome;
