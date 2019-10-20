import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import SelectPhoto from "../screens/photo/selectPhoto.js";
import TakePhoto from "../screens/photo/takePhoto.js";
import UploadPhoto from "../screens/photo/uploadPhoto.js";
import {stackStyles} from "./config.js";

const PhotoTabs = createMaterialTopTabNavigator(
    {
        SelectPhoto,
        TakePhoto
    },
    {
        tabBarPosition: "bottom"
    }
);

const PhotoNavigation = createStackNavigator(
    {
        PhotoTabs,
        UploadPhoto
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                ...stackStyles
            }
        }
    }
);

export default PhotoNavigation;