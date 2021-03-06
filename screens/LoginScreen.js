import * as React from 'react';
import { Text,View,StyleSheet,Dimensions,Alert,ToastAndroid,StatusBar,Platform,SafeAreaView,Image } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';

export default class LoginScreen extends React.Component{
    isUserEqual=(googleUser,firebaseUser)=>{
        if(firebaseUser){
      var providerData=firebaseUser.providerData;
      for(var i=0;i<providerData.length;i++){
          if(providerData[i].providerId===
        firebase.auth.GoogleAuthProvider.PROVIDER_ID&& 
        providerData[i].uid===googleUser.getBasicProfile().getId()){
            return true;
        }
      }
    }
    return false;
   };
   onSignIn=googleUser=>{
       var unsubscribe=firebase.auth().onAuthStateChanged(firebaseUser=>{
           unsubscribe();
           if(!this.isUserEqual(googleUser,firebaseUser)){
               var credential=firebase.auth.GoogleAuthProvider.credential(
                   googleUser.idToken,
                   googleUser.accessToken
               )
               firebase.auth()
                .signInWithCredential(credential)
                .then(result=>{
                    if(result.additionalUserInfo.isNewUser){
                        firebase
                        .database()
                        .ref("/users/"+result.user.uid)
                        .set({
                            gmail:result.user.email,
                            profile_picture:result.additionalUserInfo.profile.picture,
                            locale:result.additionalUserInfo.profile.locale,
                            first_name:result.additionalUserInfo.profile.given_name,
                            last_name:result.additionalUserInfo.profile.family_name,
                            current_theme:"dark"
                        })
                    }
                })
                .catch(e=>{
                    Alert.alert(
                        'Sign In Error',
                        'Failed signing in',
                        [{
                            text:'OK',
                            onPress:()=>null
                        }],
                        {cancellable:true}
                    )
                    console.log(e);
                })
               
           }
           else{
               ToastAndroid.show("Already signed in",ToastAndroid.SHORT);
           }
       })
   }
   signInWithGoogleAsync=async ()=>{
       try{
       const result=await Google.logInAsync({
           behaviour:'web',
           androidClientId:"1055324125415-s8pg46sjnp7vk4lnnm2rdedakkmfnpak.apps.googleusercontent.com",
           iosClientId:"1055324125415-7vl3c0ti2edq46l77v7uu51p0f4tq7fd.apps.googleusercontent.com",
           scopes:["profile","email"]
       })
       if(result.type==='success'){
          return result.accessToken;
       }
       else if(result.type==='cancel'){
           Alert.alert(
               'Sign In Cancelled',
               'Signing in is cancelled',
               [{
                   text:'OK',
                   onPress:()=>{  return {cancelled:true}}
               }],
               {cancellable:false}
           )
         }
   }
   catch{
       Alert.alert(
           'Trouble Signing in',
           'There were trouble signing in',
           [{
               text:'OK',
               onPress:()=>{return{error:true}}
           }],
           {cancellable:true}
       )
   }
}
    render(){
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.appIcon}
                ></Image>
                <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.signInWithGoogleAsync()}
                >
                  <Image
                    source={require("../assets/google_icon.png")}
                    style={styles.googleIcon}
                  ></Image>
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
            
            </View>
          );
        }
      }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#15193c"
      },
      droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
      },
      appTitle: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
      },
      appIcon: {
        width: RFValue(130),
        height: RFValue(130),
        resizeMode: "contain"
      },
      appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
      },
      buttonContainer: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
      },
      button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white"
      },
      googleIcon: {
        width: RFValue(30),
        height: RFValue(30),
        resizeMode: "contain"
      },
      googleText: {
        color: "black",
        fontSize: RFValue(20),
      },
      cloudContainer: {
        flex: 0.3
      },
      cloudImage: {
        position: "absolute",
        width: "100%",
        resizeMode: "contain",
        bottom: RFValue(-5)
      }
    });