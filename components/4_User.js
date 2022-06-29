import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { View, Button, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused, NavigationContainer } from "@react-navigation/native";
import Axios from "axios";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import envs from '../config/env';

const API2 = envs.BACKEND_URL;
const API = `${envs.BACKEND_URL}/api/wwu`
const APIw = envs.BACKEND_URL+"/api";

const TaskFormScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [task, setTask] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
    foto: "",
    editing: false,
  });
  const [editing, setEditing] = useState(false);
  const [img, setImg] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);


  useEffect(() => {
    let mounted = true
    if (route.params && route.params.Id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizar usuario" });
      (async () => {
        //const task = await getTask(route.params.Id);
        const res = await fetch(`${APIw}/users/Controller/${route.params.Id}`);
        const task = await res.json();
        console.log(task)
        if (mounted) {
          setTask({ name: task.name, email: task.email, password: task.password, rol: task.rol, foto: task.foto });
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
        //console.log('received image', image);
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
        //console.log('received image', image);
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
    //console.log(task)
    try {
      const data = new FormData();
      //console.log(img)
      const w_ = await AsyncStorage.getItem('teach');
      const w__ = await AsyncStorage.getItem('curse');
      console.log(w_)
      console.log(w__)

      if (img) {
        data.append('image', {
          uri: img.image.uri,
          type: img.image.mime,
          name: "photo.jpg",
        })
      } else {
        //        data.append('image', {})
      }
      data.append('name', task.name);
      data.append('email', task.email);
      data.append('password', task.password);
      data.append('rol', "3");
      console.log(data)
      // await saveTask(task);

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

      if (!editing) {

        await Axios.post(`${API2}/api/task/Controller`, data, options).then(res => {
          setUploadPercentage(100);
        });

      } else {
        console.log(task)
        await Axios.put(`${APIw}/users/Controller/${route.params.Id}`, data, options).then(res => {
          setUploadPercentage(100);
        });

      }
      navigation.navigate("Inicio");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

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
          value={task.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={task.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          value={task.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        <TouchableOpacity
          onPress={() => pickSingleWithCamera(false)}
          style={styles.buttonSave}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickSingle(false)}
          style={styles.buttonSave}
        >
          <Text style={styles.buttonText}>Imagen</Text>
        </TouchableOpacity>


        {img ? renderAsset(img) : editing ? <Image style={{ margin: 3, width: 300, height: 300, resizeMode: 'contain' }}
          source={{
            uri: `${API2}/${task.foto}`
          }}
        /> : null}
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
        {!editing && task ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>

        )}
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
    backgroundColor: "blue",
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
    width: "50%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    backgroundColor: "blue",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;
