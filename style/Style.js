import React from "react";
import { View, StatusBar, StyleSheet, ScrollView } from "react-native";

const Ww = ({ children }) => {
  return (
    <ScrollView style={styles.container}>
    <StatusBar backgroundColor="#fff" barStyle="light-content" hidden={false}/>
    {children}
    </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: "#fff",
    },
  });

  export default Ww;
  