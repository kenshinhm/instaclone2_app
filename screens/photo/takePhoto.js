import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {Ionicons} from "@expo/vector-icons";
import Loader from "../../components/loader.js";
import Constant from "../../shared/constants.js";
import {TouchableOpacity, Platform} from "react-native";
import Styles from "../../shared/styles.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.View``;

const Button = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border: 10px solid ${Styles.lightGreyColor};
`;

const TakePhoto = ({navigation}) => {
    const cameraRef = useRef();
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

    const takePhoto = async () => {
        if (!canTakePhoto) {
            return;
        }
        try {
            setCanTakePhoto(false);
            const {uri} = await cameraRef.current.takePictureAsync({
                quality: 1
            });
            const asset = await MediaLibrary.createAssetAsync(uri);
            setCanTakePhoto(true);
            navigation.navigate("Upload", {photo: asset});
        } catch (e) {
            console.log(e);
            setCanTakePhoto(true);
        }
    };

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
                    <>
                        <Camera ref={cameraRef}
                                type={cameraType}
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
                        <View>
                            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
                                <Button/>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : null}
        </View>
    );
};

export default TakePhoto;