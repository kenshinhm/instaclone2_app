import {createStackNavigator, createAppContainer} from "react-navigation";
import TabNavigation from "./tabNavigation.js";
import PhotoNavigation from "./photoNavigation.js";
import MessageNavigation from "./messageNavigation.js";
import {stackStyles} from "./config.js";

const MainNavigation = createAppContainer(
    createStackNavigator(
        {
            PhotoNavigation,
            TabNavigation,
            MessageNavigation
        },
        {
            defaultNavigationOptions: {
                headerStyle: {
                    ...stackStyles
                }
            },
            headerMode: "none",
            mode: "modal"
        }
    )
);

export default MainNavigation;