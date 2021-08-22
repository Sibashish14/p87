import * as React from 'react';
import { Text,View,Platform,Dimensions,StatusBar,StyleSheet,Image,SafeAreaView, FlatList} from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard';
import firebase from 'firebase';

const posts=require('./temp_posts.json');
export default class FeedScreen extends React.Component{
    constructor(){
        super();
        this.state={
            light_theme:true
        }
    }
    componentDidMount(){
        this.fetchUser();
    }
    fetchUser=()=>{
        let theme;
        firebase
        .database()
        .ref('/users/',firebase.auth().currentUser.uid)
        .container('value',snapshot=>{
            theme=snapshot.val().current_theme
        });
        this.setState({light_theme:theme==='light'?true:false})
    }
    renderItem=({item:post})=>{
        return <PostCard posts={post} navigation={this.props.navigation}/>
    }
    render(){
   return(
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
              <Image source={require('../assets/logo.png')} style={styles.iconImage}/>
              </View>
              <View style={styles.appTitleTextContainer}>
                  <Text style={styles.appTitleText}>Spectagram</Text>
              </View>
          </View>
          <View style={styles.cardContainer}>
              <FlatList
                  data={posts}
                  keyExtractor={(item,index)=>{index.toString()}}
                  renderItem={this.renderItem}/>
          </View>
        </View>
   )
  }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:RFValue(35)
    },
    appTitle:{
        flex:0.07,
        flexDirection:'row'
    },
    appIcon:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    iconImage:{
        width:"100%",
        height:"100%",
        resizeMode:'contain'
    },
    appTitleTextContainer:{
        flex:0.8,
        justifyContent:'center'
    },
    appTitleText:{
        fontSize:RFValue(28),
        color:'white'
    },
    cardContainer:{
        flex:0.85
    }
})