import React, {useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import {Colors, Images, Fonts} from '../contants';
import {Display} from '../utils';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Welcome');
        }, 3000)
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Image
                source={Images.PLATE}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.titleText}>Come with us</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_GREEN
    },
    image: {
        // height: 180,
        // width: 180,
        height: Display.setHeight(25),
        width: Display.setWidth(50),
    },
    titleText:{
        color: Colors.DEFAULT_WHITE,
        fontSize: 29,
        fontFamily: Fonts.MONTSERRAT_REGULAR,
    }
})

export default SplashScreen;