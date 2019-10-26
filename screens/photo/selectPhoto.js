import React, {useState, useEffect} from "react";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {Image, ScrollView, TouchableOpacity} from "react-native";
import Loader from "../../components/loader.js";
import Constant from "../../shared/constants.js";

const View = styled.View`
    flex: 1;
`;

const SelectPhoto = () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();

    const changeSelected = photo => {
        setSelected(photo);
    };

    const getPhotos = async () => {
        try {
            const {assets} = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const askPermission = async () => {
        try {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === "granted") {
                setHasPermission(true);
                await getPhotos();
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        }
    };

    useEffect(() => {
        askPermission().then(null);
    }, []);

    return (
        <View>
            {loading ? <Loader/> : (
                <View>
                    {hasPermission ? (
                        <>
                            <Image style={{width: Constant.width, height: Constant.height / 2}}
                                   source={{uri: selected ? selected.uri : null}}
                            />
                            <ScrollView contentContainerStyle={{flexDirection: "row"}}>
                                {allPhotos.map(photo => (
                                    <TouchableOpacity key={photo.id}
                                                      onPress={() => changeSelected(photo)}>
                                        <Image source={{uri: photo.uri}}
                                               style={{
                                                   width: Constant.width / 3,
                                                   height: Constant.height / 6,
                                                   opacity: photo.id === selected.id ? 0.5 : 1
                                               }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    ) : null}
                </View>
            )}
        </View>
    );
};

export default SelectPhoto;