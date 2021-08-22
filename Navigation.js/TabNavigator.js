import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreatePostScreen from '../screens/CreatePost';
import FeedScreen from '../screens/Feed.js';
import {RFValue} from 'react-native-responsive-fontsize';

export default class TabNavigator extends React.Component{
    render(){
        const Tab=createMaterialBottomTabNavigator();
        return(
            <Tab.Navigator
              label={false}
              barStyle={styles.barStyle}
             screenOptions={({route})=>({
              tabBarIcon:({focused,size,color})=>{
                   let iconName;
                   if(route.name==='Feed'){
                       iconName=focused?'book':'book-outline'
                   }
                   else if(route.name==='CreatePost'){
                       iconName=focused?'create':'create-outline'
                   }
                   return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icon}/>
              }
            })}
            tabBarOptions={{
                activeTintColor:'tomato',
                inactiveTintColor:'black'
            }}>
             <Tab.Screen name="Feed" component={FeedScreen}/>
             <Tab.Screen name="CreatePost" component={CreatePostScreen}/>
            </Tab.Navigator>
        )
    }
   
}
const styles=StyleSheet.create({
    barStyle:{
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      backgroundColor:'dimgrey',
      overflow:'hidden',
      position:'absolute'
    },
    icon:{
      height:RFValue(30),
      width:RFValue(30)
    }
})