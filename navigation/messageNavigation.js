import {createStackNavigator} from "react-navigation";
import Messages from "../screens/messages/messages.js";
import Message from "../screens/messages/message.js";
import {stackStyles} from "./config.js";

const MessageNavigation = createStackNavigator(
    {
        Messages,
        Message
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                ...stackStyles
            }
        }
    }
);

export default MessageNavigation;