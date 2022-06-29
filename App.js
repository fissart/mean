import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//import HomeScreen from "./screens/HomeScreen";
//import Wwwwww_up from "./components/Wwwwww_up";
import LandScape from "./components/1_LandScape";
import UserForm from "./components/4_User";
import Inicio from "./components/3_Inicio";
import TaskFormLogin from "./components/2_Login";
import Task from "./components/5_Task";

//import Wwwwww from "./components/assets/Wwwwww";
import Curso from "./components/5_Curso";
import Www from "./components/7_Curso_unity";
//import Uuu from "./components/assets/Uuu";
//import Ww_up from "./components/assets/Ww_up";

const Stack = createStackNavigator();

const App = ({ navigation, route }) => {

  const [wwwww, setWwwww] = useState();

  useEffect(async () => {
    const value = await AsyncStorage.getItem('user');
    //    console.log(value, "wwwwwwwwwwwwwwwwwwwwwww");
    setWwwww(value)
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("usuario");
    await AsyncStorage.removeItem("ww");
    await AsyncStorage.removeItem("teach");
    await AsyncStorage.removeItem("curse");
    setWwwww(null)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={wwwww == null ? "LandScape" : "Ww"} >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={({ navigation }) => ({
            title: "Usuario y cursos",
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerShown: false,
            headerTitleStyle: {
              color: "#000",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  logout();
                  navigation.navigate("LandScape");
                }}
              >
                <Text style={{ color: "#000", marginRight: 20, fontSize: 15 }}>
                  Logout
                </Text>
              </TouchableOpacity>
            ),

          })}
        />
        <Stack.Screen
          name="User"
          component={UserForm}
          options={({ navigation }) => ({
            title: 'Crear usuario',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",

            headerTitleStyle: {
              color: "#000",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("UserForm")}
              >
                <Text style={{ color: "#000", marginRight: 20, fontSize: 15 }}>
                  Neww
                </Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="TaskFormLogin"
          component={TaskFormLogin}
          options={({ navigation }) => ({
            title: 'login',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",
            headerShown: false,
            headerTitleStyle: {
              color: "#000",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("TaskFormLogin")}
              >
                <Text style={{ color: "#000", marginRight: 20, fontSize: 15 }}>
                  New
                </Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="LandScape"
          component={LandScape}
          options={({ navigation }) => ({
            title: 'Fisart',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",
            headerShown: false,
            headerTitleStyle: {
              color: "#000",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Ww")}
              >
                {wwwww ?
                  <Text style={{ color: "#000", marginLeft: 20, fontSize: 15 }}>
                    Fotos
                  </Text> : null}
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("TaskFormLogin")}
              >
                <Text style={{ color: "#000", marginRight: 20, fontSize: 15 }}>
                  {wwwww ? null : "Login"}
                </Text>
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="Www"
          component={Www}
          options={({ navigation }) => ({
            title: 'Curso',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",

            headerTitleStyle: {
              color: "#000",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Curso")}
              >
                <Text style={{ color: "#000", marginRight: 20, fontSize: 15 }}>
                  Agregar tema
                </Text>
              </TouchableOpacity>
            ),

          })}
        />
        <Stack.Screen
          name="Curso"
          component={Curso}
          options={({ navigation }) => ({
            title: 'Nuevo curso',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",

            headerTitleStyle: {
              color: "#000",
            }
          })}
        />


        <Stack.Screen
          name="Task"
          component={Task}
          options={({ navigation }) => ({
            title: 'Tarea',
            headerStyle: {
              backgroundColor: "#fff",
              elevation: 0,
              shadowColor: "none",
              borderBottomWidth: 0,
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              color: "#000",
            }
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


/*
//Insertar nuevas collecciones
db.wwws.insertMany(
[
	{name:"75869653",email: "75869653@w", password:"75869653",rol:"3",foto:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")},
	{name:"75869653",email: "75869653@w", password:"75869653",rol:"3",foto:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")},
	{name:"75869653",email: "75869653@w", password:"75869653",rol:"3",foto:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")}
])
//Nested data
db.wwws.insertMany(
[
	{name:"75869653",email: "75869653@w",  size: { h: 14, w: 21, uom: "cm" }, password:"75869653",rol:"3",foto:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")},
	{name:"75869653",email: "75869653@w", password:"75869653",rol:"3",foto:"uploads/cf0802fd-d079-4eb4-bc60-e0d31ae7c939.jpg",createdAt:ISODate("2021-08-16T20:28:22.674Z"),updateAt:ISODate("2021-08-16T20:28:22.674Z")}])

-//Actualizar e ingresar documentos nested
db.users.update( {_id: ObjectId('623cd42f0ad9cfb39677310e')}, { '$set': {"size.h" : 'www'} });
//Actualizar e ingresar documentos nuevos
db.wwws.update( {'_id':ObjectId('623bcd104e6f90b190a6d1d7')}, {$set:{'role':'New MongoDB Tutorial', 'rolewww':'New MongoDB Tutorial'}} )

//Actualizar y agregar documentos nuevos a toda la collección
db.wwws.updateMany( { }, {$set:{'rol':'New MongoDB Tutorial', 'new2':'New MongoDB Tutorial'}} )
---------------------
db.wwws.update( { '_id':ObjectId('623bcd104e6f90b190a6d1d8') }, {$set:{'rol':'New MongoDB Tutorial', 'new2':'New MongoDB Tutorial'}} )



//eliminar un documento. Only one with ID
db.wwws.update( {'_id':ObjectId('623bcd104e6f90b190a6d1d7')}, { $unset: { type: "" } } )

//update All with field "type"
db.wwws.updateMany( { }, { $unset: { type: "" } } )

//Remover collection
db.wwws.remove( {'_id':ObjectId('623bcd104e6f90b190a6d1d7')} )


  db.wwws.insertMany(
    [
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "40787801","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "48485795","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "70788957","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "46154024","password" : "","rol" : "3","foto" : "")} ,
      {"name" : "",	"email" : "70842779","password" : "","rol" : "3","foto" : "")} ,
      ],
  )


mongodump --out ww.json --db fismart --host localhost  //descargar
mongorestore --db fismart ww.json/fismart  //subir

mongodump --out ww.json --db fismart --collection tasks --host localhost
mongorestore --db namedatabase --collection namecollectionqueenviar w1.json/fisart //restaurar coleccion.
mongorestore --nsInclude fismart.tasks ww.json/fismart/tasks.bson //new version




*/
