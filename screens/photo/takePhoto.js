import React from "react";
import {TouchableOpacity} from "react-native";
import styled from "styled-components";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

const TakePhoto = ({navigation}) => (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
            <Text>Take</Text>
        </TouchableOpacity>
    </View>
);

export default TakePhoto;