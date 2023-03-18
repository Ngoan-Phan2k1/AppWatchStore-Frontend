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

const CategoryListItem = ({name, _id, isActive, selectCategory, selectIdCategory}) => {
    //console.log(_id);
    return (
        <View style={styles.container}>
            <Text 
                style={isActive ? styles.activeCategoryText : styles.inActiveCategoryText}
                //onPress={() => selectCategory(name)}

                onPress={() => {
                    selectCategory(name)
                    selectIdCategory(_id)
                }}
            >
                {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_YELLOW,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: "center",
    },
    activeCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    inActiveCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.INACTIVE_GREY,
    }
}); 

export default CategoryListItem;