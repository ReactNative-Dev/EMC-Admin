import React from "react";
import {StyleSheet} from "react-native";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import {Login} from "./modules/login";
import {Stores} from "./modules/stores";
import {Dashboard} from "./modules/dashboard";
import {OrderDetails, Sales} from "./modules/sales";
import {Settings} from "./modules/settings";
import {Help} from "./modules/help";
import {About} from "./modules/about";
import {Logout} from "./modules/logout";
import SideDrawer from "./modules/common/SideDrawer";

const OrdersNavigation = createStackNavigator(
    {
        Sales: {
            screen: Sales
        },
        OrderDetails: {
            screen: OrderDetails
        },
    },
    {
        initialRouteName: "Sales",
        headerMode: "none"
    }
);

const Home = createDrawerNavigator(
    {
        Dashboard: {
            screen: Dashboard,
        },
        Sales: {
            screen: OrdersNavigation,
        },
        Settings: {
            screen: Settings,
        },
        Help: {
            screen: Help,
        },
        About: {
            screen: About,
        },
        Logout: {
            screen: Logout,
        },
    },
    {
        initialRouteName: "Dashboard",
        contentComponent: SideDrawer,
        drawerWidth: 300,
        headerMode: "none",
        backBehavior: "initialRoute"
    }
);

const StackNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        Stores: {
            screen: Stores,
        },
        Home: {
            screen: Home,
        }
    },
    {
        initialRouteName: "Login",
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


export default StackNavigator;
