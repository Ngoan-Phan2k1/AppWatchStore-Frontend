import React, {useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import { Separator, ToggleButton } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, Mock } from "../contants";
import { Display } from "../utils";
import { AuthenticationService } from "../services";
import LottieView from "lottie-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CategoryMenuItem = ({name, logo, activeCategory, setActiveCategory}) => {
    return (
        <TouchableOpacity 
            key={name} 
            onPress={() => setActiveCategory(name)}
            style={styles.category()}
        >
            <Image 
                source={Images[logo]} 
                style={styles.categoryIcon( activeCategory === name)}
            />
            <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    category: (marginTop = 0) => ({
        alignItems: "center",
        marginTop,
    }),
    categoryIcon: isActive => ({
        // height: 30,
        // width: 30,
        height: 40,
        width: 40,
        opacity: isActive ? 1 : 0.5,
        //opacity: 0.5

    }),
    categoryText: isActive => ({
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,
        marginTop: 5,
        opacity: isActive ? 1 : 0.5,
    }),
    
    
});

export default CategoryMenuItem;