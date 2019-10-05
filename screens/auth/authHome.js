import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/authButton.js";
import Constant from "../../shared/constants.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Image = styled.Image`
    width: ${Constant.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`;


const AuthHome = ({navigation}) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")}/>
        <AuthButton text={"Create New Account"}
                    onPress={() => navigation.navigate("SignUp")}/>
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);

export default AuthHome;
