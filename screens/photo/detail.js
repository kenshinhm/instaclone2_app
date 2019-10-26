import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {POST_FRAGMENT} from "../../shared/fragments.js";
import {useQuery} from "react-apollo-hooks";
import Loader from "../../components/loader.js";
import Post from "../../components/post.js";
import {ScrollView} from "react-native";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

const Detail = ({navigation}) => {
    const {loading, data} = useQuery(POST_DETAIL, {
        variables: {id: navigation.getParam("id")}
    });
    return (
        <ScrollView>
            {loading ? (
                <Loader/>
            ) : (
                data && data.seeFullPost && <Post {...data.seeFullPost} />
            )}
        </ScrollView>
    );
};

export default Detail;