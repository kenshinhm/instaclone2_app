import React from "react";
import {gql} from "apollo-boost";
import {USER_FRAGMENT} from "../../shared/fragments.js";
import {useQuery} from "react-apollo-hooks";
import {ScrollView} from "react-native";
import Loader from "../../components/loader.js";
import UserProfile from "../../components/userProfile.js";


export const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

const Profile = ({navigation}) => {
    const {loading, data} = useQuery(ME);
    return (
        <ScrollView>
            {loading ?
                <Loader/>
                :
                data && data.me && <UserProfile {...data.me}/>
            }
        </ScrollView>
    );
};

export default Profile;