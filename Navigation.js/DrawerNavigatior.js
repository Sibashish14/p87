import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile';
import LogoutScreen from '../screens/LogoutScreen';

export default class DrawerNavigator extends React.Component{
    render(){
        const Drawer=createDrawerNavigator();
        return(
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={TabNavigator}/>
                <Drawer.Screen name="Profile" component={ProfileScreen}/>
                <Stack.Screen name="Logout" component={LogoutScreen}/>
            </Drawer.Navigator>
        )
    }
}