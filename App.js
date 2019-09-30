import React, {useState, useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Text, View} from "react-native";

const App = () => {
    const [loaded, setLoaded] = useState(false);

    const preLoad = async () => {
        try {
            await Font.loadAsync({...Ionicons.font});
            await Asset.loadAsync([require("./assets/logo.png")]);
            setLoaded(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        preLoad();
    }, []);

    return loaded ?
        (
            <View>
                <Text>App.js to start working on your app!</Text>
            </View>
        )
        :
        (
            <AppLoading/>
        );
};

export default App;