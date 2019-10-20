import React from "react";
import styled from "styled-components";
import Loader from "../../components/loader.js";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Home = () => (
    <View>
        <Loader/>
    </View>
);

export default Home;