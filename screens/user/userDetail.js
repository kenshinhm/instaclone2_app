import React from "react";
import {useQuery} from "react-apollo-hooks";
import {gql} from "apollo-boost";
import {ScrollView} from "react-native";
import {USER_FRAGMENT} from "../../shared/fragments.js";
import Loader from "../../components/loader.js";
import UserProfile from "../../components/userProfile.js";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

const UserDetail = ({navigation}) => {
    const {loading, data} = useQuery(GET_USER, {
        variables: {username: navigation.getParam("username")}
    });
    return (
        <ScrollView>
            {loading ? (
                <Loader/>
            ) : (
                data && data.seeUser && <UserProfile {...data.seeUser} />
            )}
        </ScrollView>
    );
};

export default UserDetail;