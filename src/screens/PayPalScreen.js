import React, {useState, useEffect} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    ScrollView,
    Linking,
} from "react-native";

import {WebView} from 'react-native-webview';

import 
{ 
    Separator, 
    ToggleButton, 
    CategoryMenuItem, 
    WarehouseCard, 
    WarehouseMedium,
    CategoryListItem,
    ProductCard,
} from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
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
import {CartAction} from "../actions";
import axios from "axios";




const PayPalScreen = ({navigation, route: {params: {totalUSD, userId}}}) => {

    console.log(userId)

    const handlePayPalResponse = async (event) => {
        const { url } = event;

        // console.log(url)

        if (url.includes('success')) {
          // Xử lý khi thanh toán thành công                  

            
        
            alert('Payment successfully!');

            setTimeout(() => {
                navigation.navigate("Cart");
            }, 3000);
        

          
        } else if (url.includes('cancel')) {
          // Xử lý khi người dùng huỷ thanh toán
          alert('Bạn đã huỷ thanh toán!');
        }
    };


    const stateChng = (navState) => {
        console.log(navState)
    }
        
    return (
        <WebView
            startInLoadingState={true}
            onNavigationStateChange={(event) => handlePayPalResponse(event)}
            source={{ uri: `http://10.0.2.2:8000/v1/paypal_api/paypal/${totalUSD}/${userId}`}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
});

export default PayPalScreen;