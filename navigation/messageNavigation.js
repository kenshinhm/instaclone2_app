import {createStackNavigator} from "react-navigation";
import Messages from "../screens/messages/messages.js";
import Message from "../screens/messages/message.js";

const MessageNavigation = createStackNavigator({
    Messages,
    Message
});

export default MessageNavigation;