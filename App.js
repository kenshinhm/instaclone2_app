import React, {useState, useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {AppLoading} from "expo";
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {AsyncStorage, Text, View} from "react-native";
import {InMemoryCache} from "apollo-cache-inmemory";
import {persistCache} from "apollo-cache-persist";
import apolloOptions from "./apollo.js";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo-hooks";

const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);

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
            setLoaded(true);
            setClient(client);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        preLoad();
    }, []);

    return loaded && client ? (
        <ApolloProvider client={client}>
            <View>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        </ApolloProvider>
    ) : (
        <AppLoading/>
    );
};

export default App;