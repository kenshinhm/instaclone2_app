import {createStackNavigator, createAppContainer} from "react-navigation";
import AuthHome from "../screens/auth/authHome.js";
import SignUp from "../screens/auth/signUp.js";
import Login from "../screens/auth/Login.js";
import Confirm from "../screens/auth/confirm.js";

const AuthNavigation = createStackNavigator(
    {
        AuthHome,
        SignUp,
        Login,
        Confirm
    },
    {
        headerMode: "none"
    }
);


export default createAppContainer(AuthNavigation);
