import React, {useState} from "react";
import {Image, ActivityIndicator, Alert} from "react-native";
import styled from "styled-components";
import Styles from "../../shared/styles.js";
import Constant from "../../shared/constants.js";
import useInput from "../../hook/useInput.js";
import axios from "axios";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0 solid ${Styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${Constant.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({navigation}) => {
    const [loading, setIsLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const photo = navigation.getParam("photo");
    const captionInput = useInput("");
    const locationInput = useInput("");
    const handleSubmit = async () => {
        if (captionInput.value === "" || locationInput.value === "") {
            Alert.alert("All fields are required");
        }
        const formData = new FormData();
        const name = photo.filename;
        // const [, type] = name.split(".");
        const type = 'image/jpeg';
        formData.append("file", {
            name,
            type: type.toLowerCase(),
            uri: photo.uri
        });
        try {
            const {data: {path}} = await axios.post("http://218.148.38.209:4000/api/upload", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });
            setFileUrl(path);
            Alert.alert("successfully uploaded");
        } catch (e) {
            Alert.alert(e.toString());
        }
    };
    return (
        <View>
            <Container>
                <Image
                    source={{uri: photo.uri}}
                    style={{height: 80, width: 80, marginRight: 30}}
                />
                <Form>
                    <STextInput
                        onChangeText={captionInput.onChange}
                        value={captionInput.value}
                        placeholder="Caption"
                        multiline={true}
                        placeholderTextColor={Styles.darkGreyColor}
                    />
                    <STextInput
                        onChangeText={locationInput.onChange}
                        value={locationInput.value}
                        placeholder="Location"
                        multiline={true}
                        placeholderTextColor={Styles.darkGreyColor}
                    />
                    <Button onPress={handleSubmit}>
                        {loading ? (
                            <ActivityIndicator color="white"/>
                        ) : (
                            <Text>Upload </Text>
                        )}
                    </Button>
                </Form>
            </Container>
        </View>
    );
};