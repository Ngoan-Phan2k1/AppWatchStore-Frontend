import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Separator, ToggleButton, CategoryMenuItem, WarehouseCard, WarehouseMedium } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images, Mock } from "../contants";
import { Display } from "../utils";
import { AuthenticationService, WarehouseService, ProductService, UserService } from "../services";
import LottieView from "lottie-react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";

import {GeneralAction} from "../actions";
import {useDispatch, useSelector, connect} from "react-redux";



const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE};

const HomeScreen = ({navigation}) => {
    const [activeCategory, setActiveCategory] = useState();
    const [warehouse, setWarehouse] = useState(null);
    //const [products, setProducts] = useState(null);
    const [activeSortItem, setActiveSortItem] = useState('recent');

    const [accountData, setAccountData] = useState('');



    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            WarehouseService.getWarehouses().then(response => {
                if(response?.status){
                    //console.log(response.data)
                    setWarehouse(response?.data)
                }
            })

            ProductService.getProdutcsNotFilter().then(res => {
                // if(res?.status){
                //     setProducts(res?.data)
                // }
            })


            // UserService.getUserData().then(res1 => {
            //     setUserData(res1?.data)
            // })

        })
        return unsubscribe;
        
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Separator height={StatusBar.currentHeight}/>
            <View style={styles.backgroundCurvedContainer}/>

            <View style={styles.headerContainer}>
                <View style={styles.locationContainer}>

                    <Ionicons 
                        name="location-outline" 
                        size={15}
                        color={Colors.DEFAULT_WHITE}
                    />
                    <Text style={styles.locationText}>Delivery to</Text>
                    <Text style={styles.selectedLocationText}>HOME</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={16}
                        color={Colors.DEFAULT_YELLOW}

                    />
                    <Feather 
                        name="bell"
                        size={24}
                        style={{
                            position: "absolute",
                            right: 0,
                        }}
                        color={Colors.DEFAULT_WHITE}
                    />
                    <View style={styles.alertBadge}>
                        <Text style={styles.alertBadgeText}>12</Text>
                    </View>

                </View>
                
                <View style={styles.searchContainer}>
                    <View style={styles.searchSection}>
                        <Ionicons 
                            name="search-outline" 
                            size={25}
                            color={Colors.DEFAULT_GREY}
                        />
                        <Text style={styles.searchText}>Search..</Text>
                    </View>
                    <Feather
                        name="sliders" 
                        size={20}
                        color={Colors.DEFAULT_YELLOW}
                        style={{
                            marginLeft: 10,
                        }}
                    />
                </View>

                <View style={styles.categoriesContainer}>
                    {Mock.CATEGORIES.map(({name, logo}) => (
                        <CategoryMenuItem 
                            name={name} 
                            logo={logo} 
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </View>

            </View>

            <ScrollView style={styles.listContainer}>
                <View style={styles.horizontalListContainer}>
                    <View style={styles.listHeader}>

                        <Text style={styles.listHeaderTitle}>Top Rated</Text>
                        <Text style={styles.listHeaderSubtitle}>See All</Text>
                    </View>

                    {/* day la la danh sach cac kho o dau trang home */}
                    <FlatList 
                        data={warehouse} 
                        keyExtractor={(item) => item?.id}
                        horizontal
                        ListHeaderComponent={() => <Separator width={20}/>}
                        ListFooterComponent={() => <Separator width={20}/>}
                        ItemSeparatorComponent={() => <Separator width={10}/>}
                        renderItem={({item}) => 
                            <WarehouseCard {...item} navigate={(warehouseId) => navigation.navigate("Warehouse", {warehouseId})}/>
                            
                        }
                    />
                    
                </View>


                <View style={styles.sortListContainer}>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'recent')} 
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('recent')}
                    >
                        <Text style={styles.sortListItemText}>Recent</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'favorite')} 
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('favorite')}
                    >
                        <Text style={styles.sortListItemText}>Favorite</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'rating')} 
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('rating')}
                    >
                        <Text style={styles.sortListItemText}>Rating</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'popular')} 
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('popular')}
                    >
                        <Text style={styles.sortListItemText}>Popular</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'trending')} 
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('trending')}
                    >
                        <Text style={styles.sortListItemText}>Trending</Text>
                    </TouchableOpacity>
                </View>

                {warehouse?.map(item => (
                    
                    <WarehouseMedium {...item} key={item?.id}/>
                    
                ))}

                <Separator height={Display.setHeight(10)}/>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_WHITE,
        
    },
    backgroundCurvedContainer: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 2000,
        position: "absolute",
        top: -1 * (2000 - 239),
        width: 2000,
        borderRadius: 2000,
        alignSelf: "center",
        zIndex: -1,
    },
    headerContainer: {
        justifyContent: "space-evenly",
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        zIndex: 1,
    },
    locationText: {
        color: Colors.DEFAULT_WHITE,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    selectedLocationText: {
        color: Colors.DEFAULT_YELLOW,
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    alertBadge: {
        borderRadius: 32,
        backgroundColor: Colors.DEFAULT_YELLOW,
        justifyContent: "center",
        alignItems: "center",
        height: 16,
        width: 16,
        position: "absolute",
        right: -2,
        top: -10,
    },
    alertBadgeText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    searchText: {
        color: Colors.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
        
    },
    listContainer: {
        paddingVertical: 5,
        zIndex: -5,
    },
    horizontalListContainer: {
        marginTop: 30
    },
    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 5,
    },
    listHeaderTitle: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    listHeaderSubtitle: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    
    },
    sortListContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_WHITE,
        marginTop: 8,
        elevation: 1,
    },
    sortListItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.DEFAULT_YELLOW,
        height: 40,
    },

    sortListItemText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
    }
    
});

export default HomeScreen;


// const mapDispatchToprops = dispatch => {
//     return {
//         setUserData: user => dispatch(GeneralAction.setUserData(user)),
//     };
// };

//export default connect(null, mapDispatchToprops)(HomeScreen);