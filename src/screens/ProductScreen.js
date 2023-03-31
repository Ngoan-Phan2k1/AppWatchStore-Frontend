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

const setStyle = (isActive) => 
isActive 
    ? styles.subMenuButtonText 
    : {...styles.subMenuButtonText, color: Colors.DEFAULT_GREY};







const renderProduct = ({item, index}) => {


    //console.log("Item: ", item?.url);

    const width = Dimensions.get('window').width

    return (
        <View
            style={{
                width: width,
                height: 240,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Image source={{uri: item.url}}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: "contain",
            }}
        />
        </View>
    )
}





const ProductScreen = ({navigation ,route: {params: {id, location, warehouseId}}}) => {
    const [warehouse, setWarehouse] = useState(null);

    const [product, setProduct] = useState(null);
    const [selectedSubMenu, setSelectedSubMenu] = useState("Details");
    const dispatch = useDispatch();

    const itemCount = useSelector(state => state?.cartState?.cart?.find(item => item?._id === id && item?.location?._id === warehouseId)?.quantity)


    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width)


    //console.log("id: ", warehouseId);


    useEffect(() => {
        ProductService.getOneProduct(id).then(productRes => {
            setProduct(productRes?.data)
        })

        WarehouseService.getOneWarehouses(warehouseId).then(warehouseRes => {
            //console.log(warehouseRes?.data);
            setWarehouse(warehouseRes?.data)
        })


    }, [])

    //console.log("warehouse: ", warehouse?._id);

    

    const addToCart = (props, warehouse) => {
        //console.log("Prop: ", props);
       dispatch(CartAction.addCart(props, warehouse))  
    }

    const removeFromCart = (props, warehouse) => dispatch(
        CartAction.removeCart(props, warehouse)
    )

    
    return (
        // <View style={styles.container}>
        //     <StatusBar barStyle="dark-content" translucent backgroundColor="transparent"/>
        //     <Image style={styles.image} source={{uri: product?.images?.url}}/>
            
        //     <ScrollView>
        //         <Separator height={Display.setWidth(100)}/>
        //         <View style={styles.mainContainer}>
        //             <View style={styles.titleHeaderContainer}>
        //                 <Text style={styles.titleText}>{product?.name}</Text>
        //                 <Text style={styles.priceText}>{product?.price}</Text>
        //             </View>
        //         </View>
        //     </ScrollView>
        // </View>




        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />

            <Separator height={StatusBar.currentHeight}/>


            {/* <ScrollView> */}
                <View style={{
                    width: '100%',
                    // borderBottomRightRadius: 20,
                    // borderBottomLeftRadius: 20,
                    position: "relative",
                    alignItems: "center",
                    marginBottom: 4,
                    //marginBottom: 200,
                    backgroundColor: Colors.DEFAULT_WHITE,

                }}>
                    <View 
                        style={{
                            width: '100%',
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 16,
                            paddingLeft: 16,
                        }}
                    >
                        <TouchableOpacity>
                            <Entypo style={styles.icon} name="chevron-left" onPress={() => navigation.goBack()}/>
                        </TouchableOpacity>
                    </View>



                    <FlatList
                        data={product?.thumbnails}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x:scrollX}}}],
                            {useNativeDriver: false},
                        )}
                        style={{
                            
                        }}
                        
                        
                    />

                    <View
                        style={{
                            width: '100%',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 16,
                            marginTop: 32,
                        }}
                    >
                        {
                           product?.thumbnails ?  product?.thumbnails?.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index-1, index, index+1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: "clamp",
                                })


                                return (
                                    <Animated.View
                                        key={index}
                                        style={{
                                            width: '16%',
                                            height: 2.4,
                                            backgroundColor: Colors.DEFAULT_BLACK,
                                            opacity,
                                            marginHorizontal: 4,
                                            borderRadius: 100,
                                
                                        }}
                                    >

                                    </Animated.View>
                                )
                            })
                            : null
                        }

                    </View>
                    
                </View>

                {/* <View>

                    <View 
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Entypo/>
                    </View>

                </View> */}




            <ScrollView>    
                {/* <Separator height={Display.setWidth(100)}/> */}
                 <View style={styles.mainContainer}>
                    <View style={styles.titleHeaderContainer}>
                        <Text style={styles.titleText}>{product?.name}</Text>
                        <Text style={styles.priceText}>{product?.price}</Text>
                    </View>

                    <View style={styles.subHeaderContainer}>
                        <View style={styles.rowAndCenter}>
                            <FontAwesome 
                                name="star"
                                size={20}
                                color={Colors.DEFAULT_YELLOW}
                            />
                            <Text style={styles.ratingText}>4.2</Text>
                            <Text style={styles.reviewsText}>(255)</Text>
                        </View>

                        <View style={styles.rowAndCenter}>
                            <Image style={styles.iconImage} source={Images.DELIVERY_TIME}/>
                            <Text style={styles.deliveryText}>20 min</Text>
                           
                        </View>

                        <View style={styles.rowAndCenter}>
                            <Image style={styles.iconImage} source={Images.DELIVERY_CHARGE}/>
                            <Text style={styles.deliveryText}>Free Delivery</Text>   
                        </View>

                    </View>

                    <View style={styles.subMenuContainer}>
                        <TouchableOpacity 
                            style={styles.subMenuButtonContainer} 
                            onPress={() => setSelectedSubMenu("Details")}
                        >
                            <Text style={setStyle(selectedSubMenu === 'Details')}>Details</Text>

                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.subMenuButtonContainer}
                            onPress={() => setSelectedSubMenu("Reviews")}
                        >
                            <Text style={setStyle(selectedSubMenu === 'Reviews')}>Reviews</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsContainer}>
                        { product?.desription ? (
                            <>
                                <Text style={styles.detailHeader}>Description</Text>
                                <Text style={styles.detailContent}>{product?.desription}</Text>
                            </>)
                            : null
                        }

                        {/* Sau nay sua lai cho data ware house */}
                        <Text style={styles.detailHeader}>Warehouse</Text>
                        <Text style={styles.detailContent}>{location}</Text>

                        { product?.desription ? (
                            <>
                                <Text style={styles.detailHeader}>Description</Text>
                                <Text style={styles.detailContent}>{product?.description}</Text>
                            </>)
                            : null
                        }

                    </View>


                </View>

                <Separator height={Display.setHeight(10)}/>


            </ScrollView>

            <View style={styles.buttonsContainer}>
                <View style={styles.itemAddContainer}>
                                                                       
                    <AntDesign 
                        name="minus"
                        color={Colors.DEFAULT_YELLOW}
                        size={18}
                        onPress={() => removeFromCart(product, warehouse)}
                    />
                    <Text style={styles.itemCountText}>{itemCount ? itemCount : 0}</Text>                                                                                                               

                    <AntDesign 
                        name="plus"
                        color={Colors.DEFAULT_YELLOW}
                        size={18}
                        onPress={() => addToCart(product, warehouse)}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.cartButton} 
                    onPress={() => navigation.navigate("Cart", {warehouseId: warehouseId})}
                    activeOpacity={0.8}
                >
                    <Text style={styles.cartButtonText}>Go to Cart</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.DEFAULT_WHITE,

        // width: Display.setWidth(100),
        // height: Display.setHeight(100),
        backgroundColor: Colors.DEFAULT_WHITE,
        //position: "relative"


       
    },
    image: {
        position: "absolute",
        height: Display.setHeight(50),
        width: Display.setWidth(90),
        top: 0,
    },
    mainContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flex: 1,

    },
    titleHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 10,
    },
    titleText: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    priceText: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_YELLOW,
    },
    icon:{
        fontSize: 18,
        color: Colors.DEFAULT_BLACK,
        padding: 12,
        borderRadius: 18,
        backgroundColor: Colors.DEFAULT_WHITE
    },
    subHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 15,
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 5,
    },
    reviewsText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 5,
    },
    iconImage: {
        height: 20,
        width: 20,
    },
    deliveryText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 3,
    },
    subMenuContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        marginTop: 20,
        borderColor: Colors.DEFAULT_GREY,
        justifyContent: "space-evenly",
    },
    subMenuButtonContainer: {
        paddingVertical: 15,
        width: Display.setWidth(30),
        alignItems: "center",
    },
    subMenuButtonText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
        
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    detailHeader: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginTop: 10,
        marginBottom: 2,
    },
    detailContent: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.INACTIVE_GREY,
        textAlign: "justify",
    },
    buttonsContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        paddingHorizontal: Display.setWidth(5),
        justifyContent: "space-between",
        backgroundColor: Colors.DEFAULT_WHITE,
        width: Display.setWidth(100),
        paddingVertical: Display.setWidth(2.5),
    },
    itemAddContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.LIGHT_GREY2,
        height: Display.setHeight(6),
        width: Display.setWidth(30),
        justifyContent: "center",
        borderRadius: 8,
    },
    itemCountText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        marginHorizontal: 8,


    },
    cartButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: Display.setHeight(6),
        width: Display.setWidth(58),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    cartButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    }
});

export default ProductScreen;