import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import SelectPhoto from "../screens/photo/selectPhoto.js";
import TakePhoto from "../screens/photo/takePhoto.js";
import UploadPhoto from "../screens/photo/uploadPhoto.js";
import {stackStyles} from "./config.js";
import Styles from "../shared/styles.js";

const PhotoTabs = createMaterialTopTabNavigator(
    {
        Select: {
            screen: SelectPhoto,
            navigationOptions: {
                tabBarLabel: "Select"
            }
        },
        Take: {
            screen: TakePhoto,
            navigationOptions: {
                tabBarLabel: "Take"
            }
        }
    },
    {
        tabBarPosition: "bottom",
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: "white",
                // marginBottom: 20
            },
            labelStyle: {
                color: "white",
                fontWeight: "600"
            },
            style: {
                // paddingBottom: 20,
                backgroundColor: Styles.darkGreyColor,
            }
        }
    }
);

const PhotoNavigation = createStackNavigator(
    {
        Tabs: {
            screen: PhotoTabs,
            navigationOptions: {
                title: "Choose Photo",
                headerBackTitle: null
            }
        },
        Upload: {
            screen: UploadPhoto,
            navigationOptions: {
                title: "Upload"
            }
        }
    },
    {
        defaultNavigationOptions: {
            headerTintColor: Styles.blackColor,
            headerStyle: {
                ...stackStyles
            }
        }
    }
);

export default PhotoNavigation;