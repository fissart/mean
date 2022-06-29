import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from "./config/env";
/*
const API = "http://169.197.183.239:3000/api";
*/
const API = `${envs.BACKEND_URL}/api`
//console.log(envs.BACKEND_URL)



export const getphotos = async (id) => {
  const res = await fetch(`${API}/photos/${id}`, {
    method: "GET",
  });
  return await res.json();
}; 

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

export const getPhoto = async (taskId) => {
  const res = await fetch(`${API}/photos/${taskId}`);
  return await res.json();
};

export const updateTask = async (taskId, newTask) => {
  //console.log(taskId, newTask)
  const res = await fetch(`${API}/wwu/${taskId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return res;
};
