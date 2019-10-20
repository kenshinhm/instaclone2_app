import React, {useState} from "react";
import {ScrollView, RefreshControl} from "react-native";
import styled from "styled-components";
import Loader from "../../components/loader.js";
import {useQuery} from "react-apollo-hooks";
import {gql} from "apollo-boost";
import Post from "../../components/post.js";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {loading, data, refetch} = useQuery(FEED_QUERY);

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
            }
        >
            {loading ?
                <Loader/>
                :
                (data &&
                 data.seeFeed &&
                 data.seeFeed.map(post => <Post key={post.id} {...post}/>)
                )}
        </ScrollView>
    );
};

export default Home;