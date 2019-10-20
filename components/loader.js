import React from "react";
import {ActivityIndicator} from "react-native";
import styled from "styled-components";
import Styles from "../shared/styles.js";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Loader = () => (
    <Container>
        <ActivityIndicator color={Styles.blackColor}/>
    </Container>
);

export default Loader;