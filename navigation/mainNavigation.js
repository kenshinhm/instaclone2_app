import {createStackNavigator, createAppContainer} from "react-navigation";
import TabNavigation from "./tabNavigation.js";
import PhotoNavigation from "./photoNavigation.js";
import MessageNavigation from "./messageNavigation.js";

const MainNavigation = createAppContainer(
    createStackNavigator(
        {
            TabNavigation,
            PhotoNavigation,
            MessageNavigation
        },
        {
            headerMode: "none",
            mode: "modal"
        }
    )
);

export default MainNavigation;