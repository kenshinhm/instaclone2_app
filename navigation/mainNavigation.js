import {createStackNavigator, createAppContainer} from "react-navigation";
import TabNavigation from "./tabNavigation.js";
import PhotoNavigation from "./photoNavigation.js";

const MainNavigation = createAppContainer(
    createStackNavigator(
        {
            TabNavigation,
            PhotoNavigation
        },
        {
            headerMode: "none",
            mode: "modal"
        }
    )
);

export default MainNavigation;