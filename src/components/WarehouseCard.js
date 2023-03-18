import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Separator, ToggleButton, CategoryMenuItem } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, Mock } from "../contants";
import { Display } from "../utils";
import { AuthenticationService, WarehouseService } from "../services";
import LottieView from "lottie-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";

const WarehouseCard = ({_id, name, images, location, navigate}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigate(_id)}>
            
           <Image source={{uri: images.url}} style={styles.posterStyle}/>

           <Text style={styles.titleText}>{name}</Text>
           <Text style={styles.tagText}>{location}</Text>

           <View style={styles.footerContainer}>

                <View style={styles.rowAndCenter}>
                    <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW}/>
                    <Text style={styles.ratingText}>4</Text>
                    <Text style={styles.reviewsText}>(10)</Text>
                </View>

                <View style={styles.rowAndCenter}>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons name="location-outline" size={15} color={Colors.DEFAULT_YELLOW}/>
                        <Text style={styles.timeAndDistanceText}>30</Text>
                    </View>

                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons 
                            name="ios-time-outline"
                            color={Colors.DEFAULT_YELLOW}
                            size={15}
                        />
                        <Text style={styles.timeAndDistanceText}>30</Text>
                    </View>
                </View>


           </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 5,
        //backgroundColor: Colors.DEFAULT_RED,
        //height: 300,
        
    },
    posterStyle: {
        width: 1920 * 0.15,
        height: 1080 * 0.15,
        borderRadius: 10,
        margin: 5,
    },
    titleText: {
        marginLeft: 8,
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    tagText: {
        marginLeft: 8,
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 5,
        //marginTop: -60
        
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8,
        marginBottom: 4,
        justifyContent: "space-between",
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeAndDistanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: Colors.LIGHT_YELLOW,
        borderRadius: 12,
        marginHorizontal: 3,
    },
    timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_YELLOW,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    }
    
    
});

export default WarehouseCard;