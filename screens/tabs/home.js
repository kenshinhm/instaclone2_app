import React from "react";
import styled from "styled-components";
import Loader from "../../components/loader.js";
import {useQuery} from "react-apollo-hooks";
import {gql} from "apollo-boost";

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
    const {loading, data} = useQuery(FEED_QUERY);
    return (
        <View>
            {loading ? <Loader/> : null}
        </View>
    );
};

export default Home;