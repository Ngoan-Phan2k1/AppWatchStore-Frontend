import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, Image } from "react-native";
import { Display } from "../utils";
import { Fonts, Colors, Images } from "../contants";

const WelcomeCard = ({title, content, image}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Images[image]} resizeMode="contain"/>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Display.setWidth(100),
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
    titleText: {
        fontSize: 22,
        fontFamily: Fonts.POPPINS_BOLD,
        color: 'black',
        textAlign: 'center',
    },
    contentText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_LIGHT,
        textAlign: 'center',
        color: 'black',
        marginHorizontal: 20
    }
    
});

export default WelcomeCard;