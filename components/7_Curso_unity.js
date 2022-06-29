import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Image from 'react-native-auto-scale-image';
//import Style from "../style/Style"
import { getTask, getphotos, deleteTask, deleteCurse } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createStackNavigator } from "@react-navigation/stack";
import envs from '../config/env';
import { useIsFocused, NavigationContainer } from "@react-navigation/native";


const API = `${envs.BACKEND_URL}/api`
const APIimg = envs.BACKEND_URL

const Www = (props) => {
    const isFocused = useIsFocused();
    const [wwwww, setWwwwww] = useState('')
    //const {WW}=envs
    //console.log(props.route.params) 
    //console.log(__DEV__)
    //const [www, setWww] = useState('')
    useEffect(async () => {
        //let mounted = true
        if (isFocused) {
            uuu();
        }
    }, [isFocused]);

    const uuu = async () => {
        const res = await fetch(`${API}/curses/ControllerAll/${props.route.params.CurseId}`, {
            method: "GET",
        });
        const www = await res.json();
        setWwwwww(www[0])
        console.log(props.route.params.CurseId)
    }




    /*
    useEffect(async () => {

            uuu();
            AsyncStorage.removeItem("theme");
            //const ww = await AsyncStorage.getItem('curse');
            //const www = await AsyncStorage.getItem('teach');
            //const w = await AsyncStorage.getItem('theme');
            //console.log(ww, www, w)
        
    }, [isFocused]);
*/
    const Delete = (id) => {
        deleteTask(id)
        //        navigation.navigate("Ww");
    }

    const DeleteCurse = (id) => {
        deleteCurse(id)
    }
    /*
    React.useLayoutEffect(() => {
        props.navigation.setOptions({headerShown: false});
      }, [props.navigation]);
*/

    return (
        <ScrollView style={{ backgroundColor: "#7e90c3cg" }}>

            <View>
                {wwwww ? <Image
                    style={{
                        width: Dimensions.get('window').width
                    }}
                    uri={`${APIimg}/${wwwww.img}`}
                /> : null}
                <Text>id: {wwwww._id}</Text>
                <Text>title: {wwwww.title}</Text>
                <Text>description: {wwwww.description}</Text>
                <Text>user: {wwwww.user}</Text>
                <Text>curse: {wwwww.curse}</Text>
                <Text>imagepath: {wwwww.imagePath}</Text>
                <View style={styles.linkContainer}>

                    {wwwww.unidades ? wwwww.unidades.map((ww_w, index) => (
                        <View style={{ padding: 5, width: "32%", backgroundColor: "rgb(250,250,250)" }}
                            key={ww_w._id}>
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    backgroundColor: "skyblue",
                                    //justifyContent: 'space-between',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text>{ww_w._id}</Text>
                                <Text >ww</Text>
                            </View>
                        </View>

                    )):null}


                    {/*
                    {wwwww.unidades.map((ww_w, index) => (
                        <View style={{ padding: 5, width: "32%", backgroundColor: "rgb(250,250,250)" }}
                        key={ww_w._id}
                        >
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => props.navigation.navigate("Theme", { CurseId: ww_w._id, UserId: wwwww._id, ThemId: ww_w._id })}
                            >
                                {ww_w ? <Image style={styles.image2}
                                    uri={`${APIimg}/${ww_w.imagePath}`} /> : null}
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    backgroundColor: "skyblue",
                                    //justifyContent: 'space-between',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text>{ww_w._id}</Text>
                                <Text >ww</Text>
                            </View>
                        </View>
                        ))}
                    */}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 72
    },
    image: {
        borderRadius: 30
    },
    www: {
        backgroundColor: "blue",
        color: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    linkContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        backgroundColor: "rgb(100,200,300)",
        alignItems: 'center',
        padding: 5,
        //    paddingVertical: 8,
        //    borderWidth:1, borderColor:'green',color:'white'

    },
    image2: {
        height: 110,
        width: "100%",
        //        margin: 5,
        borderRadius: 60
    },
})

export default Www;