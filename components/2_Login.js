import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { getTasks, Login } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultImage from '../ww.jpg';
import { Icon } from 'react-native-elements'
import envs from '../config/env';

const API = `${envs.BACKEND_URL}/api`

const TaskFormScreen = ({ navigation, route }) => {
  const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
  const [task, setTask] = useState({
    email: "",
    password: "",
  });
  const [editing, setEditing] = useState(false);


  const handleSubmit = async () => {
    try {
      const www = await fetch(`${API}/users/controllersign/${task.email}/${task.password}`, {
        method: "GET",
      });
      const ww = await www.json();
      //console.log(ww);

      if (ww.user._id) {
        console.log(ww.user._id);
        AsyncStorage.setItem('user', ww.user._id);
        AsyncStorage.setItem('rol', ww.user.rol);
        navigation.navigate("Inicio");
      } else {
        alert(ww.user.msg)
      }

    } catch (error) {
      console.log(error);
      alert("Escriba sus correo y contraseña")
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <View style={{
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/*
      <Image style={{ width: "61%",  aspectRatio: 1, borderRadius: 250, marginBottom:20 }}
      source={{
        uri: DEFAULT_IMAGE
      }}
      />
    */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgb(100, 100, 200)"
        value={task.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgb(100, 100, 200)"
        value={task.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>
      {/*
      <Icon
      reverse
      name='arrow-left'
      size={30}
      type='font-awesome'
      color='#9F4709'
      onPress={() => {
        navigation.navigate("LandScape");
      }}
      />
    */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "61%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgb(100, 100, 200)",
    height: 30,
    color: "rgb(100, 100, 200)",
    //textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 50,
    backgroundColor: "rgb(100, 100, 200)",
width: "61%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;
