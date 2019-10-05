import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Constant from "../shared/constants.js";
import {ActivityIndicator} from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0 50px;
  border-radius: 4px;
  width: ${Constant.width / 2};
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({text, onPress, loading = false}) => (
    <Touchable disable={loading} onPress={onPress}>
        <Container>
            {loading ?
                <ActivityIndicator color='white'/>
                :
                <Text>{text}</Text>
            }
        </Container>
    </Touchable>
);

AuthButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default AuthButton;