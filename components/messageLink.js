import React from "react";
import styled from "styled-components";
import {withNavigation} from "react-navigation";

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

const MessageLink = withNavigation(({navigation}) => (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
        <Text>Messages</Text>
    </Container>
));

export default MessageLink;