import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
//import { saveTask, getPhoto, updateTask } from "../api";
import ImagePicker from 'react-native-image-crop-picker';
import { View, Button, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused, NavigationContainer } from "@react-navigation/native";
import Axios from "axios";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import envs from '../config/env';

const APImg = envs.BACKEND_URL
const APIww = `${envs.BACKEND_URL}/api/photos`
const API = `${envs.BACKEND_URL}/api`
const API2 = `${envs.BACKEND_URL}/api/photos2`

const TaskFormScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [task, setTask] = useState({
    title: "",
    description: "",
    imagePath: "",
    editing: false,
  });
  const [editing, setEditing] = useState(false);
  const [img, setImg] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(async () => {
/*
    const ww = await AsyncStorage.getItem('curse');
    const www = await AsyncStorage.getItem('teach');
    setTeach(www)
    setCurse(ww)
*/
    let mounted = true
    console.log(route.params.UserId);
    console.log(route.params.Id);
    if (route.params.Id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Updating Curse" });
      (async () => {
        const res = await fetch(`${API}/curses/Controller/${route.params.Id}`, {
          method: "GET",
        });
        const ww =  await res.json();
        //console.log(ww)
        if (mounted) {
          setTask({ title: ww.title, description: ww.description, imagePath: ww.imagePath });
        }
      })();
    }


    return function cleanup() {
      mounted = false
    }

  }, [isFocused]);


  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        setImg({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => console.log(e));
  }
  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        setImg({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);

      });
  }

  const renderImage = (image) => {
    //console.log(image.image.uri)
    return (
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={{
          uri: image.image.uri
        }}
      />
    );
  }

  const renderAsset = (image) => {
    return renderImage(image);
  }



  const handleSubmit = async () => {
    try {
      if (!editing) {
        const data = new FormData();
        //console.log(img)
        if (img) {
          data.append('image', {
            uri: img.image.uri,
            type: img.image.mime,
            name: "photo.jpg",
          })
        } else {
          data.append('image', {})
        }
        data.append('title', task.title);
        data.append('description', task.description);
        data.append('user', route.params.UserId);
 
        //console.log(data)
        
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);

            if (percent < 100) {
              setUploadPercentage(percent)
            }
          }
        }
        await Axios.post(`${API}/curses/Controller`, data, options).then(res => {
          setUploadPercentage(100);
        });
        navigation.navigate("Inicio");
        //        navigation.navigate("Www", { CurseId: w__, UserId: w_ })
      } else {
        const data = new FormData();
        if (img) {
          data.append('image', {
            uri: img.image.uri,
            type: img.image.mime,
            name: "photo.jpg",
          })
        } else {
          //          data.append('image', {})
        }
        data.append('title', task.title);
        data.append('description', task.description);
        data.append('imagePath', task.imagePath);
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            if (percent < 100) {
              setUploadPercentage(percent)
            }
          }
        }
          await Axios.put(`${API}/curses/Controller/${route.params.Id}`, data, options).then(res => {
            setUploadPercentage(100);
          });
          navigation.navigate("Inicio");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
    //console.log(name,value)
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff"}}>
      <View style={{
        paddingTop: 5,
        flex: 1,
        alignItems: "center",
      }}>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#000"
          value={task.title}
          onChangeText={(text) => handleChange("title", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Subnombre"
          placeholderTextColor="#000"
          value={task.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <TouchableOpacity
          onPress={() => pickSingleWithCamera(false)}
          style={styles.buttonUpdate}
        >
          <Text style={styles.buttonText}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickSingle(false)}
          style={styles.buttonUpdate}
        >
          <Text style={styles.buttonText}>Imágen</Text>
        </TouchableOpacity>
        {!editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar curso</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Actualizar curso</Text>
          </TouchableOpacity>

        )}

        {img ? renderAsset(img) : <Image style={{ width: 300, height: 300, resizeMode: 'contain' }}
          source={{
            uri: `${APImg}/${task.imagePath}`
          }}
        />}
        {img ?
          <>
            <View style={{ marginVertical: 5 }}>
              <Text>Fixed Progress Value {uploadPercentage}%</Text>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={uploadPercentage / 100}
              />
            </View>

          </>
          : null
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#000",
    //    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    margin: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    backgroundColor: "skyblue",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#000",
    //    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    margin: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    backgroundColor: "skyblue",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;
