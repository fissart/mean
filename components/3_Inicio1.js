import React, { useEffect, useState, useRef } from "react";
import Style from "../style/Style"
import axios from 'react-native-axios';
import Image from 'react-native-auto-scale-image'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import { Icon } from 'react-native-elements'
import { ProgressBar } from '@react-native-community/progress-bar-android'
import envs from '../config/env';


import {
    RefreshControl,
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Button,
    Text,
    useColorScheme,
    View,
    ImageBackground,
    Animated
} from 'react-native';
//import { Www1 } from "./screen/Header";

const API = `${envs.BACKEND_URL}/api`
const APIimg = envs.BACKEND_URL

const Ww = ({ navigation, route }) => {

    //    const [www, setWww] = useState([])
    const [w, setWwwww] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [showiconadd, setshowiconadd] = React.useState(false);
    //const [refreshing, setRefreshing] = useState(true);
    //  const [tasks, setTasks] = useState([]);
    const isFocused = useIsFocused();


    const flatlistRef = useRef();

    const onPressFunction = () => {
        flatlistRef.current.scrollToEnd({ animating: true });
    };
    const onPressFunction_up = () => {
        flatlistRef.current.scrollTo({ y: 0, animated: true, });
    };

    const getUsers = async () => {
        const value = await AsyncStorage.getItem('user');
        try {
            if (value) {
                //const tasks = await getTasks(value);
              const ww = await fetch(`${API}/users/ControllerAll/${value}`, {
                    method: "GET",
                });
                const tasks = await ww.json();
                console.log(tasks)
                setWwwww(tasks);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        await getUsers();
        setRefreshing(false);
    }, []);


    const userRemove = (id) => {
        //  console.log(id)

        Alert.alert("Eliminar usuario", "Estas seguro de eliminar este usuario", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Ok",
                onPress: async () => {
                    await fetch(`${API}/users/Controller/${id}`, {
                        method: "DELETE",
                      });
                    await getUsers();
                },
            },
        ]);
    };

    useEffect(async () => {
        //let mounted = true
        if (isFocused) {
            getUsers();
            await AsyncStorage.removeItem("curse");
            await AsyncStorage.removeItem("theme");
        }
    }, [isFocused]);



    const DeleteCurse = async (id) => {
        Alert.alert("Eliminar foto", "Estas seguro de eliminar esta foto", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Ok",
                onPress: async () => {
                    await fetch(`${API}/curses/Controller/${id}`, {
                        method: "DELETE",
                      });
                    await getUsers();
                },
            },
        ]);
    }
    // const scrollY = new Animated.Value(0)
    const scrollY = new Animated.Value(0)
    const diffClampZ = new Animated.diffClamp(scrollY, 0, 380)
    const translateZ = diffClampZ.interpolate({
        inputRange: [0, 30],
        outputRange: [0, -30]
    })

    const diffClamp = new Animated.diffClamp(scrollY, 0, 70)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70]
    })
    const scrollW = new Animated.Value(0)
    const diffClampW = new Animated.diffClamp(scrollW, 0, 70)
    const translateW = diffClampW.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70]
    })

    const logout = async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("usuario");
        await AsyncStorage.removeItem("ww");
        await AsyncStorage.removeItem("teach");
        await AsyncStorage.removeItem("curse");
        setWwwww(null)
        navigation.navigate("LandScape");
    }

    const renderItem = ({ item }) => (
        <>
            <View style={{ paddingVertical: 30, }}></View>
            <StatusBar hidden={true} />
            <TaskItem task={item} DeleteCurse={DeleteCurse} userRemove={userRemove} />
        </>);

    return (
        <View style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
            <Animated.View style={{
              transform: [{ translateY: translateY }],
              position: 'absolute', left: "2%",
              top: "1%",
              zIndex: 1,
              backgroundColor: "rgba(20,10,80,0.5)",
              borderTopEndRadius: 10,
              borderWidth: 1
            }}>
                <View>
                    <Icon
                        reverse
                        name='user'
                        type='font-awesome'
                        color='rgba(100,100,100,0)'
                        onPress={() => {
                            navigation.navigate("LandScape");
                        }}
                    />
                    <Icon
                        reverse
                        name='sign-out'
                        type='font-awesome'
                        color='rgba(100,100,100,0)'
                        onPress={() => logout()}
                    />
                    <Icon
                        reverse
                        name='angle-double-down'
                        type='font-awesome'
                        color='rgba(100,100,100,0)'
                        onPress={() => onPressFunction()}
                    />
                    <Icon
                        reverse
                        name='angle-double-up'
                        type='font-awesome'
                        color='rgba(100,100,100,0)'
                        onPress={() => onPressFunction_up()}
                    />
                    <Icon
                        reverse
                        name='camera'
                        type='font-awesome'
                        color='rgba(100,100,100,0)'
                        onPress={() => navigation.navigate("User")}
                    />
                </View>
            </Animated.View>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    ref={flatlistRef}
                    onScroll={(e) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                        scrollW.setValue(-e.nativeEvent.contentOffset.y);
                        //console.log(e.nativeEvent)
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >

                    {w ? w.map((www, index) => (
<View style={styles.container} key={index.toString()}>
{www ? <TouchableOpacity

    onPress={() => navigation.navigate("User", { Id: www._id })}
    style={{

        marginHorizontal: 5, marginVertical: 5, zIndex: 2, borderWidth:1, borderColor:'red', paddingVertical: 5,paddingHorizontal: 5,
    }}
>
    <Text style={{color:'blue'}}>{www.name}</Text>
    <Text style={{color:'blue'}}>{www.email}</Text>
    <Text style={{color:'blue'}}>{www.password}</Text>
    <Text style={{color:'blue'}}>{www.foto}</Text>
    <Text style={{color:'blue'}}>{www.rol}</Text>
    <Text style={{color:'blue'}}>{www._id}</Text>
    <View
        style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            padding: 5,
            borderWidth:1,
            backgroundColor: "yellow",
            borderTopEndRadius: 8,
            borderTopStartRadius: 8
        }}>
        <Icon
            reverse
            name='trash'
            type='font-awesome'
            color='rgb(150,150,100)'
            onPress={() => userRemove(www._id)}
        />
        <Icon
            reverse
            name='chevron-circle-right'
            type='font-awesome'
            color='rgb(250,50,200)'
            onPress={() => navigation.navigate("Curso", { UserId: www._id })}
        />
      </View>

</TouchableOpacity> : <ProgressBar />}


<View style={styles.linkContainer}>
    {www.curse.map((ww) => (
        ww.curse == null ?
            <View key={ww._id.toString()} style={{ width: "32.5%", padding: 5, alignItems: "center", justifyContent: "center",   borderWidth:1, paddingVertical: 5,paddingHorizontal: 5, }}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "90%",
                        padding: 5,
                        borderWidth:1,
                        backgroundColor: "yellow",
                        borderTopEndRadius: 8,
                        borderTopStartRadius: 8,
                    }}>
                    <Icon
                        //reverse
                        //size={15}
                        style={{ margin: 5 }}
                        name='expand'
                        type='font-awesome'
                        color='#517fa4'
                        onPress={() => navigation.navigate("Curso", { CurseId: ww._id, UserId: www._id })}
                    />
                    <Text style={{color:'blue'}}>{www._id}</Text>

                    <Icon
                        reverse
                        size={15}
                        name='edit'
                        type='font-awesome'
                        color='rgb(250,50,200)'
                        onPress={() => navigation.navigate("Curso", { Id: ww._id })}
                    />
                    <Icon
                        //reverse
                        name='trash'
                        //size={15}
                        type='font-awesome'
                        color='#517fa4'
                        onPress={() => DeleteCurse(ww._id)}
                    />
                </View>
                {ww.img!="imagen" ? <Image
                    style={styles.image2}
                    uri={`${APIimg}/${ww.img}`}
                    //onError={({ nativeEvent: { error } }) => void}
                    /*onError={({ nativeEvent: {error} }) => console.log(error) } style={styles.image2} uri={'https://source.unsplash.com/random/800x800/?img=6'}*/
                /> :<Image
                style={styles.image2}
                //uri={`${APIimg}/${ww.img}`}
                uri={'https://source.unsplash.com/random/800x800/?img=6'}
            />}
                <Text style={{ fontSize: 10 }}>{ww._id}
                </Text>
            </View> : null
    ))}
</View>

</View>

                    )) : <></>}
                </ScrollView>
            </SafeAreaView>



            <Animated.View style={{ transform: [{ translateY: translateW }], position: 'absolute', right: "0%", bottom: "-9.7%", zIndex: 2 }}>
                <Icon
                    reverse
                    name='camera'
                    type='font-awesome'
                    color='rgba(10,10,80,0.8)'
                    onPress={() => console.log("Wwwwww")}
                />
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },

    sectionTitle: {
        fontSize: 24,
        color: "red",
        fontWeight: '900',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
        color: "blue"
    },
    //  container: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: {
        height: 300,
        width: "100%",
        borderRadius: 10,
        flex: 2,
    },
    image2: {
        height: 180,
        //width: 70,
        width: "100%",
        margin: 5,
        //resizeMode: 'contain' ,
        borderRadius: 90,
    },


    background: {
        paddingBottom: 50,
        paddingTop: 50,
        paddingHorizontal: 32,
    },
    background2: {
        paddingBottom: 100,
        paddingTop: 100,
        borderRadius: 60,

        paddingHorizontal: 30,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        /*
         * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
         *
         * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
         * source image's size.
         */
        marginLeft: -18,
        marginBottom: -12,
    },
    logo2: {
        borderRadius: 60,
        overflow: 'visible',
        resizeMode: 'cover',

    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: "olive",
        textAlign: 'center',
    },

    container: {
        marginTop: 2,
        marginBottom: 2,
        paddingHorizontal: 24,
         borderWidth:1, borderColor:'green',color:'white',
         borderRadius: 5,
        backgroundColor: "white"
    },
    linkContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        backgroundColor: "rgb(2250,250,200)", paddingVertical: 5,paddingHorizontal: 5,
        borderWidth:1, borderColor:'green',color:'white'

    },
    link: {
        flex: 2,
        fontSize: 18,
        fontWeight: '400',
        //      color: Colors.primary,
    },
    description: {
        flex: 2,
        paddingVertical: 16,
        fontWeight: '400',
        fontSize: 18,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
    },


});




export default Ww;
