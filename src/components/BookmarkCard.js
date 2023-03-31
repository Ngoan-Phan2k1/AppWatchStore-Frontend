import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import 
{ 
    Separator, 
    ToggleButton, 
    CategoryMenuItem, 
    WarehouseCard, 
    WarehouseMedium,
    CategoryListItem,
} from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, Mock } from "../contants";
import { Display } from "../utils";
import { AuthenticationService, WarehouseService, ProductService, UserService } from "../services";
import LottieView from "lottie-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";


import {useDispatch, useSelector} from "react-redux";
import {CartAction, BookmarkAction} from "../actions";


const BookmarkCard = ({bookmark, navigate}) => {

    const {location, ...product} = bookmark;

    const dispatch = useDispatch();

    const removeBookmark = (props, location) => {
        dispatch(BookmarkAction.removeBookmark(product, location))
    }

    
    return (
        <View style={styles.container}>
            <Ionicons 
                name="close-circle"
                color={Colors.DEFAULT_GREY}
                size={22}
                style={styles.removeIcon}
                onPress={() => removeBookmark(product, location)}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate()}>
                <Image 
                    source={{uri: bookmark?.images?.url}}
                    style={styles.posterStyle}
                />
            </TouchableOpacity>

            <View style={styles.labelContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate()}>
                    <Text style={styles.titleText}>{bookmark?.name}</Text>
                    <View style={styles.rowAndCenter}>
                        <Entypo
                            name="location"
                            size={10}
                            color={Colors.DEFAULT_GREY}
                        />
                        <Text style={styles.locationText}>{bookmark?.location?.location}</Text>
                    </View>
                    <Text style={styles.tagText}>{bookmark?.location?.name}</Text>

                </TouchableOpacity>
                

                <View style={styles.buttonLabelRow}>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name="star" size={13}/>
                        <Text style={styles.ratingText}>4.3</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Ionicons
                            name="ios-time-outline"
                            color={Colors.GOOGLE_BLUE}
                            size={15}
                        />
                        <Text style={styles.ratingText}>20 min</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Ionicons
                            name="location-outline"
                            color={Colors.SECONDARY_GREEN}
                            size={15}
                        />
                        <Text style={styles.ratingText}>10 KM</Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    posterStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 5,

    },
    removeIcon: {
        position: "absolute",
        zIndex: 5,
        top: 0,
        right: 0
    },
    labelContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 5,
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 5,
        marginLeft: 5,
    },
    ratingText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 3,
    },
    buttonLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
    
});

export default BookmarkCard;