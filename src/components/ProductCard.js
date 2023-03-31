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


import {useDispatch, useSelector} from "react-redux";
import {CartAction, BookmarkAction} from "../actions";


const ProductCard = ({props, navigate, location} /*props*/) => {
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    // const [isBookmarked, setIsBookmarked] = useState(false);

    
    // const cart = useSelector(state => state?.cartState?.cart)
    // console.log("Cart: ", cart)

    const itemCount = useSelector(state => state?.cartState?.cart?.find(item => item?._id === props._id && item?.location?._id === location?._id)?.quantity)

    const isBookmarked = useSelector(
        state => 
        state?.bookmarkState?.bookmarks?.filter(
            item => item?._id === props._id && item?.location?._id === location?._id).length > 0
    )

    // const isBookmarked = useSelector(
    //     state => 
    //     state?.bookmarkState?.bookmarks
    // )




    const addBookmark = (props, location) => {
        dispatch(BookmarkAction.addBookmark(props, location))
    }

    const removeBookmark = (props, location) => {
        dispatch(BookmarkAction.removeBookmark(props, location))
    }

    const addToCart = (props, warehouseId) => {
        //console.log("Prop: ", props);
       dispatch(CartAction.addCart(props, warehouseId))  
    }

    const removeFromCart = (props, warehouseId) => dispatch(
        CartAction.removeCart(props, warehouseId)
    )

        
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
                <Image style={styles.image} source={{uri: props.images.url}}/>
            </TouchableOpacity>

            <View style={styles.detailsContainer}>
                <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleText}>{props.name}</Text>
                        <Ionicons 
                            name={isBookmarked? "bookmark": "bookmark-outline"} 
                            color={Colors.DEFAULT_YELLOW} 
                            size={19}
                            onPress={() => 
                                isBookmarked ? removeBookmark(props, location) : addBookmark(props, location) 
                            }
                        />

                    </View>
                    
                    
                    <Text numberOfLines={2} style={styles.descriptionText}>{props.desription}</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.priceText}>{props.price}</Text>
                    <View style={styles.itemAddContainer}>
                        {itemCount && itemCount > 0 ? 

                            (
                                <>
                                    <AntDesign 
                                        name="minus"
                                        color={Colors.DEFAULT_YELLOW}
                                        size={18}
                                        onPress={() => removeFromCart(props, location)}
                                    />
                                    <Text style={styles.itemCountText}>{itemCount}</Text>
                                </>
                            )
                            : null
                        }
                        


                        <AntDesign 
                            name="plus"
                            color={Colors.DEFAULT_YELLOW}
                            size={18}
                            onPress={() => addToCart(props, location)}
                        />
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
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.LIGHT_GREY,
    },
    image: {
        height: 100,
        width: 100,
        margin: 6,
        borderRadius: 8,
    },
    detailsContainer: {
         marginHorizontal: 5,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: -10,
    },
    titleText: {
        width: Display.setWidth(60),
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        marginBottom: 8,
    },
    descriptionText: {
        width: Display.setWidth(60),
        color: Colors.DEFAULT_GREY,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        marginBottom: 8,
    },
    priceText: {
        color: Colors.DEFAULT_YELLOW,
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: 14,
        lineHeight: 14 * 1.4,
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginHorizontal: 5,
    },
    itemAddContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.LIGHT_GREY2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    itemCountText: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        marginHorizontal: 8,
    }
    
});

export default ProductCard;