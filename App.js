import React, {useState, useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {AsyncStorage, Text, TouchableOpacity, View} from "react-native";
import {InMemoryCache} from "apollo-cache-inmemory";
import {persistCache} from "apollo-cache-persist";
import apolloOptions from "./apollo.js";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo-hooks";
import {ThemeProvider} from "styled-components";
import styles from "./styles";

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async () => {
        try {
            await Font.loadAsync({...Ionicons.font});
            await Asset.loadAsync([require("./assets/logo.png")]);
            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: AsyncStorage
            });
            const client = new ApolloClient({
                cache,
                ...apolloOptions
            });
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            if (isLoggedIn === null || isLoggedIn === "false") {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
            setLoaded(true);
            setClient(client);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        preLoad();
    }, []);

    const logUserIn = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } catch (e) {
            console.log(e);
        }
    };

    const logUserOut = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "false");
            setIsLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    };

    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={styles}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    {isLoggedIn === true ? (
                        <TouchableOpacity onPress={logUserOut}>
                            <Text>Log Out</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={logUserIn}>
                            <Text>Log In</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ThemeProvider>
        </ApolloProvider>
    ) : (
        <AppLoading/>
    );
};

export default App;