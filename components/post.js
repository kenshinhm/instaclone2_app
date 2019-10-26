import React, {useState} from "react";
import {Image, Platform} from "react-native";
import styled from "styled-components";
import * as  PropTypes from "prop-types";
import {Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import Constant from "../shared/constants.js";
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo-hooks";
import Styles from "../shared/styles.js";
import {withNavigation} from "react-navigation";

export const TOGGLE_LIKE = gql`
    mutation toggelLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View`
    margin-bottom: 40px;
`;

const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-weight: 500;
`;

const Location = styled.Text`
    font-size: 12px;
`;

const IconsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 5px;
`;

const IconContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

const InfoContainer = styled.View`
    padding: 10px;
`;
const Caption = styled.Text`
    margin: 5px 0;
`;
const CommentCount = styled.Text`
    opacity: 0.5;
    font-size: 13px;
`;

const _Post = ({
    id,
    user,
    location,
    files = [],
    likeCount: likeCountProp,
    caption,
    comments = [],
    isLiked: isLikedProp,
    navigation
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: id
        }
    });
    const handleLike = async () => {
        if (isLiked === true) {
            setLikeCount(l => l - 1);
        } else {
            setLikeCount(l => l + 1);
        }
        setIsLiked(p => !p);
        try {
            await toggleLikeMutation();
        } catch (e) {
        }
    };

    return (
        <Container>
            <Header>
                <Touchable onPress={() => navigation.navigate("UserDetail", {username: user.username})}>
                    <Image style={{height: 40, width: 40, borderRadius: 20}}
                           source={{uri: user.avatar}}
                    />
                </Touchable>
                <Touchable onPress={() => navigation.navigate("UserDetail", {username: user.username})}>
                    <HeaderUserContainer>
                        <Bold>{user.username}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                </Touchable>
            </Header>
            <Swiper
                showsPagination={true}
                style={{height: Constant.height / 2.5}}
                paginationStyle={{position: "absolute", bottom: -25}}
                dotStyle={{width: 4, height: 4}}
                activeDotStyle={{width: 4, height: 4}}
                activeDotColor={'black'}
            >
                {files.map(file => (
                    <Image style={{width: Constant.width, height: Constant.height / 2.5}}
                           key={file.id}
                           source={{uri: file.url}}
                    />
                ))}
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons
                                size={24}
                                color={isLiked ? Styles.redColor : Styles.blackColor}
                                name={
                                    Platform.OS === "ios"
                                        ? isLiked
                                        ? "ios-heart"
                                        : "ios-heart-empty"
                                        : isLiked
                                        ? "md-heart"
                                        : "md-heart-empty"
                                }
                            />
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <Ionicons
                                size={24}
                                color={Styles.blackColor}
                                name={Platform.OS === "ios" ? "ios-text" : "md-mail"}
                            />
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                <Touchable>
                    <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
                </Touchable>
                <Caption>
                    <Bold>{user.username}</Bold> {caption}
                </Caption>
                <Touchable>
                    <CommentCount>See all {comments.length} comments</CommentCount>
                </Touchable>
            </InfoContainer>
        </Container>
    );
};

_Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

const Post = withNavigation(_Post);

export default Post;