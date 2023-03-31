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
    Dimensions,
    Animated, 
} from "react-native";

import 
{ 
    Separator, 
    ToggleButton, 
    CategoryMenuItem, 
    WarehouseCard, 
    WarehouseMedium,
    CategoryListItem,
    ProductCard,
    BookmarkCard,
} from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, Mock } from "../contants";
import { Display } from "../utils";
import LottieView from "lottie-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AuthenticationService, WarehouseService, ProductService, UserService } from "../services";


import {useDispatch, useSelector} from "react-redux";
import {CartAction} from "../actions";


const ListItemSeparator = () => (
    <View style={{
            height: 0.8,
            backgroundColor: Colors.DEFAULT_GREY,
            width: '100%',
            marginVertical: 10,

        }}
    />
)



const BookmarkScreen = ({navigation}) => {

    const bookmarks = useSelector(
        state => state?.bookmarkState?.bookmarks
    )

    useEffect(() => {

    }, [])


    
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight}/>
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color={Colors.DEFAULT_BLACK}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Bookmarks</Text>
            </View>

            <FlatList style={styles.bookmarkList}
                data={bookmarks}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Separator height={10}/>}
                ListFooterComponent={() => <Separator height={10}/>}
                ItemSeparatorComponent={() => <ListItemSeparator/>}
                renderItem={({item}) => 
                    <BookmarkCard
                        bookmark={item}
                        navigate={() => 
                            navigation.navigate("Product", {id: item?._id, location: item?.location.location, warehouseId: item?.location._id})}
                    />
                }
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: "center",
        color: Colors.DEFAULT_BLACK
    },
    bookmarkList: {

    }
});

export default BookmarkScreen;