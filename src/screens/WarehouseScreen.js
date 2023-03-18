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
    ProductCard,
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
import {useDispatch, useSelector} from 'react-redux'
import { CartAction } from "../actions";


const ListHeader = () => (
    <View
        style={{
            flexDirection: "row",
            flex: 1,
            width: 40,
            justifyContent: "flex-end",
        }}
    >
        <View
            style={{
                backgroundColor: Colors.LIGHT_YELLOW,
                width: 20,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
            }}
        >

        </View>
    </View>
)

const ListFooter = () => (
    <View
        style={{
            flexDirection: "row",
            flex: 1,
            width: 40,
        }}
    >
        <View
            style={{
                backgroundColor: Colors.LIGHT_YELLOW,
                width: 20,
                borderTopRightRadius: 64,
                borderBottomRightRadius: 64,
            }}
        >

        </View>

    </View>
)



const WarehouseScreen = ({navigation, route: {params: {warehouseId}}}) => {
    const [warehouse, setWarehouse] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedIdCategory, setSelectedIdCategory] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);




    


    useEffect(() => {
        WarehouseService.getOneWarehouses(warehouseId).then(response => {
            setSelectedCategory(response?.data?.categories[0].name)
           setSelectedIdCategory(response?.data?.categories[0]._id)
            
            setWarehouse(response?.data)
        })

        // UserService.addToCart().then(res => {
           
        // })
    }, [])
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" translucent backgroundColor="transparent"/>
            <>
                <Image source={{
                    uri: warehouse?.images.url
                }}
                style={styles.backgroundImage}
                />

                <ScrollView>
                    <Separator height={Display.setHeight(35)}/>
                    <View style={styles.mainContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{warehouse?.name}</Text>
                            <Ionicons 
                                name={isBookmarked? "bookmark": "bookmark-outline"} 
                                color={Colors.DEFAULT_YELLOW} 
                                size={24}
                                onPress={() => setIsBookmarked(!isBookmarked)}
                            />
                        </View>

                        <Text style={styles.tagText}>{warehouse?.location}</Text>
                        <View style={styles.ratingReviewsContainer}>
                            <FontAwesome 
                                name="star"
                                size={18}
                                color={Colors.DEFAULT_YELLOW}
                            />
                            <Text style={styles.ratingText}>4.2</Text>
                            <Text style={styles.reviewsText}>(455 Reviews)</Text>
                        </View>

                        <View style={styles.deliveryDetailsContainer}>
                            <View style={styles.rowAndCenter}>
                                <Image 
                                    style={styles.deliveryDetailIcon}
                                    source={Images.DELIVERY_CHARGE}
                                />
                                <Text style={styles.deliveryDetailText}>Free Delivery</Text>
                            </View>

                            <View style={styles.rowAndCenter}>
                                <Image 
                                    style={styles.deliveryDetailIcon}
                                    source={Images.DELIVERY_TIME}
                                />
                                <Text style={styles.deliveryDetailText}>30 min</Text>
                            </View>

                            <View style={styles.rowAndCenter}>
                                <Image 
                                    style={styles.deliveryDetailIcon}
                                    source={Images.MARKER}
                                />
                                <Text style={styles.deliveryDetailText}>3km</Text>
                            </View>

                            <View style={styles.restaurantType}>
                                <Text style={styles.restaurantTypeText}>Take Away</Text>
                            </View>

                        </View>

                        <View style={styles.categoriesContainer}>
                            <FlatList
                                data={warehouse?.categories}
                                //keyExtractor={item => item}
                                keyExtractor={(item) => item?.id}
                                horizontal
                                ListHeaderComponent={() => <ListHeader/>}
                                ListFooterComponent={() => <ListFooter/>}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <CategoryListItem 
                                        //name={item.name}
                                        {...item}
                                        isActive={item.name === selectedCategory}
                                        selectCategory={category => setSelectedCategory(category)}
                                        selectIdCategory={idCategory => setSelectedIdCategory(idCategory)}
                                    />
                                )}
                            />

                            
                        </View>

                        <View style={styles.productList}>
                            {warehouse?.products?.filter(product => product?.category === selectedIdCategory)
                            ?.map(item => (
                                <ProductCard 
                                    key={item?._id} 
                                    {...item} 
                                    navigate={() => 
                                        navigation.navigate("Product", {id: item?._id})}

                                    //navigate={(id) => navigation.navigate("Product", {id})}
                                />
                            ))}

                            <Separator height={Display.setHeight(2)}/>
                        </View>    
                    </View>
                </ScrollView>

                
            </>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        height: Display.setWidth(100),
        width: Display.setWidth(100),   
    },
    mainContainer: {
        backgroundColor: Colors.SECONDARY_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    tagText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_GREY,
    },
    ratingReviewsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 25,
        marginTop: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsContainer: {
       flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 25,
        marginTop: 10,
        justifyContent: "space-between",
    },
    deliveryDetailText: {
        marginLeft: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailIcon: {
        width: 16,
        height: 16,
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    restaurantType: {
        backgroundColor: Colors.LIGHT_YELLOW,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
    },
    restaurantTypeText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_YELLOW,
    },
    categoriesContainer: {
        marginVertical: 20,
    },
    productList: {
        marginHorizontal: 15,
    },

    
    
});

export default WarehouseScreen;