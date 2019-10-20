import React, {useState, useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {AsyncStorage} from "react-native";
import {InMemoryCache} from "apollo-cache-inmemory";
import {persistCache} from "apollo-cache-persist";
import apolloOptions from "./shared/apollo.js";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo-hooks";
import {ThemeProvider} from "styled-components";
import Styles from "./shared/styles.js";
import {AuthProvider} from "./context/authContext.js";
import NavController from "./components/navController.js";

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async () => {
        // await AsyncStorage.clear();
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
            if (!isLoggedIn || isLoggedIn === "false") {
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

    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={Styles}>
                <AuthProvider isLoggedIn={isLoggedIn}>
                    <NavController/>
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    ) : (
        <AppLoading/>
    );
};

export default App;