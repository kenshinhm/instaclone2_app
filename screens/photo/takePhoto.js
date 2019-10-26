import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Camera} from "expo-camera";
import {Ionicons} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import Loader from "../../components/loader.js";
import Constant from "../../shared/constants.js";
import {TouchableOpacity, Platform} from "react-native";

const View = styled.View`
  flex: 1;
`;

const Icon = styled.View``;

const TakePhoto = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

    const askPermission = async () => {
        try {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted") {
                setHasPermission(true);
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    };

    const toggleType = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };

    useEffect(() => {
        askPermission().then(null);
    }, []);

    return (
        <View>
            {loading ? <Loader/>
                : hasPermission ? (
                    <Camera type={cameraType}
                            style={{
                                justifyContent: "flex-end",
                                padding: 15,
                                width: Constant.width,
                                height: Constant.height / 2
                            }}
                    >
                        <TouchableOpacity onPress={toggleType}>
                            <Icon>
                                <Ionicons
                                    name={Platform.OS === "ios" ?
                                        "ios-reverse-camera" : "ios-reverse-camera"
                                    }
                                    size={36}
                                    color='white'
                                />
                            </Icon>
                        </TouchableOpacity>
                    </Camera>
                ) : null}
        </View>
    );
};

export default TakePhoto;