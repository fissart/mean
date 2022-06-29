import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import Style from "../style/Style"
const Www = (props) => {
    const [www, setWww] = useState('')
    //console.log(props.route.params.idUser)
    const uuu = async () => {
        //const res = await fetch('http://169.197.183.239:3000/api/photos/'+props.route.params.idUser)
        const res = await fetch('http://169.197.183.239:3000/api/photos/' + props.route.params.idUser)
        const data = await res.json()
        setWww(data)
    }

    useEffect(() => {
        uuu()
    }, [])

    return (<Style>
        <View style={styles.container}>
            <Image onPress={() => alert(message._id)} source={{ uri: 'http://169.197.183.239:3000/' + www.imagePath }} style={styles.image} />
            <Text style={styles.www}>{www._id}</Text>
            <Text>{www.title}</Text>
            <Text>{www.description}</Text>
            <Button onPress={() => alert(www.description)} title="wwwwwww" />
        </View>
    </Style>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { height: 800, width: "100%", borderRadius: 10 },
    www: { backgroundColor: "blue", padding: 10, margin: 10 }
})

export default Www;