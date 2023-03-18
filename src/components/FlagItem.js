import React, {useState} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    TextInput, 
    TouchableOpacity, 
    Image,
    FlatList 
} from "react-native";
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, CountryCode } from "../contants";
import { Display } from "../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StaticImageService } from "../services";



const FlagItem = ({name, dial_code, code, onPress}) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => onPress({code, name, dial_code})}>
            <Image 
                style={styles.flatImage} 
                source={{uri: StaticImageService.getFlagIcon(code)}}
            />
            <Text style={styles.flagText}>{dial_code}</Text>
            <Text style={styles.flagText}>{name}</Text>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    flatImage: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    flagText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginRight: 10,
    }
    
});


export default FlagItem;